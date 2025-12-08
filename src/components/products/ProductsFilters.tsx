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
  <Select value={selectedCategory} onChange={onCategoryChange}>
    <Select.Options>
      {CATEGORIES.map((cat) => (
        <Select.Option key={cat} value={cat}>
          {cat}
        </Select.Option>
      ))}
    </Select.Options>
  </Select>
);
