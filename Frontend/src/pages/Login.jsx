import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin, loading, error } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password });
    };

    return (
        <div className="pt-32 min-h-screen bg-black flex justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-full max-w-md h-fit border border-gray-800">
                <h2 className="text-3xl font-bold text-white mb-6">Sign In</h2>
                {error && <p className="text-red-500 mb-4 bg-red-500/10 p-2 rounded text-sm">{error}</p>}
                
                <input 
                    type="email" placeholder="Email" 
                    className="w-full p-3 mb-4 bg-gray-800 rounded text-white outline-none focus:ring-2 focus:ring-red-600"
                    onChange={(e) => setEmail(e.target.value)} required
                />
                <input 
                    type="password" placeholder="Password" 
                    className="w-full p-3 mb-6 bg-gray-800 rounded text-white outline-none focus:ring-2 focus:ring-red-600"
                    onChange={(e) => setPassword(e.target.value)} required
                />
                
                <button 
                    disabled={loading}
                    className="w-full bg-red-600 py-3 rounded font-bold text-white hover:bg-red-700 transition disabled:bg-gray-700"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default Login;