import React, { useState } from 'react';
import { FiPlus, FiLink, FiTrash2, FiX, FiCopy } from 'react-icons/fi';
import axios from 'axios';

const AdminTestManager = () => {
    const [tests, setTests] = useState([
        { id: 1, name: "Midterm Mathematics", location: "Room 101", link: "test/1", date: "2023-05-15" },
        { id: 2, name: "Science Quiz", location: "Lab 3", link: "test/2", date: "2023-06-20" },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTest, setNewTest] = useState({ name: "", location: "" });
    const [activeTab, setActiveTab] = useState('active');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCreateTest = async () => {
        if (!newTest.name || !newTest.location) return;

        setLoading(true);
        setError('');

        try {
            // First create the test locally
            const testId = Date.now();
            const tempTest = {
                id: testId,
                name: newTest.name,
                location: newTest.location,
                link: '', // Will be set after API call
                date: new Date().toISOString().split('T')[0],
                isGenerating: true // Flag to show loading state
            };

            setTests([...tests, tempTest]);
            setIsModalOpen(false);
            setNewTest({ name: "", location: "" });

            // Call your backend to generate the test link
            const response = await axios.post(`${import.meta.env.VITE_GO_URL}/api/v1/contests`, {
                testName: newTest.name,
                location: newTest.location
            });

            if (!response.data.SharebleLink) return;
            // Update the test with the generated link
            setTests(prevTests => prevTests.map(test =>
                test.id === testId
                    ? { ...test, link: response.data.SharebleLink , isGenerating: false }
                        : test
                ));
        } catch (err) {
    setError(err.response?.data?.error || 'Failed to generate test link');
    // Remove the test if link generation failed
    setTests(prevTests => prevTests.filter(test => test.id !== testId));
} finally {
    setLoading(false);
}
    };

const handleDeleteTest = (id) => {
    setTests(tests.filter(test => test.id !== id));
};

const copyToClipboard = (link) => {
    navigator.clipboard.writeText(`${window.location.origin}/${link}`);
    alert("Test link copied to clipboard!");
};

return (
    <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Test Manager</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 bg-blue-600 text-white rounded-full"
                disabled={loading}
            >
                <FiPlus size={20} />
            </button>
        </div>

        <div className="container mx-auto px-4 py-6">
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Section - Create Test (Hidden on mobile) */}
                <div className="hidden md:block md:w-1/4 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Test Management</h2>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-8"
                        disabled={loading}
                    >
                        <FiPlus /> Create New Test
                    </button>

                    <div className="space-y-2">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'active' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                        >
                            Active Tests
                        </button>
                    </div>
                </div>

                {/* Right Section - Previous Tests */}
                <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            {activeTab === 'active' ? 'Active Tests' : 'Archived Tests'}
                        </h2>
                        <div className="md:hidden flex gap-2">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                            >
                                Active
                            </button>
                        </div>
                    </div>

                    {tests.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p>No tests available</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
                                disabled={loading}
                            >
                                <FiPlus /> Create Your First Test
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Link</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tests.map((test) => (
                                        <tr key={test.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{test.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                                <div className="text-gray-500">{test.location}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                                <div className="text-gray-500">{test.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {test.isGenerating ? (
                                                    <span className="text-gray-400">Generating link...</span>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <span className="text-blue-600 truncate max-w-xs">
                                                            {test.link}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    {!test.isGenerating && (
                                                        <button
                                                            onClick={() => copyToClipboard(test.link)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                                            title="Copy link"
                                                        >
                                                            <FiCopy size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteTest(test.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                                        title="Delete test"
                                                        disabled={test.isGenerating}
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Test Creation Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Create New Test</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Test Name *</label>
                                <input
                                    type="text"
                                    value={newTest.name}
                                    onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Final Mathematics Exam"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                <input
                                    type="text"
                                    value={newTest.location}
                                    onChange={(e) => setNewTest({ ...newTest, location: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Room 101 or Online"
                                    disabled={loading}
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateTest}
                                    disabled={!newTest.name || !newTest.location || loading}
                                    className={`px-4 py-2 rounded-md text-white ${!newTest.name || !newTest.location || loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {loading ? 'Creating...' : 'Create Test'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);
};

export default AdminTestManager;