import React from "react";
import type { Product } from "../../domains/product";

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <article className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
        <header className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
            <span className="whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {product.category}
            </span>
        </header>

        <dl className="mt-2 grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
                <dt className="text-gray-500">Price</dt>
                <dd className="font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                </dd>
            </div>
            <div>
                <dt className="text-gray-500">Stock</dt>
                <dd className="font-medium text-gray-900">{product.stock} units</dd>
            </div>
        </dl>
    </article>
);
