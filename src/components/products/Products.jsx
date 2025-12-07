import React, { useState, useMemo } from "react";
import productsData from "../../data/products.json";
import { Select } from "../buildingblocks/Select";
import { Table } from "../buildingblocks/Table";
import { useMultiSort } from "../../utils/hooks/useMultiSort";
import { sortMultiData } from "../../utils/sorting/sortMultiData";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { sorts, handleSort, getSortDirection, getSortPriority } =
    useMultiSort();

  const categories = useMemo(
    () => ["all", ...new Set(productsData.map((p) => p.category))],
    []
  );

  const filteredProducts = useMemo(() => {
    const filtered =
      selectedCategory === "all"
        ? productsData
        : productsData.filter((p) => p.category === selectedCategory);

    return sortMultiData(filtered, sorts, (product, column) => {
      if (column === "name") return product.name;
      if (column === "price") return product.price;
      if (column === "stock") return product.stock;
      return "";
    });
  }, [selectedCategory, sorts]);

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
            onClick={(e) => handleSort("name", e)}
            sortDirection={getSortDirection("name")}
            sortPriority={getSortPriority("name")}
          >
            Product Name
          </Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell
            sortable
            sortType="number"
            onClick={(e) => handleSort("price", e)}
            sortDirection={getSortDirection("price")}
            sortPriority={getSortPriority("price")}
          >
            Price
          </Table.HeaderCell>
          <Table.HeaderCell
            sortable
            sortType="number"
            onClick={(e) => handleSort("stock", e)}
            sortDirection={getSortDirection("stock")}
            sortPriority={getSortPriority("stock")}
          >
            Stock
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {filteredProducts.map((product) => (
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
          ))}
        </Table.Body>
      </Table>

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {productsData.length} products
      </div>
    </>
  );
};

export default Products;
