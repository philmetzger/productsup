import React from "react";
import { Table } from "../buildingblocks/Table";
import type { Product } from "../../domains/product";

export interface ProductTableRowProps {
  product: Product;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
}) => (
  <Table.Row key={product.id}>
    <Table.Cell>
      <div className="text-sm font-medium text-gray-900">{product.name}</div>
    </Table.Cell>
    <Table.Cell>
      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
        {product.category}
      </span>
    </Table.Cell>
    <Table.Cell>
      <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
    </Table.Cell>
    <Table.Cell>
      <div className="text-sm text-gray-900">{product.stock} units</div>
    </Table.Cell>
  </Table.Row>
);
