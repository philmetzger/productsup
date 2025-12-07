import { SortDirection } from "../hooks/useSort";

/**
 * Generic function to sort data based on column and direction
 *
 * @param data - Array of items to sort
 * @param sortColumn - Column key to sort by
 * @param sortDirection - Sort direction ("asc" | "desc" | null)
 * @param getValue - Function to extract the value to sort by from each item
 * @returns Sorted array
 *
 * @example
 * const sorted = sortData(
 *   products,
 *   "name",
 *   "asc",
 *   (item) => item.name
 * );
 */
export function sortData<T>(
  data: T[],
  sortColumn: string | null,
  sortDirection: SortDirection,
  getValue: (item: T, column: string) => string | number
): T[] {
  if (!sortColumn || !sortDirection) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aValue = getValue(a, sortColumn);
    const bValue = getValue(b, sortColumn);

    // Handle string comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === "asc" ? comparison : -comparison;
    }

    // Handle number comparison
    if (typeof aValue === "number" && typeof bValue === "number") {
      const comparison = aValue - bValue;
      return sortDirection === "asc" ? comparison : -comparison;
    }

    return 0;
  });
}
