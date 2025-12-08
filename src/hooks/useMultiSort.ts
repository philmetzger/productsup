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

export interface UseMultiSortOptions<T = string> {
  /**
   * Optional initial sort configuration.
   * Useful when hydrating sort state from URL params or persisted storage.
   */
  initialSorts?: SortConfig<T>[];
}

/**
 * Generic hook for managing multi-column table sorting state
 *
 * Multiple columns can be sorted simultaneously. The last clicked column
 * always has the highest priority (1), with previous sorts shifted down.
 *
 * @returns Object containing sort state and handlers
 *
 * @example
 * const { sorts, handleSort, getSortDirection, getSortPriority } = useMultiSort();
 */
export const useMultiSort = <T = string>(
  options?: UseMultiSortOptions<T>
): UseMultiSortReturn<T> => {
  const { initialSorts } = options || {};

  const [sorts, setSorts] = useState<SortConfig<T>[]>(() => initialSorts ?? []);

  const handleSort = useCallback((column: T, event?: React.MouseEvent) => {
    setSorts((currentSorts) => {
      const existingSort = currentSorts.find((s) => s.column === column);

      if (existingSort) {
        // Column already sorted - move to top and toggle direction, or remove
        if (existingSort.direction === "desc") {
          // Move to priority 1 and change to asc
          const otherSorts = currentSorts
            .filter((s) => s.column !== column)
            .map((s) => ({ ...s, priority: s.priority + 1 }));
          return [{ column, direction: "asc", priority: 1 }, ...otherSorts];
        } else {
          // Remove from sort (next click after asc -> none)
          const removed = currentSorts.filter((s) => s.column !== column);
          // Recalculate priorities (most recent = priority 1)
          return removed.map((s, index) => ({ ...s, priority: index + 1 }));
        }
      } else {
        // New column to sort - start with descending and add as primary (priority 1),
        // shifting existing sorts down in priority
        const updatedSorts = currentSorts.map((s) => ({
          ...s,
          priority: s.priority + 1,
        }));
        return [{ column, direction: "desc", priority: 1 }, ...updatedSorts];
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
