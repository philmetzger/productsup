import { SortConfig } from "../hooks/useMultiSort";

/**
 * Generic function to sort data based on multiple columns with priority
 * 
 * @param data - Array of items to sort
 * @param sorts - Array of sort configurations with priority
 * @param getValue - Function to extract the value to sort by from each item
 * @returns Sorted array
 * 
 * @example
 * const sorted = sortMultiData(
 *   products,
 *   [
 *     { column: "category", direction: "asc", priority: 1 },
 *     { column: "price", direction: "desc", priority: 2 }
 *   ],
 *   (item, column) => item[column]
 * );
 */
export function sortMultiData<T>(
  data: T[],
  sorts: SortConfig<string>[],
  getValue: (item: T, column: string) => string | number
): T[] {
  if (sorts.length === 0) {
    return data;
  }

  // Sort by priority
  const sortedConfigs = [...sorts].sort((a, b) => a.priority - b.priority);

  return [...data].sort((a, b) => {
    for (const sortConfig of sortedConfigs) {
      const aValue = getValue(a, sortConfig.column as string);
      const bValue = getValue(b, sortConfig.column as string);

      let comparison = 0;

      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      }
      // Handle number comparison
      else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      }

      // Apply direction
      if (comparison !== 0) {
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }
      // If equal, continue to next sort column
    }

    return 0;
  });
}

