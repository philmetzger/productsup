import React from "react";
import {
  ArrowDownUp,
  ArrowDown01,
  ArrowUp10,
  ArrowDownAZ,
  ArrowUpZA,
} from "lucide-react";
import type { SortDirection } from "../../hooks/useMultiSort";
import type { ProductSortColumn } from "../../constants/productSorting";

export interface ProductsSortControlsProps {
  onSort: (column: ProductSortColumn) => void;
  getSortDirection: (column: ProductSortColumn) => SortDirection;
}

interface SortOptionConfig {
  column: ProductSortColumn;
  label: string;
  sortType: "text" | "number";
}

const SORT_OPTIONS: SortOptionConfig[] = [
  { column: "price", label: "Price", sortType: "number" },
  { column: "stock", label: "Stock", sortType: "number" },
];

const getSortIcon = (direction: SortDirection, sortType: "text" | "number") => {
  if (!direction) {
    return <ArrowDownUp className="h-4 w-4 text-gray-400" />;
  }

  if (sortType === "number") {
    return direction === "asc" ? (
      <ArrowDown01 className="h-4 w-4 text-gray-700" />
    ) : (
      <ArrowUp10 className="h-4 w-4 text-gray-700" />
    );
  }

  // text
  return direction === "asc" ? (
    <ArrowDownAZ className="h-4 w-4 text-gray-700" />
  ) : (
    <ArrowUpZA className="h-4 w-4 text-gray-700" />
  );
};

export const ProductsSortControls: React.FC<ProductsSortControlsProps> = ({
  onSort,
  getSortDirection,
}) => (
    <section
        aria-label="Sort products"
        className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm"
    >
        {SORT_OPTIONS.map(({ column, label, sortType }) => {
            const direction = getSortDirection(column);
            const isActive = !!direction;

            return (
                <button
                    key={column}
                    type="button"
                    onClick={() => onSort(column)}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 transition-colors ${isActive
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                    {getSortIcon(direction, sortType)}
                    <span>{label}</span>
                </button>
            );
        })}
    </section>
);
