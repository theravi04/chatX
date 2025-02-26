import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Loader, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const LogInPage = () => {
  const { login, isLoggingIn } = useAuthStore();

  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.warning("Please enter both email and password");
      return;
    }
    try {
      await login(formData);
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-16">
      <div className="rounded-lg p-8 w-full max-w-sm border border-[var(--color-text)] bg-[var(--color-bg)]">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-[var(--color-text)] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-[var(--color-hover)] focus:ring-1 focus:ring-[var(--color-hover)] bg-[var(--color-bg)] text-[var(--color-text)]"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="shadow appearance-none border border-[var(--color-text)] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-[var(--color-hover)] focus:ring-1 focus:ring-[var(--color-hover)] bg-[var(--color-bg)] text-[var(--color-text)]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center px-2 hover:text-[var(--color-hover)] transition-colors"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`py-2 px-4 border border-[var(--color-text)] rounded-md transition-colors ${
                isLoggingIn
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] hover:border-[var(--color-hover)]"
              }`}
            >
              {isLoggingIn ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-base">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[var(--color-hover)] hover:underline font-medium transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;