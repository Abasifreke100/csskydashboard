import { useEffect, useState } from "react";
import CommentsTable from "./CommentsList";
import { FetchLoadingAndEmptyState } from "../../shared/FetchLoadingAndEmptyState";
import CommentsTableSkeleton from "./CommentListSkeleton";
import CommentsTableEmptyState from "./CommentEmptyState";
import axiosInstance from "../../../api/connectSurfApi";
import { CommentResponse } from "../../../types/task";
import { errorToast, successToast } from "../../../utils/toast";

interface CommentsSectionProps {
  taskID: string;
  refetchComments: boolean;
  onRefetchComplete?: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  taskID,
  refetchComments,
  onRefetchComplete,
}) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async (taskID: string) => {
    try {
      const response = await axiosInstance.get(`/comment/${taskID}`);
      return response.data.data.response;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  };

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const fetchedComments = await fetchComments(taskID);
      setComments(fetchedComments);
      setError(null);
      successToast({
        title: "Comments Loaded",
        message: "Your comments have been successfully loaded.",
      });
    } catch (err) {
      setError("Failed to load comments.");
      errorToast({
        title: "Fetch Error",
        message: `An error occurred while fetching comments`,
      });
    } finally {
      setIsLoading(false);
      if (onRefetchComplete) onRefetchComplete();
    }
  };

  useEffect(() => {
    loadComments();
  }, [taskID, refetchComments]);

  return (
    <FetchLoadingAndEmptyState
      isLoading={isLoading}
      numberOfSkeleton={1}
      skeleton={<CommentsTableSkeleton length={5} />}
      emptyState={<CommentsTableEmptyState />}
      data={comments?.length}
    >
      {error ? (
        <div className="text-red-500">Failed to load comments: {error}</div>
      ) : (
        <CommentsTable comments={comments} />
      )}
    </FetchLoadingAndEmptyState>
  );
};

export default CommentsSection;
