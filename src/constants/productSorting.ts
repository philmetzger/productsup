export const ALLOWED_SORT_COLUMNS = ["price", "stock"] as const;

export type ProductSortColumn = (typeof ALLOWED_SORT_COLUMNS)[number];
