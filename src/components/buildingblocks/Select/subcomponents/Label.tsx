import React, { ReactNode } from "react";

export interface LabelProps {
  children: ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = "" }) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
