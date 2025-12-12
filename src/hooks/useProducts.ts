import { useEffect, useMemo, useRef, useState } from "react";
import productsData from "../data/products.json";
import { useMultiSort } from "./useMultiSort";
import { sortMultiData } from "../utils/sortMultiData";
import { usePagination } from "./usePagination";
import {
  parseMultiSortParam,
  serializeMultiSortParam,
} from "../utils/sortQueryParams";
import { Product } from "../domains/product";
import { useProductsQueryParams } from "./useProductsQueryParams";
import {
  ALLOWED_SORT_COLUMNS,
  ProductSortColumn,
} from "../constants/productSorting";

const allProducts = productsData as Product[];

export const useProducts = () => {
  const { searchParams, initialCategory, initialPage } =
    useProductsQueryParams();

  const initialSortsFromUrl = parseMultiSortParam<ProductSortColumn>(
    searchParams.get("sort"),
    ALLOWED_SORT_COLUMNS
  );

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { sorts, handleSort, getSortDirection, getSortPriority } =
    useMultiSort<ProductSortColumn>({
      initialSorts: initialSortsFromUrl,
    });

  const hasInitializedPageReset = useRef(false);

  // Simulate data loading so we can see the skeleton state
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered =
      selectedCategory === "All Categories"
        ? allProducts
        : allProducts.filter((p) => p.category === selectedCategory);

    return sortMultiData(filtered, sorts, (product, column) => {
      switch (column) {
        case "name":
          return product.name;
        case "price":
          return product.price;
        case "stock":
          return product.stock;
        default:
          return "";
      }
    });
  }, [selectedCategory, sorts]);

  const pagination = usePagination({
    totalItems: filteredProducts.length,
    pageSize: 10,
    initialPage,
  });
  const { currentPage, goToPage } = pagination;
  // Reset to first page whenever filters or sorts change
  useEffect(() => {
    if (!hasInitializedPageReset.current) {
      hasInitializedPageReset.current = true;
      return;
    }
    goToPage(currentPage);
  }, [currentPage, selectedCategory, sorts, goToPage]);

  // Sync filter, sort, and page state to URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (selectedCategory && selectedCategory !== "All Categories") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (currentPage > 1) {
      params.set("page", String(currentPage));
    } else {
      params.delete("page");
    }

    const sortParam = serializeMultiSortParam<ProductSortColumn>(sorts);
    if (sortParam) {
      params.set("sort", sortParam);
    } else {
      params.delete("sort");
    }

    const queryString = params.toString();
    const newUrl =
      queryString.length > 0
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [selectedCategory, sorts, currentPage]);

  const products = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, pagination]);

  return {
    selectedCategory,
    setSelectedCategory,
    isLoading,
    products,
    sorts,
    handleSort,
    getSortDirection,
    getSortPriority,
    pagination,
  };
};

export type UseProductsResult = ReturnType<typeof useProducts>;
