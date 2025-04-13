import React, { useState } from 'react';

export default function Admin() {
  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin Submitted Data:', formData);
    // You can add your API call or validation logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        {/* Logo (Optional) */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Login</h2>

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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
