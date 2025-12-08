import React from "react";
import type { Product } from "../../domains/product";
import { ProductCard } from "./ProductCard";

export interface ProductsCardListProps {
  products: Product[];
}

export const ProductsCardList: React.FC<ProductsCardListProps> = ({
  products,
}) => (
  <div className="space-y-3">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
