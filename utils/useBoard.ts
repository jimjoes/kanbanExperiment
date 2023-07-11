import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useBoard = (boardId: string) => {
  const queryClient = useQueryClient();
  const {
    data: board,
    isLoading: isQueryLoading,
    isError: isQueryError,
    error: queryError,
    refetch,
  } = useQuery<Board>(["board", boardId], async () => {
    const response = await fetch(`http://localhost:3000/api/boards/${boardId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch board data");
    }
    return response.json();
  });

  // Update the board data
  const {
    mutate,
    isLoading: isMutationLoading,
    isError: isMutationError,
    error: mutationError,
  } = useMutation<Board, unknown, Board>(
    async (updatedBoard) => {
      const response = await fetch(
        `http://localhost:3000/api/boards/${boardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBoard),
        }
      );
      console.log(`response from mutation: ${JSON.stringify(response)}`);
      if (!response.ok) {
        throw new Error("Failed to update board data");
      }
      return response.json();
    },
    {
      // Optimistic update
      onMutate: async (updatedBoard) => {
        await queryClient.cancelQueries({ queryKey: ["board", boardId] });

        const previousBoard = queryClient.getQueryData(["board", boardId]);

        queryClient.setQueryData(["board", boardId], updatedBoard);

        return { previousBoard, updatedBoard };
      },
      onSettled: () => {
        // Refetch the data to get the latest changes
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [boardId, refetch]);

  const isLoading = isQueryLoading || isMutationLoading;
  const isError = isQueryError || isMutationError;
  const error = queryError || mutationError;

  return {
    board,
    isLoading,
    isError,
    error,
    mutate,
  };
};

export default useBoard;
