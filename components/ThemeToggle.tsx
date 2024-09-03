"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme") || "system";
    const newTheme = currentTheme === "system" ? "dark" : "system";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.className = newTheme;

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("themeChange"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  return (
    <button onClick={toggleTheme} style={{ position: "fixed", top: "10px", right: "10px", zIndex: 1000 }}>
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
