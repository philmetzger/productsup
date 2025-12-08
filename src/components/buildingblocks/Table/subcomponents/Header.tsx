import React, { ReactNode } from "react";

export interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className = "" }) => {
  return (
    <thead
      className={`bg-gray-50 border-b border-gray-200 text-xs sm:text-sm ${className}`}
    >
      <tr>{children}</tr>
    </thead>
  );
};

export default Header;
