"use client";

import { Question } from "@/db";
import React from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { QuestionCard } from "./question-card";

interface DragItem {
  type: string;
  id?: string;
  index?: number;
}

const DraggableQuestionCard: React.FC<{
  question: Question;
  index: number;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
  handleUpdateQuestion: (question: Question) => void;
}> = ({ question, index, moveQuestion, handleUpdateQuestion }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "question",
    item: () => ({
      type: "question",
      id: question.id,
      index,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "question",
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset
        ? (clientOffset as XYCoord).y - hoverBoundingRect.top
        : 0;

      if (!dragIndex) return;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveQuestion(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="cursor-pointer flex-1"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <QuestionCard
        question={question}
        handleUpdateQuestion={handleUpdateQuestion}
      />
    </div>
  );
};

export default DraggableQuestionCard;
