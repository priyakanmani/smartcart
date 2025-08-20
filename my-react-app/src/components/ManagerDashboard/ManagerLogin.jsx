import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ChevronRight, Eye, EyeOff, AlertCircle, Loader2, Store } from 'lucide-react';

const ManagerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/manager/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        if (data.token) {
          localStorage.setItem('managerToken', data.token);
        }
        setMessage('✅ Login successful');
        setTimeout(() => {
          navigate('/manager/overview');
        }, 800);
      } else {
        setMessage(`❌ ${data.message || 'Login failed'}`);
      }
    } catch (error) {
      setMessage('❌ Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-100"
      >
        {/* Branding Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            whileHover={{ rotate: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl w-24 h-24 flex items-center justify-center mb-6 shadow-lg"
          >
            <Store className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Shop <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Portal</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Manage your shop inventory and sales
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="relative"
            >
              <input
                id="email"
                type="email"
                placeholder="manager@shop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-none"
              />
            </motion.div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-1" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-1" />
                    Show
                  </>
                )}
              </button>
            </div>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="relative"
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-none"
              />
            </motion.div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Sign In <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </motion.button>

          {/* Message Display */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-xl text-center font-medium flex items-center justify-center ${
                  message.includes('✅')
                    ? 'bg-green-50/80 text-green-800 border-2 border-green-200'
                    : 'bg-red-50/80 text-red-800 border-2 border-red-200'
                }`}
              >
                {message.includes('❌') && <AlertCircle className="w-5 h-5 mr-2" />}
                {message.replace(/[✅❌]/g, '').trim()}
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
          <p className="flex items-center justify-center">
            <Lock className="w-4 h-4 mr-1.5" />
            Shop management system • Contact admin for access
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ManagerLogin;