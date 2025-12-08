import React, { ReactNode } from "react";

export interface LabelProps {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = "", htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
