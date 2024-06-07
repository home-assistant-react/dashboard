import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@home-assistant-react/ui/src";
import React from "react";

export interface SortableItemProps extends React.PropsWithChildren {
  id: string;
  isColumn?: boolean;
}

const classes = {
  Wrapper: "overflow-hidden",
  Column: "shrink-0 h-full flex items-center",
  Row: "w-full",
};

export const SidebarSortableItem: React.FC<SortableItemProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      className={[
        classes.Wrapper,
        props.isColumn ? classes.Column : classes.Row,
      ]}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </Box>
  );
};
