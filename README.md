# FixItNow - MERN Stack Application

A full-stack repair and maintenance solution built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🏗️ Project Structure

```
FixItNow/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js/Express backend
│   ├── server.js
│   ├── package.json
│   └── env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd FixItNow
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

1. **Backend Environment:**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/fixitnow
   ```

### Running the Application

#### Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

**Test the API:**
- Visit `http://localhost:5000/api/test` - Should return "FixItNow Server Running"
- Visit `http://localhost:5000/api/health` - Server health check

#### Start the Frontend Client

```bash
cd client
npm start
```

The React app will run on `http://localhost:3000`

**What you'll see:**
- A beautiful landing page with "FixItNow Client" title
- TailwindCSS styling with gradient background
- Status indicators showing both frontend and backend are ready

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **TailwindCSS** - Utility-first CSS framework
- **Create React App** - Development setup

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Server status |
| `/api/test` | GET | Test endpoint - returns "FixItNow Server Running" |
| `/api/health` | GET | Health check with database status |

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd client
npm start    # Development server with hot reload
```

## 🗄️ Database

The application is configured to connect to MongoDB. Make sure MongoDB is running:

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
Update the `MONGODB_URI` in your `.env` file with your Atlas connection string.

## 📦 Available Scripts

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🎨 Features

- ✅ **Responsive Design** - Mobile-first approach with TailwindCSS
- ✅ **Modern UI** - Clean, professional interface
- ✅ **API Ready** - RESTful endpoints for future features
- ✅ **Database Ready** - MongoDB connection configured
- ✅ **Security** - Helmet middleware for security headers
- ✅ **Logging** - Morgan for HTTP request logging
- ✅ **CORS** - Cross-origin requests enabled

## 🚀 Deployment

### Frontend (React)
```bash
cd client
npm run build
# Deploy the 'build' folder to your hosting service
```

### Backend (Node.js)
```bash
cd server
npm start
# Deploy to services like Heroku, DigitalOcean, AWS, etc.
```

## 🔮 Future Enhancements

- User authentication and authorization
- Repair request management
- Real-time notifications
- Payment integration
- Mobile app development
- Advanced search and filtering

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Happy Coding! 🚀**

