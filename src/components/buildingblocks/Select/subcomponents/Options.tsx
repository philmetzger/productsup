import React, { ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

export interface OptionsProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

const Options: React.FC<OptionsProps> = ({
  value,
  onChange,
  children,
  className = "",
  ...selectProps
}) => {
  if (value === undefined || onChange === undefined) {
    throw new Error(
      "Options must be used within a Select component with value and onChange props"
    );
  }

  return (
    <div className="relative inline-block w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none ${className}`}
        {...selectProps}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
};

export default Options;
