"use client";

import { InsertSection } from "@/db/schemas";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ITEM_TYPE_SECTION = "SECTION";

type DragItem = {
  type: string;
  id: string;
  index: number;
};

export const DraggableSection: React.FC<{
  section: InsertSection;
  index: number;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}> = ({ section, index, moveSection, children }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE_SECTION,
    item: { type: ITEM_TYPE_SECTION, id: section.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<DragItem>({
    accept: ITEM_TYPE_SECTION,
    hover(item) {
      if (item.type !== ITEM_TYPE_SECTION) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveSection(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return <div ref={(node) => dropRef(dragRef(node)) as any}>{children}</div>;
};
