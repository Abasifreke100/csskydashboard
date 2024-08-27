import { useState } from "react";
import axiosInstance from "../../api/connectSurfApi";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import TaskClientPage from "./client";
import { useParams } from "react-router-dom";
import TaskIDDetailsSkeleton from "../../components/task/TaskIDDetailsSkeleton";
import { useFetchTask } from "../../hooks/useTasks";
import { errorToast, successToast } from "../../utils/toast";

const TaskIDDetailsPage = () => {
  const { taskID } = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [message, setMessage] = useState("");
  const [shouldRefetchComments, setShouldRefetchComments] = useState(false);

  // Use the custom hook to fetch the task
  const { data: task, isLoading } = useFetchTask({ taskID: taskID ?? " " });

  const handleAddCommentClick = () => {
    setIsAddingComment(true);
  };

  const handleSaveComment = async () => {
    try {
      const response = await axiosInstance.post(`/comment`, {
        taskId: taskID,
        message,
      });
      if (response.data.success) {
        setMessage("");
        setIsAddingComment(false);
        setShouldRefetchComments(true);
        successToast({
          title: "Save Comment Success",
          message: "Comment saved successfully.",
        });
      } else {
        errorToast({
          title: "Save Comment Error",
          message: response.data.message || "Failed to save comment.",
        });
      }
    } catch (err) {
      errorToast({
        title: "Save Comment Error",
        message: "Failed to save comment.",
      });
      console.error(err);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={<TaskIDDetailsSkeleton length={1} />}
        emptyState={<div>empty state</div>}
        data={task ? 1 : 0}
      >
        {task && (
          <TaskClientPage
            task={task}
            isAddingComment={isAddingComment}
            message={message}
            setIsAddingComment={setIsAddingComment}
            setMessage={setMessage}
            handleSaveComment={handleSaveComment}
            handleAddCommentClick={handleAddCommentClick}
            shouldRefetchComments={shouldRefetchComments}
            setShouldRefetchComments={setShouldRefetchComments}
          />
        )}
      </FetchLoadingAndEmptyState>
    </div>
  );
};

export default TaskIDDetailsPage;
