import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from '../context/sessionContext';

export default function Student() {
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Optional field
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

  // OTP Verification States
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const MAX_OTP_ATTEMPTS = 5;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entries = Array.from(params.entries());

    if (entries.length > 0) {
      const [encoded, _] = entries[0];
      try {
        const decoded = atob(encoded);
        const parsed = Object.fromEntries(new URLSearchParams(decoded));
        setContestId(parsed.token);
      } catch (err) {
        setError('Invalid contest link.');
      }
    } else {
      setError('Missing contest information.');
    }
  }, []);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Calculate delay based on attempt count
  const getDelayDuration = () => {
    if (otpAttempts === 0) return 0;
    return Math.min(otpAttempts + 1, 5) * 60; // 2min, 3min, 4min, 5min
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Send OTP to backend
  const handleSendOtp = async () => {
    if (otpAttempts >= MAX_OTP_ATTEMPTS) {
      setOtpError('Maximum OTP attempts reached. Try again later.');
      return;
    }

    if (!formData.phone) {
      setOtpError('Phone number is required');
      return;
    }

    const delay = getDelayDuration();
    setOtpLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TS_URL}/api/v1/otp/send`,
        { phoneNumber: formData.phone, id: contestId }
      );

      if (response.status === 200) {
        setOtpAttempts(prev => prev + 1);
        setOtpSent(true);
        setOtpVerified(false);
        setOtp('');
        setCountdown(delay);
        setOtpError('');
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP with backend
  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError('OTP is required');
      return;
    }

    setOtpLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TS_URL}/api/v1/otp/verify`,
        {
          phoneNumber: formData.phone,
          otp: JSON.stringify(otp)
        }
      );

      if (response.status === 200) {
        setOtpVerified(true);
        setOtpError('');
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (countdown > 0 || otpAttempts >= MAX_OTP_ATTEMPTS) return;
    handleSendOtp();
  };

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setError('Please verify your phone number first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    const payload = {
      id: contestId,
      ...(formData.email && { email: formData.email }),
      phone_number: formData.phone,
      DOB: formData.dob,
      address: formData.address,
      school: formData.school,
      name: formData.name,
      otp_verified: true
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TS_URL}/api/v1/contest/login`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 && response.data.success) {
        const { token, redirect } = response.data.data;
        login(token, contestId);
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

        {/* Personal Information Fields */}
        {[
          { label: 'Full Name', name: 'name', type: 'text', required: true },
          { label: 'Email Address', name: 'email', type: 'email', required: false },
          { label: 'Date of Birth', name: 'dob', type: 'date', required: true },
          { label: 'Address', name: 'address', type: 'text', required: true },
          { label: 'School Name', name: 'school', type: 'text', required: true }
        ].map(({ label, name, type, required }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">
              {label}
              {!required && <span className="text-gray-500 text-sm"> (optional)</span>}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Phone Verification Section */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <div className="flex gap-2">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={otpSent}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpLoading || !formData.phone || otpAttempts >= MAX_OTP_ATTEMPTS}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {otpLoading ? 'Sending...' :
                  otpAttempts >= MAX_OTP_ATTEMPTS ? 'Max Attempts' : 'Send OTP'}
              </button>
            ) : (
              <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
                ✓ Sent
              </div>
            )}
          </div>
          {otpAttempts > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Attempt {otpAttempts}/{MAX_OTP_ATTEMPTS}
            </p>
          )}
        </div>

        {/* OTP Verification (shown only when OTP is sent) */}
        {otpSent && !otpVerified && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 font-medium">Enter OTP</label>
              {countdown > 0 ? (
                <span className="text-sm text-gray-500">
                  Resend in {formatCountdown(countdown)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={otpLoading || otpAttempts >= MAX_OTP_ATTEMPTS}
                  className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                >
                  {otpAttempts >= MAX_OTP_ATTEMPTS ?
                    'Max attempts reached' :
                    'Resend OTP'}
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otpLoading || otp.length < 6}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {otpLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        )}

        {otpVerified && (
          <div className="p-2 bg-green-100 text-green-700 rounded-lg text-sm">
            ✓ Phone number verified!
          </div>
        )}

        {otpError && (
          <div className="p-2 bg-red-100 text-red-700 rounded-lg text-sm">
            {otpError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !otpVerified}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${loading || !otpVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
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
            'Submit Registration'
          )}
        </button>
      </form>
    </div>
  );
}