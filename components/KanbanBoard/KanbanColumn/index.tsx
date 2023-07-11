import React from "react";
import dynamic from "next/dynamic";
import DealCards from "../DealCards";

const Droppable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Droppable;
  },
  { ssr: false }
);

type KanbanColumnProps = {
  column: Column;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  const colorVariants = {
    pink: `border-pink-500`,
    cyan: "border-cyan-500",
    gray: "border-gray-500",
  };
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          className={`p-4 rounded-lg ${
            snapshot.isDraggingOver ? "bg-gray-300" : ""
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div
            className={`rounded bg-stone-50 py-4 ${
              colorVariants[column.color as keyof typeof colorVariants]
            } border-b-4 mb-4`}
          >
            <h2 className="text-xl text-center font-semibold">
              {column.title}
            </h2>
          </div>
          <DealCards deals={column.deals} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;
