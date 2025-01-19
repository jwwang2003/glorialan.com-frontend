"use client"

import React, {
  ReactNode,
  useState,
  useEffect,
  ButtonHTMLAttributes,
} from "react";

type ButtonState = "initial" | "spinning" | "progress" | "finished" | "error" | "success";
type ButtonTheme = "none" | "white" | "pink" | "red" | "green" | "blue";

interface CustomButtonProps {
  children?: ReactNode;
  theme?: ButtonTheme;
  state?: ButtonState;
  /** Progress can be supplied externally. If omitted, internal useEffect increments automatically. */
  progress?: number;
}

/**
 * Extend the built-in ButtonHTMLAttributes with your custom props.
 */
type ButtonProps = CustomButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Spinning = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4
       zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 
       3 7.938l3-2.647z"
    />
  </svg>
);

export default function Button({
  children,
  theme = "white",
  state = "initial",
  progress: externalProgress,
  className,
  ...props
}: ButtonProps) {
  // Merge external progress with internal state if desired
  // If no external progress is provided, default to 0 and use internal auto-increment
  const [progress, setProgress] = useState(externalProgress ?? 0);

  useEffect(() => {
    // Button state has changed!
    switch (state) {
      case "initial":
        setProgress(0);
        break;
      default:
        break;
    }
  }, [state]);

  useEffect(() => {
    // Only auto-increment if external progress isn't controlling it
    if (externalProgress === undefined && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => prev + 10);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, externalProgress]);

  let themeClass = "";
  switch (theme) {
    case "none":
      themeClass = "";
      break;
    case "white":
      themeClass = "button_white";
      break;
    case "pink":
      themeClass = "button_pink";
      break;
    case "red":
      themeClass = "button_red";
      break;
    case "green":
      themeClass = "button_green";
      break;
    case "blue":
      themeClass = "button_blue";
      break;
    // Add other theme cases here...
    default:
      themeClass = "";
  }

  return (
    <button
      // Spread all standard button props (onClick, disabled, etc.)
      {...props}
      // Combine any incoming className with your custom classes
      className={`relative ${themeClass} ${className ?? ""}`}
    >
      {/* Background progress bar */}
      {
        state === "progress" &&
        <span className={`progress_bar`} style={{ width: `${progress}%` }}>
          <p
            className={`${
              state === "progress" && progress !== 100
                ? "opacity-100"
                : "opacity-40"
            }`}
          >
            {progress}
          </p>
        </span>
      }

      {/* Spinning icon if state is "spinning" */}
      {state === "spinning" && <Spinning />}
      
      {
        (state === "error" || state === "finished" || state === "success") &&
          <span className="absolute flex h-3 w-3 -top-1 -right-1">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
              ${ state === "error" && "bg-orange-400" }
              ${ state === "finished" && "bg-sky-400" }
              ${ state === "success" && "bg-green-400" }
              `} />
            <span className={`relative inline-flex rounded-full h-3 w-3
              ${ state === "error" && "bg-orange-500" }
              ${ state === "finished" && "bg-sky-500" }
              ${ state === "success" && "bg-green-500" }
            `} />
          </span>
      }

      {/* Button text / children */}
      <span
        className={`z-10 
          ${state === "progress" && progress !== 100 && "opacity-30"}
        `}
      >
        {children}
      </span>
    </button>
  );
}
