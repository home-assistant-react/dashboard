import React from "react";

export interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  scrollToIndex?: number;
  padding?: number;
}
