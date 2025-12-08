import React from "react";
import { Table } from "../buildingblocks/Table";

export const ProductsTableEmptyState: React.FC = () => (
  <Table.Row>
    <Table.Cell colSpan={4} className="py-5 text-center text-gray-500">
      No products found.
    </Table.Cell>
  </Table.Row>
);
