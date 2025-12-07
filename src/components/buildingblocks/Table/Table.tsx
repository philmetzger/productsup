import React, { ReactNode } from "react";

export interface TableProps {
  children: ReactNode;
  className?: string;
}

const TableComponent: React.FC<TableProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  );
};

const Table = TableComponent as React.FC<TableProps> & {
  Header: React.ComponentType<{ children: ReactNode; className?: string }>;
  HeaderCell: React.ComponentType<{
    children: ReactNode;
    onClick?: (e?: React.MouseEvent) => void;
    className?: string;
    sortable?: boolean;
    sortDirection?: "asc" | "desc" | null;
    sortType?: "text" | "number";
    sortPriority?: number | null;
  }>;
  Body: React.ComponentType<{ children: ReactNode; className?: string }>;
  Row: React.ComponentType<{
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }>;
  Cell: React.ComponentType<{ children: ReactNode; className?: string }>;
};

export default Table;

