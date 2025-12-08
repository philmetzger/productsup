import { SortConfig } from "../hooks/useMultiSort";

/**
 * Parse a multi-sort query parameter into an array of SortConfig objects.
 *
 * Expected format: "column.direction,column.direction"
 * Example: "name.asc,price.desc"
 *
 * @param sortParam - Raw sort query string (e.g. from URLSearchParams.get("sort"))
 * @param allowedColumns - Whitelist of allowed column keys to prevent arbitrary values
 */
export const parseMultiSortParam = <TColumn extends string>(
  sortParam: string | null,
  allowedColumns: readonly TColumn[]
): SortConfig<TColumn>[] => {
  if (!sortParam) return [];

  const parts = sortParam.split(",").map((part) => part.trim());

  const result: SortConfig<TColumn>[] = [];

  parts.forEach((part, index) => {
    if (!part) return;
    const [rawColumn, direction] = part.split(".");

    const column = rawColumn as TColumn | undefined;
    const isValidDirection = direction === "asc" || direction === "desc";
    const isAllowedColumn =
      column !== undefined && allowedColumns.includes(column as TColumn);

    if (!isValidDirection || !isAllowedColumn) {
      return;
    }

    result.push({
      column,
      direction,
      priority: index + 1,
    });
  });

  return result;
};

/**
 * Serialize an array of SortConfig objects into a query parameter string.
 *
 * Output format: "column.direction,column.direction"
 * Example: "name.asc,price.desc"
 */
export const serializeMultiSortParam = <TColumn extends string>(
  sorts: SortConfig<TColumn>[]
): string => {
  if (!sorts.length) return "";

  const sortedByPriority = [...sorts].sort((a, b) => a.priority - b.priority);

  return sortedByPriority
    .map((s) => `${String(s.column)}.${s.direction}`)
    .join(",");
};
