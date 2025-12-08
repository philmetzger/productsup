import React from "react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "../../buildingblocks/Table";
import { ProductTableRow } from "../ProductRow";
import type { Product } from "../../../domains/product";

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: "1",
  name: "Test Product",
  category: "Electronics",
  price: 19.99,
  stock: 42,
  ...overrides,
});

describe("ProductTableRow", () => {
  const renderRow = (product: Product) => {
    return render(
      <Table ariaLabel="Products table">
        <Table.Body>
          <ProductTableRow product={product} />
        </Table.Body>
      </Table>
    );
  };

  it("renders the product name and category", () => {
    const product = makeProduct({
      name: "Awesome Widget",
      category: "Gadgets",
    });

    renderRow(product);

    expect(screen.getByText("Awesome Widget")).toBeInTheDocument();
    expect(screen.getByText("Gadgets")).toBeInTheDocument();
  });

  it("renders the formatted price with two decimal places", () => {
    const product = makeProduct({ price: 12 });

    renderRow(product);

    expect(screen.getByText("$12.00")).toBeInTheDocument();
  });

  it("renders the stock value with units", () => {
    const product = makeProduct({ stock: 7 });

    renderRow(product);

    expect(screen.getByText("7 units")).toBeInTheDocument();
  });
});
