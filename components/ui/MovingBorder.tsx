"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
}

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: ButtonProps) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const mode = localStorage.getItem("theme") || "system";
    setDark(mode === "dark");
  }, []);

  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl md:col-span-2 p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20",
              dark
                ? "!bg-[radial-gradient(var(--violet-500)_40%,transparent_60%)] dark:opacity-80"
                : "bg-dot-white-100",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative",
          "text-black dark:text-white",
          "border border-slate-900 backdrop-blur-xl",
          "flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x || 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y || 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
