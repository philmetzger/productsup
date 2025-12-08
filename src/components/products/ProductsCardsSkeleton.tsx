import React from "react";

const SKELETON_CARD_COUNT = 6;

export const ProductsCardsSkeleton: React.FC = () => (
  <div className="space-y-3">
    {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
      <div
        key={index}
        className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
