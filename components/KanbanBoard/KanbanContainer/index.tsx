import React from "react";
import dynamic from "next/dynamic";
import { DropResult } from "react-beautiful-dnd";
import KanbanColumn from "../KanbanColumn";

const DragDropContext = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.DragDropContext;
  },
  { ssr: false }
);

type KanbanContainerProps = {
  board: Board;
  onDragEnd: (result: DropResult) => void;
};

const KanbanContainer: React.FC<KanbanContainerProps> = ({
  board,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-stone-100">
        {board.columns.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanContainer;
