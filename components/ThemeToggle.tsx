"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "system" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.className = newTheme;

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("themeChange"));
  };

  useEffect(() => {
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");

    // If no saved theme, default to dark mode
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.className = initialTheme;
  }, []);

  return (
    <button 
      onClick={toggleTheme} 
      style={{ position: "fixed", top: "10px", right: "10px", zIndex: 1000 }}
    >
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
