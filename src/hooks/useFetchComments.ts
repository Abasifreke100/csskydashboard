import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { QueryKeys } from "../models/query";
import { errorToast, successToast } from "../utils/toast";
import { CommentService } from "../service/comments";

/**
 * Custom hook to fetch comments for a specific task using React Query.
 *
 * @param {string} taskID - The ID of the task to fetch comments for.
 * @returns {{
 *   data: CommentResponse[] | undefined,
 *   isLoading: boolean,
 *   isError: boolean,
 *   error: unknown,
 * }} An object containing the comments data, loading state, error state, and error message.
 */
export const useFetchComments = (taskID: string) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: QueryKeys.Get_Comments_By_TaskID(taskID),
    queryFn: () => CommentService.fetchComments(taskID),
    enabled:!!taskID, // Ensure taskID is provided before making the query
  });

  // Show toast notifications based on success or error state
  useEffect(() => {
    if (isSuccess) {
      successToast({
        title: "Comments Loaded",
        message: "Comments have been successfully fetched.",
      });
    }

    if (isError) {
      errorToast({
        title: "Fetch Error",
        message: "An error occurred while fetching comments. Please try again.",
      });
    }
  }, [isSuccess, isError]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
