import React, { useState } from 'react';

interface AdminLoginProps {
    onLogin: (token: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('admin@deig.gov.et');
    const [password, setPassword] = useState('AdminPassword123!');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Attempt to reach the backend
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || 'Authentication failed');
            }

            const data = await response.json();
            
            if (data.token) {
                onLogin(data.token);
            } else {
                 throw new Error('No token received from server.');
            }

        } catch (err) {
            console.error("Backend login failed:", err);
            setError((err as Error).message || "Connection failed. Please check the backend.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-lightBg dark:bg-gray-900 font-sans p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                    <div className="flex justify-center items-center space-x-3 mb-6">
                         <svg className="w-12 h-12 text-primaryDark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" stroke="currentColor" strokeWidth="5">
                                <path d="M50 5 L95 27.5 V72.5 L50 95 L5 72.5 V27.5 L50 5 Z" />
                                <path d="M50 17 L83 34.5 V65.5 L50 83 L17 65.5 V34.5 L50 17 Z" />
                            </g>
                        </svg>
                        <h1 className="text-2xl font-bold font-montserrat text-primaryDark dark:text-textLight">DEIG Admin Panel</h1>
                    </div>

                    <p className="text-textDark/70 dark:text-textLight/70 mb-6">Please enter your credentials to proceed.</p>

                    {error && (
                        <div className="bg-danger/10 border border-danger/50 text-danger text-sm p-3 rounded-md mb-4 animate-fadeIn">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-textDark/80 dark:text-textLight/80 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-1 focus:ring-primaryDark text-textDark dark:text-textLight px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password"  className="block text-sm font-semibold text-textDark/80 dark:text-textLight/80 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-1 focus:ring-primaryDark text-textDark dark:text-textLight px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-accentStrong text-white font-bold py-3 px-6 rounded-lg hover:bg-accentHover transition-colors duration-300 disabled:bg-accentStrong/50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {isLoading ? 'Authenticating...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <a href="/" className="text-sm text-primaryDark dark:text-accentStrong hover:underline">
                            &larr; Back to Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;