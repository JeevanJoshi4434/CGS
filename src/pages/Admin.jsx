import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // If using React Router

export default function Admin() {
  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirect after login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:7070/api/admin/login', {
        username: formData.adminName,
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });


      if (response.status === 200) {

        if (response.data.token) {
          localStorage.setItem('adminToken', response.data.token);
        }


        navigate('/manage');
      }
    } catch (err) {

      const errorMessage = err.response?.data?.error ||
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >

        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Login</h2>


        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {[
          { label: 'Admin Name', name: 'adminName', type: 'text' },
          { label: 'Email Address', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' }
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex justify-center items-center ${loading ? 'opacity-75' : ''
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
}