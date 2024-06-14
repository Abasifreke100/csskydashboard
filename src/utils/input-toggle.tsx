import React, { CSSProperties, forwardRef, useState } from "react";
import cn from "../lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
}

type InputCSSProperties = Pick<
  CSSProperties,
  "backgroundColor" | "WebkitAppearance" | "MozAppearance" | "appearance"
  // Add other valid CSS properties for input elements here
>;

const InputToggle = forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputStyles: InputCSSProperties = {
      backgroundColor: "transparent", // Ensure background is transparent
      WebkitAppearance: "none",
      MozAppearance: "none",
      appearance: "none",
      ...props.style, // Merge with any custom styles passed via props
    };

    // Style for autofill states
    const autofillStyles = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active {
        -webkit-background-clip: text;
        transition: background-color 5000s ease-in-out 0s;
        box-shadow: inset 0 0 20px 20px #;
      }
    `;

    return (
      <div
        className={cn(
          "flex h-10 w-full relative  bg-[#F5F5F7] border border-grey text-grey placeholder:text-grey pr-10 rounded-md  outline-none   px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          props.className
        )}
      >
        <style>{autofillStyles}</style>
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className="bg-transparent flex-1 border-none  placeholder:text-grey pr-10 outline-none"
          style={inputStyles}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0  flex items-center px-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <Eye className="h-5" /> : <EyeOff className="h-5" />}
          </button>
        )}
      </div>
    );
  }
);

export default InputToggle;
