import { describe, it, expect } from "vitest";
import { sortData } from "../sortData";
import type { SortDirection } from "../../hooks/useSort";

type Item = {
  id: number;
  name: string;
  price: number;
};

const sampleData: Item[] = [
  { id: 1, name: "Banana", price: 2 },
  { id: 2, name: "Apple", price: 3 },
  { id: 3, name: "Cherry", price: 1 },
];

const getValue = (item: Item, column: string): string | number => {
  // Narrow column keys used in tests
  if (column === "name") return item.name;
  if (column === "price") return item.price;
  if (column === "id") return item.id;
  return "";
};

describe("sortData", () => {
  it("returns original data when sortColumn is null", () => {
    const result = sortData<Item>(
      sampleData,
      null,
      null as SortDirection,
      getValue
    );
    expect(result).toEqual(sampleData);
  });

  it("sorts by string column in ascending order", () => {
    const result = sortData<Item>(sampleData, "name", "asc", getValue);
    const names = result.map((item) => item.name);
    expect(names).toEqual(["Apple", "Banana", "Cherry"]);
  });

  it("sorts by string column in descending order", () => {
    const result = sortData<Item>(sampleData, "name", "desc", getValue);
    const names = result.map((item) => item.name);
    expect(names).toEqual(["Cherry", "Banana", "Apple"]);
  });

  it("sorts by numeric column in ascending order", () => {
    const result = sortData<Item>(sampleData, "price", "asc", getValue);
    const prices = result.map((item) => item.price);
    expect(prices).toEqual([1, 2, 3]);
  });

  it("sorts by numeric column in descending order", () => {
    const result = sortData<Item>(sampleData, "price", "desc", getValue);
    const prices = result.map((item) => item.price);
    expect(prices).toEqual([3, 2, 1]);
  });
});
