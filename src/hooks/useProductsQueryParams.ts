import { useMemo } from "react";

const DEFAULT_CATEGORY = "All Categories";
const DEFAULT_PAGE = 1;

export interface ProductsQueryParams {
  initialCategory: string;
  initialPage: number;
  searchParams: URLSearchParams;
}

export const useProductsQueryParams = (): ProductsQueryParams => {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const urlCategoryParam = searchParams.get("category");

  const initialCategory =
    !urlCategoryParam || urlCategoryParam === DEFAULT_CATEGORY
      ? DEFAULT_CATEGORY
      : urlCategoryParam;

  const urlPageParam = searchParams.get("page");
  const parsedPage = urlPageParam ? parseInt(urlPageParam, 10) : DEFAULT_PAGE;
  const initialPage =
    Number.isNaN(parsedPage) || parsedPage < 1 ? DEFAULT_PAGE : parsedPage;

  return {
    searchParams,
    initialCategory,
    initialPage,
  };
};
