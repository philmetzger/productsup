import React, { useEffect, useMemo, useRef, useState } from "react";
import productsData from "../../data/products.json";
import { Select } from "../buildingblocks/Select";
import { Table } from "../buildingblocks/Table";
import { useMultiSort } from "../../utils/hooks/useMultiSort";
import { sortMultiData } from "../../utils/sorting/sortMultiData";
import { usePagination } from "../../utils/hooks/usePagination";
import { Pagination } from "../buildingblocks/Pagination";
import {
  parseMultiSortParam,
  serializeMultiSortParam,
} from "../../utils/sorting/sortQueryParams";

interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  stock: number;
}
const allProducts = productsData as Product[];

const CATEGORY_OPTIONS: string[] = [
  "all",
  ...Array.from(new Set(allProducts.map((p) => p.category))),
];

const ALLOWED_SORT_COLUMNS = ["name", "price", "stock"] as const;
type ProductSortColumn = (typeof ALLOWED_SORT_COLUMNS)[number];

const Products: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const urlCategory = searchParams.get("category");
  const initialCategory =
    urlCategory && CATEGORY_OPTIONS.includes(urlCategory) ? urlCategory : "all";

  const urlPageParam = searchParams.get("page");
  const parsedPage = urlPageParam ? parseInt(urlPageParam, 10) : 1;
  const initialPage =
    Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

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
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const categories = useMemo(() => CATEGORY_OPTIONS, []);

  const filteredProducts = useMemo(() => {
    const filtered =
      selectedCategory === "all"
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

    if (selectedCategory && selectedCategory !== "all") {
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
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Products</h2>
        <p className="text-gray-600">Manage your product inventory</p>
      </div>

      <div className="mb-6 max-w-xs">
        <Select value={selectedCategory} onChange={setSelectedCategory}>
          <Select.Label>Filter by Category</Select.Label>
          <Select.Options>
            {categories.map((cat) => (
              <Select.Option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </Select.Option>
            ))}
          </Select.Options>
        </Select>
      </div>

      <Table>
        <Table.Header>
          <Table.HeaderCell
            sortable
            sortType="text"
            onClick={() => handleSort("name")}
            sortDirection={getSortDirection("name")}
            sortPriority={getSortPriority("name")}
          >
            Product Name
          </Table.HeaderCell>
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
            Array.from({ length: 10 }).map((_, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </Table.Cell>
                <Table.Cell>
                  <div className="h-5 w-24 bg-gray-200 rounded-full animate-pulse" />
                </Table.Cell>
                <Table.Cell>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </Table.Cell>
                <Table.Cell>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </Table.Cell>
              </Table.Row>
            ))
          ) : filteredProducts.length === 0 ? (
            <Table.Row>
              <Table.Cell
                colSpan={4}
                className="py-5 text-center text-gray-500"
              >
                No products found.
              </Table.Cell>
            </Table.Row>
          ) : (
            paginatedProducts.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-sm text-gray-900">
                    {product.stock} units
                  </div>
                </Table.Cell>
              </Table.Row>
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
    </>
  );
};

export default Products;
