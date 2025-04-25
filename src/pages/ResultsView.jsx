import React, { useEffect, useState } from 'react';

export default function ViewResults() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [testId, setTestId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const entries = Array.from(params.entries());

        if (entries.length > 0) {
            const [encoded, _] = entries[0];
            try {
                const decoded = atob(encoded);
                const parsed = Object.fromEntries(new URLSearchParams(decoded));
                setTestId(parsed.testId);
            } catch (err) {
                setError('Invalid link.');
            }
        } else {
            setError('Missing contest information.');
        }
    }, []);

    const handleDownload = async () => {
        if (!phone) {
            setError('Phone number is required');
            return;
        }

        if (!testId) {
            setError('Test ID not found');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_PY_URL}/api/v1/download-report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contestId: testId,
                    phoneNumber: phone
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to download report');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'career_report.pdf'); // Fixed filename as per your example
            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (err) {
            setError(err.message || 'Failed to download result');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
                <div className="flex justify-center">
                    <img src="./logo.png" alt="Logo" className="h-16 w-16 object-contain" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">View Your Results</h2>

                {error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter registered phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Downloading...
                        </span>
                    ) : (
                        'Download Result'
                    )}
                </button>
            </div>
        </div>
    );
}