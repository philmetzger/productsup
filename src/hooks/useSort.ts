import { useState, useCallback } from "react";

export type SortDirection = "asc" | "desc" | null;
export type SortColumn<T = string> = T | null;

export interface UseSortReturn<T = string> {
  sortColumn: SortColumn<T>;
  sortDirection: SortDirection;
  handleSort: (column: T) => void;
  resetSort: () => void;
}

/**
 * Generic hook for managing table column sorting state
 *
 * @returns Object containing sort state and handlers
 *
 * @example
 * const { sortColumn, sortDirection, handleSort } = useSort();
 */
export const useSort = <T = string>(): UseSortReturn<T> => {
  const [sortColumn, setSortColumn] = useState<SortColumn<T>>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = useCallback(
    (column: T) => {
      if (sortColumn === column) {
        // Toggle direction if same column
        if (sortDirection === "asc") {
          setSortDirection("desc");
        } else if (sortDirection === "desc") {
          // Third click clears sort
          setSortColumn(null);
          setSortDirection(null);
        } else {
          setSortDirection("asc");
        }
      } else {
        // New column, start with ascending
        setSortColumn(column);
        setSortDirection("asc");
      }
    },
    [sortColumn, sortDirection]
  );

  const resetSort = useCallback(() => {
    setSortColumn(null);
    setSortDirection(null);
  }, []);

  return {
    sortColumn,
    sortDirection,
    handleSort,
    resetSort,
  };
};
