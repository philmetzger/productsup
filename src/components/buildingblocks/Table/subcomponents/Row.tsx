import React, { ReactNode } from "react";

export interface RowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Row: React.FC<RowProps> = ({
  children,
  className = "",
  onClick,
}) => {
  const baseClasses = onClick
    ? "hover:bg-gray-50 transition-colors cursor-pointer"
    : "hover:bg-gray-50 transition-colors";

  return (
    <tr className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </tr>
  );
};

export default Row;

