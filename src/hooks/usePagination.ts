import { useCallback, useEffect, useMemo, useState } from "react";

export interface UsePaginationOptions {
  /**
   * Total number of items across all pages.
   * For client-side pagination this is typically `items.length`.
   * For server-side pagination this can come from an API.
   */
  totalItems: number;
  /**
   * Number of items per page. Defaults to 10.
   */
  pageSize?: number;
  /**
   * Initial page (1-based). Defaults to 1.
   */
  initialPage?: number;
  /**
   * Optional callback fired whenever the current page changes.
   * Useful for server-side pagination to trigger data fetching.
   */
  onPageChange?: (page: number) => void;
}

export interface PageRange {
  /**
   * 1-based index of the first item on the current page.
   * Will be 0 when there are no items.
   */
  start: number;
  /**
   * 1-based index of the last item on the current page.
   * Will be 0 when there are no items.
   */
  end: number;
}

export interface UsePaginationResult {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  pageRange: PageRange;
  canPreviousPage: boolean;
  canNextPage: boolean;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const clamp = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

/**
 * Generic, reusable pagination hook.
 *
 * Works for both client-side and server-side pagination:
 * - Client-side: pass `totalItems` and slice your in-memory array using
 *   the returned `startIndex` / `endIndex`.
 * - Server-side: pass `totalItems` from the API and use `currentPage`
 *   / `pageSize` / `startIndex` to request the correct slice from the server.
 */
export const usePagination = ({
  totalItems,
  pageSize = 10,
  initialPage = 1,
  onPageChange,
}: UsePaginationOptions): UsePaginationResult => {
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    return clamp(initialPage, 1, totalPages);
  });

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize]
  );

  // Keep currentPage within bounds whenever totalItems/pageSize change.
  useEffect(() => {
    setCurrentPage((prev) => clamp(prev, 1, totalPages));
  }, [totalPages]);

  const safeSetPage = useCallback(
    (page: number) => {
      const nextPage = clamp(page, 1, totalPages);
      setCurrentPage(nextPage);
      if (onPageChange) {
        onPageChange(nextPage);
      }
    },
    [onPageChange, totalPages]
  );

  const goToPage = useCallback(
    (page: number) => {
      safeSetPage(page);
    },
    [safeSetPage]
  );

  const goToNextPage = useCallback(() => {
    safeSetPage(currentPage + 1);
  }, [currentPage, safeSetPage]);

  const goToPreviousPage = useCallback(() => {
    safeSetPage(currentPage - 1);
  }, [currentPage, safeSetPage]);

  const { startIndex, endIndex, pageRange } = useMemo(() => {
    if (totalItems === 0) {
      return {
        startIndex: 0,
        endIndex: 0,
        pageRange: { start: 0, end: 0 },
      };
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    return {
      startIndex,
      endIndex,
      pageRange: {
        start: startIndex + 1,
        end: endIndex,
      },
    };
  }, [currentPage, pageSize, totalItems]);

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;

  return {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    pageRange,
    canPreviousPage,
    canNextPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };
};
