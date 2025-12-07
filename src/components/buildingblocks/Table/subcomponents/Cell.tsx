import React, { ReactNode } from "react";

export interface CellProps {
  children: ReactNode;
  className?: string;
}

const Cell: React.FC<CellProps> = ({ children, className = "" }) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
  );
};

export default Cell;
