import React, { ReactNode } from "react";

export interface BodyProps {
  children: ReactNode;
  className?: string;
}

const Body: React.FC<BodyProps> = ({ children, className = "" }) => {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
};

export default Body;
