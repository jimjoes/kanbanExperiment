import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DropResult } from "react-beautiful-dnd";
import useBoard from "../../utils/useBoard";
import KanbanContainer from "./KanbanContainer";

interface MyKanbanBoardProps {
  boardId: string;
}

const MyKanbanBoard: React.FC<MyKanbanBoardProps> = ({ boardId }) => {
  const queryClient = useQueryClient();
  const { board, isLoading, isError, mutate } = useBoard(boardId);

  // Render a message if board data is not available
  if (!board) {
    return <div>No board data available</div>;
  }

  const handleDrop = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = board.columns.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = board.columns.find(
      (column) => column.id === destination.droppableId
    );

    let newColumns;

    if (source.droppableId === destination.droppableId) {
      // Reorder deals within the same column
      const deals = Array.from(sourceColumn!.deals);
      const [movedDeal] = deals.splice(source.index, 1);
      deals.splice(destination.index, 0, movedDeal);

      newColumns = board.columns.map((column) => {
        if (column.id === source.droppableId) {
          return { ...column, deals };
        }
        return column;
      });
    } else {
      // Move deals between columns
      const sourceDeals = Array.from(sourceColumn!.deals);
      const destinationDeals = Array.from(destinationColumn!.deals);
      const [moveddeal] = sourceDeals.splice(source.index, 1);
      destinationDeals.splice(destination.index, 0, moveddeal);

      newColumns = board.columns.map((column) => {
        if (column.id === source.droppableId) {
          return { ...column, deals: sourceDeals };
        }
        if (column.id === destination.droppableId) {
          return { ...column, deals: destinationDeals };
        }
        return column;
      });
    }

    mutate({ ...board, columns: newColumns });
  };

  useEffect(() => {
    // Reset board query when component unmounts
    return () => {
      queryClient.resetQueries(["board", boardId]);
    };
  }, [queryClient, boardId]);

  return <KanbanContainer board={board} onDragEnd={handleDrop} />;
};

export default MyKanbanBoard;
