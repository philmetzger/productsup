import React from "react";
import { Table } from "../buildingblocks/Table";

const SKELETON_ROW_COUNT = 10;

export const ProductsTableSkeleton: React.FC = () => (
  <>
    {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
      <Table.Row key={index}>
        <Table.Cell>
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        </Table.Cell>
        <Table.Cell>
          <div className="h-5 w-24 bg-gray-200 rounded-full animate-pulse" />
        </Table.Cell>
        <Table.Cell>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </Table.Cell>
        <Table.Cell>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </Table.Cell>
      </Table.Row>
    ))}
  </>
);
