import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { MessageSquareText, User, Palette } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Apply theme CSS variables
    const themes = {
      light: {
        "--color-bg": "#F8F5E9",
        "--color-text": "#000000",
        "--color-hover": "#35A29F",
        "--color-hover-text": "#F8F5E9", // Text color for hover states in light mode
      },
      dark: {
        "--color-bg": "#1e293b",
        "--color-text": "#F8F5E9",
        "--color-hover": "#35A29F",
        "--color-hover-text": "#171717", // Text color for hover states in dark mode
      },
    };

    Object.entries(themes[theme]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // Add theme class to document for class-based styling
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 w-32 h-12">
            <Link
              to="/"
              className="flex items-center text-2xl font-bold w-full h-full hover:text-[var(--color-hover)] transition-colors"
            >
              <div className="flex items-center justify-center rounded-lg w-14 h-full">
                <MessageSquareText size={24} />
              </div>
              <span className="hidden sm:block">ChatX</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] transition-colors"
              aria-label="Toggle theme"
            >
              <Palette size={20} />
            </button>

            <Link
              to="/profile"
              className="px-4 py-2 rounded-md text-lg font-medium flex items-center gap-2 hover:text-[var(--color-hover)] transition-colors"
            >
              <User size={20} />
              <span>{authUser?.fullName || "User"}</span>
            </Link>

            {authUser ? (
              <button
                onClick={logout}
                className="px-4 py-2 border rounded-md text-lg font-medium hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] hover:border-[var(--color-hover)] transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 border rounded-md text-lg font-medium hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] hover:border-[var(--color-hover)] transition-colors"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Navigation (Directly displayed) */}
          <nav className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] transition-colors"
              aria-label="Toggle theme"
            >
              <Palette size={20} />
            </button>

            <Link
              to="/profile"
              className="px-3 py-2 rounded-md text-base font-medium hover:text-[var(--color-hover)] transition-colors flex items-center gap-2"
            >
              <User size={18} />
            </Link>

            {authUser ? (
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-[var(--color-hover)] hover:text-[var(--color-hover-text)] transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;