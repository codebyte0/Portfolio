import React, { useState, useEffect } from "react";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses
}: {
  title?: string;
  icon?: React.ReactNode;
  position?: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const updateTheme = () => {
      const mode = localStorage.getItem("theme") || "dark"; // Default to dark mode
      setDark(mode === "dark");
    };

    updateTheme();
    window.addEventListener("themeChange", updateTheme);

    return () => {
      window.removeEventListener("themeChange", updateTheme);
    };
  }, []);

  return (
    <div>
      <button
        onClick={handleClick}
        className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt-10 f-btn sm:w-[46%]"
      >
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className={`inline-flex h-full cursor-pointer items-center justify-center rounded-xl ${
            dark ? 'dark:rounded-xl bg-slate-950 hover:bg-slate-900' : 'bg-violet-700 hover:bg-violet-800'
          } px-5 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
        >
          {position === "left" && icon}
          {title}
          {position === "right" && icon}
        </span>
      </button>
    </div>
  );
};

export default MagicButton;
