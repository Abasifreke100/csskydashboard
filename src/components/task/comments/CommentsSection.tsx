import React, { ReactNode } from "react";
import CommentsTable from "./CommentsList";
import { FetchLoadingAndEmptyState } from "../../shared/FetchLoadingAndEmptyState";
import CommentsTableSkeleton from "./CommentListSkeleton";
import CommentsTableEmptyState from "./CommentEmptyState";
import { useFetchComments } from "../../../hooks/useFetchComments"; // Assuming your custom hook is here

interface CommentsSectionProps {
  taskID: string;
  children?: ReactNode
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ taskID , children}) => {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useFetchComments(taskID);

  return (
    <FetchLoadingAndEmptyState
      isLoading={isLoading}
      numberOfSkeleton={1}
      skeleton={<CommentsTableSkeleton length={5} />}
      emptyState={<CommentsTableEmptyState />}
      data={comments?.length}
    >
      {isError ? (
        <div className="text-red-500">
          Failed to load comments: {String(error)}
        </div>
      ) : (
          <div>
            {children}
          <CommentsTable comments={comments || []} />
        </div>
      )}
    </FetchLoadingAndEmptyState>
  );
};

export default CommentsSection;
