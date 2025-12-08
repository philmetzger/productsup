import React, { ReactNode } from "react";
import {
  ArrowDownUp,
  ArrowDown01,
  ArrowUp10,
  ArrowDownAZ,
  ArrowUpZA,
} from "lucide-react";

export interface HeaderCellProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  sortType?: "text" | "number";
}

const HeaderCell: React.FC<HeaderCellProps> = ({
  children,
  onClick,
  className = "",
  sortable = false,
  sortDirection = null,
  sortType = "text",
}) => {
  const baseClasses =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const clickableClasses =
    sortable || onClick
      ? "cursor-pointer hover:bg-gray-100 transition-colors select-none"
      : "";

  const getSortIcon = () => {
    if (!sortable) return null;

    if (!sortDirection) {
      // Default state - show ArrowDownUp to indicate sortable
      return <ArrowDownUp className="h-4 w-4 text-gray-400" />;
    }

    // Show appropriate icon based on sortType and direction
    if (sortType === "number") {
      return sortDirection === "asc" ? (
        <ArrowDown01 className="h-4 w-4 text-gray-700" />
      ) : (
        <ArrowUp10 className="h-4 w-4 text-gray-700" />
      );
    } else {
      // text
      return sortDirection === "asc" ? (
        <ArrowDownAZ className="h-4 w-4 text-gray-700" />
      ) : (
        <ArrowUpZA className="h-4 w-4 text-gray-700" />
      );
    }
  };

  const ariaSort =
    sortable && sortDirection
      ? sortDirection === "asc"
        ? "ascending"
        : "descending"
      : sortable
      ? "none"
      : undefined;

  const labelText = typeof children === "string" ? children : undefined;

  const sortStatus =
    sortable && sortDirection
      ? sortDirection === "asc"
        ? "sorted ascending"
        : "sorted descending"
      : sortable
      ? "not sorted"
      : "";

  return (
    <th
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      aria-sort={ariaSort}
    >
      {sortable || onClick ? (
        <button
          type="button"
          className="flex items-center gap-2 w-full text-left cursor-pointer"
          onClick={onClick}
          aria-label={
            labelText
              ? `${labelText}, ${sortStatus}. Activate to change sort order.`
              : undefined
          }
        >
          <span>{children}</span>
          {getSortIcon()}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span>{children}</span>
          {getSortIcon()}
        </div>
      )}
    </th>
  );
};

export default HeaderCell;
