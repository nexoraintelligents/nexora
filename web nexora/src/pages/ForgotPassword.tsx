import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post('/api/v1/auth/forgot-password', { email });
      setStatus('success');
      setMessage(response.data.message);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8 p-8 glass dark:bg-[#1e293b] bg-white/50 rounded-2xl shadow-2xl border border-white/10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email to receive a reset OTP
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400">
              {message}
            </div>
            <Link
              to="/reset-password"
              state={{ email }}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Go to Reset Page
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-200"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                {message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Reset OTP'}
              </button>
            </div>

            <div className="text-center">
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
