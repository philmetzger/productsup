import React from "react";
import { Select } from "../buildingblocks/Select";
import { CATEGORIES } from "../../constants/categories";

export interface ProductsFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
}) => (
  <div className="flex flex-col gap-2">
    <Select.Label htmlFor="category-filter">Filter by category</Select.Label>
    <Select value={selectedCategory} onChange={onCategoryChange}>
      <Select.Options id="category-filter" name="category">
        {CATEGORIES.map((cat) => (
          <Select.Option key={cat} value={cat}>
            {cat}
          </Select.Option>
        ))}
      </Select.Options>
    </Select>
  </div>
);
