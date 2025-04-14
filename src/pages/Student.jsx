import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from '../context/sessionContext';

export default function Student() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    school: ''
  });

  const [contestId, setContestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useSession();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entries = Array.from(params.entries());

    if (entries.length > 0) {
      const [encoded, _] = entries[0];
      try {
        const decoded = atob(encoded);
        const parsed = Object.fromEntries(new URLSearchParams(decoded));
        console.log('Decoded:', parsed);
        setContestId(parsed.token);
      } catch (err) {
        setError('Invalid contest link.');
      }
    } else {
      setError('Missing contest information.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const payload = {
      id: contestId,
      email: formData.email,
      phone_number: formData.phone,
      DOB: formData.dob,
      address: formData.address,
      school: formData.school,
      name: formData.name
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_TS_URL}/api/v1/contest/login`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 && response.data.success) {
        const { token, redirect } = response.data.data;
        login(token, contestId); // store token & id in context
        setSuccess(true);
        window.location.href = redirect;
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <div className="flex justify-center">
          <img src="./logo.png" alt="Logo" className="h-16 w-16 object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Student Registration</h2>

        {success && (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg">
            Registration successful! Redirecting...
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {[
          { label: 'Full Name', name: 'name', type: 'text' },
          { label: 'Email Address', name: 'email', type: 'email' },
          { label: 'Phone Number', name: 'phone', type: 'tel' },
          { label: 'Date of Birth', name: 'dob', type: 'date' },
          { label: 'Address', name: 'address', type: 'text' },
          { label: 'School Name', name: 'school', type: 'text' }
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
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
}
