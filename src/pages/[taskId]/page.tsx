import { useState } from "react";
import { useParams } from "react-router-dom";
import { CommentService } from "../../service/comments";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import TaskClientPage from "./client";
import TaskIDDetailsSkeleton from "../../components/task/TaskIDDetailsSkeleton";
import { useFetchTask } from "../../hooks/useTasks";
import { useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../utils/toast";
import { QueryKeys } from "../../models/query";

const TaskIDDetailsPage = () => {
  const { taskID } = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  // Use the custom hook to fetch the task
  const { data: task, isLoading } = useFetchTask({ taskID: taskID ?? "" });


  const handleSaveComment = async () => {
    try {
      await CommentService.addComment(taskID!, message);
      setMessage("");
      setIsAddingComment(false);
      successToast({
        title: "Save Comment Success",
        message: "Comment saved successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: QueryKeys.Get_Comments_By_TaskID(taskID!),
      });
    } catch (err) {
      if (err instanceof Error) {
        errorToast({
          title: "Save Comment Error",
          message: err.message || "Failed to save comment.",
        });
      } else {
        errorToast({
          title: "Save Comment Error",
          message: "An unexpected error occurred.",
        });
      }
      console.error(err);
    }
  };

  return (
    <div className="pb-12">
      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={<TaskIDDetailsSkeleton length={1} />}
        emptyState={<div>empty state</div>}
        data={task ? 1 : 0}
      >
        <TaskClientPage
          task={task}
          isAddingComment={isAddingComment}
          message={message}
          setIsAddingComment={setIsAddingComment}
          setMessage={setMessage}
          handleSaveComment={handleSaveComment}
        />
      </FetchLoadingAndEmptyState>
    </div>
  );
};

export default TaskIDDetailsPage;
