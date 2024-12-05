"use client";

import { InsertQuestion } from "@/db/schemas";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ITEM_TYPE_QUESTION = "QUESTION";

type DragItem = {
  type: string;
  id: string;
  index: number;
  parentId?: string;
  grandParentId?: string | null;
};

export const DraggableQuestion: React.FC<{
  question: InsertQuestion;
  index: number;
  parentId?: string;
  grandParentId?: string | null;
  moveQuestion: (
    dragIndex: number,
    hoverIndex: number,
    parentId?: string,
    grandParentId?: string | null,
  ) => void;
  children: React.ReactNode;
}> = ({ question, index, parentId, grandParentId, moveQuestion, children }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE_QUESTION,
    item: {
      type: ITEM_TYPE_QUESTION,
      id: question.id,
      index,
      parentId,
      grandParentId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<DragItem>({
    accept: ITEM_TYPE_QUESTION,
    hover(item) {
      if (item.type !== ITEM_TYPE_QUESTION) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      if (item.parentId !== parentId || item.grandParentId !== grandParentId)
        return;
      moveQuestion(dragIndex, hoverIndex, parentId, grandParentId);
      item.index = hoverIndex;
    },
  });

  return <div ref={(node) => dropRef(dragRef(node)) as any}>{children}</div>;
};
