import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Loader, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

const SignUpPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.warning('Please enter your email');
      return false;
    }
    if (!formData.fullName.trim()) {
      toast.warning('Please enter your full name');
      return false;
    }
    if (!formData.password.trim()) {
      toast.warning('Please enter your password');
      return false;
    }
    if (formData.password.length < 6) {
      toast.warning('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signup(formData);
        toast.success('Account created successfully!');
      } catch (error) {
        toast.error('Failed to create account');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSigningUp}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSigningUp ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSigningUp ? <Loader className="w-5 h-5 animate-spin" /> : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;