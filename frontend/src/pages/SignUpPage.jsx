import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SignUpPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.warning("Please enter your email");
      return false;
    }
    if (!formData.fullName.trim()) {
      toast.warning("Please enter your full name");
      return false;
    }
    if (!formData.password.trim()) {
      toast.warning("Please enter your password");
      return false;
    }
    if (formData.password.length < 6) {
      toast.warning("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signup(formData);
        toast.success("Account created successfully!");
      } catch (error) {
        toast.error("Failed to create account");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-16">
      <div className="rounded-lg p-8 w-full max-w-sm border border-[var(--color-text)] bg-[var(--color-bg)]">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-[var(--color-text)] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-[var(--color-hover)] focus:ring-1 focus:ring-[var(--color-hover)] bg-[var(--color-bg)] text-[var(--color-text)]"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-[var(--color-text)] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-[var(--color-hover)] focus:ring-1 focus:ring-[var(--color-hover)] bg-[var(--color-bg)] text-[var(--color-text)]"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-bold mb-2" htmlFor="password">
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
                className="shadow appearance-none border border-[var(--color-text)] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-[var(--color-hover)] focus:ring-1 focus:ring-[var(--color-hover)] bg-[var(--color-bg)] text-[var(--color-text)]"
                placeholder="Create a password"
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
              disabled={isSigningUp}
              className={`py-2 px-4 border border-[var(--color-text)] rounded-md transition-colors ${
                isSigningUp
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] hover:border-[var(--color-hover)]"
              }`}
            >
              {isSigningUp ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--color-hover)] hover:underline font-medium transition-colors"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;