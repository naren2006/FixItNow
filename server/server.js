const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Complaint = require('./models/Complaint');
const { classifyComplaint } = require('./utils/openaiClassifier');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fixitnow';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.log('❌ MongoDB connection error:', error.message);
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'FixItNow Server Running',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'FixItNow Server Running',
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      test: '/api/test'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Complaint Routes
// POST /api/complaints - Create a new complaint
app.post('/api/complaints', async (req, res) => {
  try {
    const { userName, description, department } = req.body;
    
    // Validate required fields
    if (!userName || !description) {
      return res.status(400).json({
        message: 'userName and description are required',
        status: 'error'
      });
    }

    // Use AI to classify the complaint if no department provided
    let classifiedDepartment = department;
    if (!department) {
      console.log('🤖 Classifying complaint with AI...');
      classifiedDepartment = await classifyComplaint(description);
      console.log(`✅ AI classified as: ${classifiedDepartment}`);
    }

    // Create new complaint
    const complaint = new Complaint({
      userName,
      description,
      department: classifiedDepartment
    });

    const savedComplaint = await complaint.save();
    
    res.status(201).json({
      message: 'Complaint created successfully',
      status: 'success',
      data: savedComplaint,
      aiClassified: !department // Indicate if AI was used
    });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({
      message: 'Error creating complaint',
      status: 'error',
      error: error.message
    });
  }
});

// GET /api/complaints - Get all complaints
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    
    res.json({
      message: 'Complaints retrieved successfully',
      status: 'success',
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({
      message: 'Error fetching complaints',
      status: 'error',
      error: error.message
    });
  }
});

// PUT /api/complaints/:id - Update complaint status
app.put('/api/complaints/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['Pending', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status. Must be one of: Pending, In Progress, Resolved',
        status: 'error'
      });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        message: 'Complaint not found',
        status: 'error'
      });
    }

    res.json({
      message: 'Complaint status updated successfully',
      status: 'success',
      data: updatedComplaint
    });
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).json({
      message: 'Error updating complaint',
      status: 'error',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    status: 'error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FixItNow Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/test`);
});

module.exports = app;

