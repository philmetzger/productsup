import React, { useEffect, useMemo, useRef, useState } from "react";
import productsData from "../../data/products.json";
import { Table } from "../buildingblocks/Table";
import { useMultiSort } from "../../hooks/useMultiSort";
import { sortMultiData } from "../../utils/sortMultiData";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../buildingblocks/Pagination";
import {
  parseMultiSortParam,
  serializeMultiSortParam,
} from "../../utils/sortQueryParams";
import { Product } from "../../domains/product";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsFilters } from "./ProductsFilters";
import { ProductsTableSkeleton } from "./ProductsTableSkeleton";
import { ProductsTableEmptyState } from "./ProductsTableEmptyState";
import { ProductTableRow } from "./ProductRow";
import { useProductsQueryParams } from "../../hooks/useProductsQueryParams";
import { ProductsCardList } from "./ProductsCardList";
import { ProductsCardsSkeleton } from "./ProductsCardsSkeleton";
import { ProductsCardsEmptyState } from "./ProductsCardsEmptyState";
import { ProductsSortControls } from "./ProductsSortControls";
import {
  ALLOWED_SORT_COLUMNS,
  ProductSortColumn,
} from "../../constants/productSorting";

const allProducts = productsData as Product[];

const Products: React.FC = () => {
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

  // @todo-phil: Simulate data loading so we can see the skeleton state
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
        case "price":
          return product.price;
        case "stock":
          return product.stock;
        default:
          return "";
      }
    });
  }, [selectedCategory, sorts]);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    pageRange,
    canPreviousPage,
    canNextPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination({
    totalItems: filteredProducts.length,
    pageSize: 10,
    initialPage,
  });

  // Reset to first page whenever filters or sorts change
  useEffect(() => {
    if (!hasInitializedPageReset.current) {
      hasInitializedPageReset.current = true;
      return;
    }
    goToPage(1);
  }, [selectedCategory, sorts, goToPage]);

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

  const paginatedProducts = useMemo(
    () => filteredProducts.slice(startIndex, endIndex),
    [filteredProducts, startIndex, endIndex]
  );

  return (
    <main aria-labelledby="products-heading">
      <ProductsHeader />

      <div className="mb-4">
        <ProductsFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Mobile-only sort controls (desktop uses table header sorting) */}
      <div className="mb-4 md:hidden">
        <ProductsSortControls
          onSort={handleSort}
          getSortDirection={getSortDirection}
        />
      </div>

      {/* Mobile: card list */}
      <div className="mb-4 md:hidden">
        {isLoading ? (
          <ProductsCardsSkeleton />
        ) : filteredProducts.length === 0 ? (
          <ProductsCardsEmptyState />
        ) : (
          <ProductsCardList products={paginatedProducts} />
        )}
      </div>

      {/* Desktop: table view */}
      <Table className="hidden md:block" ariaLabel="Products table">
        <Table.Header>
          <Table.HeaderCell>Product Name</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell
            sortable
            sortType="number"
            onClick={() => handleSort("price")}
            sortDirection={getSortDirection("price")}
            sortPriority={getSortPriority("price")}
          >
            Price
          </Table.HeaderCell>
          <Table.HeaderCell
            sortable
            sortType="number"
            onClick={() => handleSort("stock")}
            sortDirection={getSortDirection("stock")}
            sortPriority={getSortPriority("stock")}
          >
            Stock
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <ProductsTableSkeleton />
          ) : filteredProducts.length === 0 ? (
            <ProductsTableEmptyState />
          ) : (
            paginatedProducts.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))
          )}
        </Table.Body>
      </Table>

      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
          onPageChange={goToPage}
          pageRange={pageRange}
          totalItems={filteredProducts.length}
        />
      )}
    </main>
  );
};

export default Products;
