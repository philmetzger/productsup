import React, { ReactNode } from "react";

export interface CellProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

const Cell: React.FC<CellProps> = ({ children, className = "", colSpan }) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap ${className}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export default Cell;
