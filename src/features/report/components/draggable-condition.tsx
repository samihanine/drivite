"use client";

import { InsertCondition } from "@/db/schemas";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ITEM_TYPE_CONDITION = "CONDITION";

type DragItem = {
  type: string;
  id: string;
  index: number;
  parentId: string;
};

export const DraggableCondition: React.FC<{
  condition: InsertCondition;
  index: number;
  parentId: string;
  moveCondition: (
    dragIndex: number,
    hoverIndex: number,
    parentId: string,
  ) => void;
  children: React.ReactNode;
}> = ({ condition, index, parentId, moveCondition, children }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE_CONDITION,
    item: { type: ITEM_TYPE_CONDITION, id: condition.id, index, parentId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<DragItem>({
    accept: ITEM_TYPE_CONDITION,
    hover(item) {
      if (item.type !== ITEM_TYPE_CONDITION) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      if (item.parentId !== parentId) return;
      moveCondition(dragIndex, hoverIndex, parentId);
      item.index = hoverIndex;
    },
  });

  return <div ref={(node) => dropRef(dragRef(node)) as any}>{children}</div>;
};
