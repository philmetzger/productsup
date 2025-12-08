import React from "react";

import type { PageRange } from "../../hooks/usePagination";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageRange: PageRange;
  totalItems: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageRange,
  totalItems,
}) => {
  const pages = React.useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );

  const hasItems = totalItems > 0;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <nav
      className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Pagination"
    >
      <p className="text-sm text-gray-700">
        {hasItems ? (
          <>
            Showing{" "}
            <span className="font-medium">
              {pageRange.start}-{pageRange.end}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> products
          </>
        ) : (
          "No products to display"
        )}
      </p>

      <div className="inline-flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          className={`inline-flex h-10 items-center justify-center rounded border px-3 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            hasPreviousPage
              ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
              : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          }`}
          aria-label="Previous page"
        >
          Previous
        </button>

        <div className="hidden rounded-md border border-gray-200 bg-white px-1 py-1 text-sm font-medium text-gray-700 shadow-sm sm:flex">
          {pages.map((page) => {
            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={isCurrent ? "page" : undefined}
                className={`mx-0.5 inline-flex h-8 w-8 items-center justify-center rounded ${
                  isCurrent
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={`inline-flex h-10 items-center justify-center rounded border px-3 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            hasNextPage
              ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
              : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          }`}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </nav>
  );
};
