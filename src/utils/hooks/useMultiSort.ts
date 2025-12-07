import { useState, useCallback } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface SortConfig<T = string> {
  column: T;
  direction: "asc" | "desc";
  priority: number;
}

export interface UseMultiSortReturn<T = string> {
  sorts: SortConfig<T>[];
  handleSort: (column: T, event?: React.MouseEvent) => void;
  clearSort: () => void;
  clearColumn: (column: T) => void;
  getSortDirection: (column: T) => "asc" | "desc" | null;
  getSortPriority: (column: T) => number | null;
}

/**
 * Generic hook for managing multi-column table sorting state
 *
 * Supports sorting by multiple columns with priority ordering.
 * The most recently clicked column becomes the primary sort (priority 1).
 *
 * Click behavior:
 * - First click: Add column as primary sort (ascending, priority 1), shift existing sorts down
 * - Second click: Toggle direction to descending
 * - Third click: Remove column from sort, shift remaining sorts up
 *
 * Multiple columns can be sorted simultaneously. The last clicked column
 * always has the highest priority (1), with previous sorts shifted down.
 *
 * @returns Object containing sort state and handlers
 *
 * @example
 * const { sorts, handleSort, getSortDirection, getSortPriority } = useMultiSort();
 *
 * // In your component:
 * <HeaderCell
 *   sortable
 *   onClick={(e) => handleSort("name", e)}
 *   sortDirection={getSortDirection("name")}
 *   sortPriority={getSortPriority("name")}
 * >
 *   Name
 * </HeaderCell>
 */
export const useMultiSort = <T = string>(): UseMultiSortReturn<T> => {
  const [sorts, setSorts] = useState<SortConfig<T>[]>([]);

  const handleSort = useCallback((column: T, event?: React.MouseEvent) => {
    setSorts((currentSorts) => {
      const existingSort = currentSorts.find((s) => s.column === column);

      if (existingSort) {
        // Column already sorted - move to top and toggle direction, or remove
        if (existingSort.direction === "asc") {
          // Move to priority 1 and change to desc
          const otherSorts = currentSorts
            .filter((s) => s.column !== column)
            .map((s) => ({ ...s, priority: s.priority + 1 }));
          return [{ column, direction: "desc", priority: 1 }, ...otherSorts];
        } else {
          // Remove from sort
          const removed = currentSorts.filter((s) => s.column !== column);
          // Recalculate priorities (most recent = priority 1)
          return removed.map((s, index) => ({ ...s, priority: index + 1 }));
        }
      } else {
        // New column to sort - add as primary (priority 1), shift others down
        const updatedSorts = currentSorts.map((s) => ({
          ...s,
          priority: s.priority + 1,
        }));
        return [{ column, direction: "asc", priority: 1 }, ...updatedSorts];
      }
    });
  }, []);

  const clearSort = useCallback(() => {
    setSorts([]);
  }, []);

  const clearColumn = useCallback((column: T) => {
    setSorts((currentSorts) => {
      const removed = currentSorts.filter((s) => s.column !== column);
      // Recalculate priorities
      return removed.map((s, index) => ({ ...s, priority: index + 1 }));
    });
  }, []);

  const getSortDirection = useCallback(
    (column: T): "asc" | "desc" | null => {
      const sort = sorts.find((s) => s.column === column);
      return sort?.direction ?? null;
    },
    [sorts]
  );

  const getSortPriority = useCallback(
    (column: T): number | null => {
      const sort = sorts.find((s) => s.column === column);
      return sort?.priority ?? null;
    },
    [sorts]
  );

  return {
    sorts,
    handleSort,
    clearSort,
    clearColumn,
    getSortDirection,
    getSortPriority,
  };
};
