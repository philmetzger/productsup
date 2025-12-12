import React from "react";
import { Table } from "../buildingblocks/Table";
import { Pagination } from "../buildingblocks/Pagination";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsFilters } from "./ProductsFilters";
import { ProductsTableSkeleton } from "./ProductsTableSkeleton";
import { ProductTableRow } from "./ProductRow";
import { ProductsCardList } from "./ProductsCardList";
import { ProductsCardsSkeleton } from "./ProductsCardsSkeleton";
import { ProductsSortControls } from "./ProductsSortControls";
import { useProducts } from "../../hooks/useProducts";

const Products: React.FC = () => {
  const {
    isLoading,
    products,
    pagination,
    selectedCategory,
    setSelectedCategory,
    handleSort,
    getSortDirection,
    getSortPriority,
  } = useProducts();

  const [isMobileView, setIsMobileView] = React.useState(true);

  return (
    <div aria-labelledby="products-heading">
      <ProductsHeader />

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="rounded border border-gray-300 px-3 py-1 text-sm shadow-sm hover:bg-gray-50"
          onClick={() => setIsMobileView((prev) => !prev)}
        >
          {isMobileView ? "Switch to desktop view" : "Switch to mobile view"}
        </button>
      </div>

      <div className="mb-4">
        <ProductsFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Mobile-only sort controls (desktop uses table header sorting) */}
      <div className={`mb-4 md:hidden ${isMobileView ? "" : "hidden"}`}>
        <ProductsSortControls
          onSort={handleSort}
          getSortDirection={getSortDirection}
        />
      </div>

      {/* Mobile: card list */}
      <div className={`mb-4 ${isMobileView ? "" : "hidden"}`}>
        {isLoading ? (
          <ProductsCardsSkeleton />
        ) : (
          <ProductsCardList products={products} />
        )}
      </div>

      {/* Desktop: table view */}
      <Table
        className={isMobileView ? "hidden" : "md:block"}
        ariaLabel="Products table"
      >
        <Table.Header>
          <Table.HeaderCell
            sortable={true}
            sortType="text"
            onClick={() => handleSort("name")}
            sortDirection={getSortDirection("name")}
            sortPriority={getSortPriority("name")}
          >
            Product Name
          </Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell
            sortable={true}
            sortType="number"
            onClick={() => handleSort("price")}
            sortDirection={getSortDirection("price")}
            sortPriority={getSortPriority("price")}
          >
            Price
          </Table.HeaderCell>
          <Table.HeaderCell
            sortable={true}
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
          ) : (
            products.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))
          )}
        </Table.Body>
      </Table>

      {!isLoading && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          pageRange={pagination.pageRange}
          totalItems={pagination.totalItems}
        />
      )}
    </div>
  );
};

export default Products;
