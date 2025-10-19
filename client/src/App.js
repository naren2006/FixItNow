import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'form' or 'list'
  const [formData, setFormData] = useState({
    userName: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
        setSubmitted(true);
        setFormData({ userName: '', description: '' });
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error submitting complaint: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setResult(null);
  };

  const fetchComplaints = async () => {
    setLoadingComplaints(true);
    try {
      const response = await fetch('http://localhost:5000/api/complaints');
      const data = await response.json();
      if (response.ok) {
        setComplaints(data.data);
      } else {
        alert('Error fetching complaints: ' + data.message);
      }
    } catch (error) {
      alert('Error fetching complaints: ' + error.message);
    } finally {
      setLoadingComplaints(false);
    }
  };

  const updateComplaintStatus = async (complaintId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Update the complaint in the local state
        setComplaints(complaints.map(complaint => 
          complaint._id === complaintId 
            ? { ...complaint, status: newStatus }
            : complaint
        ));
        alert('Status updated successfully!');
      } else {
        alert('Error updating status: ' + data.message);
      }
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  useEffect(() => {
    if (currentView === 'list') {
      fetchComplaints();
    }
  }, [currentView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FixItNow</h1>
          <p className="text-gray-600">Maintenance Request System</p>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setCurrentView('form')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                currentView === 'form'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Submit Request
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                currentView === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              View All Requests
            </button>
          </div>
        </div>

        {currentView === 'form' ? (
          !submitted ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Problem Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Describe the problem (e.g., 'Light not working', 'Water leaking', 'Fan making noise')"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '🤖 AI is analyzing...' : 'Submit Complaint'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Complaint Submitted!</h2>
              {result && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 font-medium">Department Assigned:</p>
                  <p className="text-blue-600 text-lg capitalize">{result.data.department}</p>
                  {result.aiClassified && (
                    <p className="text-blue-500 text-sm mt-2">🤖 AI-powered classification</p>
                  )}
                </div>
              )}
              <button
                onClick={resetForm}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                Submit Another Complaint
              </button>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Complaints</h2>
              <button
                onClick={fetchComplaints}
                disabled={loadingComplaints}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingComplaints ? 'Loading...' : 'Refresh'}
              </button>
          </div>
          
            {loadingComplaints ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading complaints...</p>
              </div>
            ) : complaints.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No complaints found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <tr key={complaint._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{complaint.userName}</td>
                        <td className="py-3 px-4 text-gray-700 max-w-xs truncate">{complaint.description}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            complaint.department === 'electrician' ? 'bg-yellow-100 text-yellow-800' :
                            complaint.department === 'plumber' ? 'bg-blue-100 text-blue-800' :
                            complaint.department === 'carpenter' ? 'bg-orange-100 text-orange-800' :
                            complaint.department === 'cleaner' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {complaint.department}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={complaint.status}
                            onChange={(e) => updateComplaintStatus(complaint._id, e.target.value)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${
                              complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

