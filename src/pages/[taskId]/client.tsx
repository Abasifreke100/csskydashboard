import { Plus, Save } from "lucide-react";
import { CardTitle, CardContent, Card } from "../../components/ui/card";
import CustomButton from "../../components/shared/CustomButton";
import NewTasksForm from "../../components/task/NewTasksForm";
import CommentsSection from "../../components/task/comments/CommentsSection";
import { ViewOneTaskDataResponse } from "../../types/task";
import { getStatusColor } from "../../utils/status";
import Header from "../../components/global/header";
import { useState } from "react";
import { formatDate } from "../../utils/date";
import UpdateStatusDialog from "../../components/shared/UpdateStatusModal";
import { CommentsHeader } from "../../components/task/comments/CommentsList";

interface TaskClientPageProps {
  task: ViewOneTaskDataResponse;
  isAddingComment: boolean;
  message: string;
  setIsAddingComment: (value: boolean) => void;
  setMessage: (value: string) => void;
  handleSaveComment: () => void;
}



const TaskClientPage = ({
  task,
  isAddingComment,
  message,
  setIsAddingComment,
  setMessage,
  handleSaveComment,
}: TaskClientPageProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statusTextColor = getStatusColor(task.status);



  return (
    <div className=" h-full w-full ">
      <Header title="Task Details" icon={true} />
      <Card className="mt-3 h-fit ">
        <CardContent
          aria-describedby="task-details-description"
          className="font-poppins rounded-xl"
        >
          <CardTitle className="text-sm mt-5">{task.taskId}</CardTitle>

          <div className="flex flex-col gap-3 mt-3 text-xs">
            <p className="font-medium text-gray-400">
              Task Title: <span className="text-black">{task.title}</span>
            </p>
            <p className="font-medium text-gray-400">
              Description: <br />
              <span className="text-black text-xs">{task.description}</span>
            </p>
            <p className="font-medium text-gray-400">
              Priority: <span className="text-black">{task.priority}</span>
            </p>
            <p className="font-medium text-gray-400">
              Status: <span className={statusTextColor}>{task.status}</span>
            </p>
            <p className="font-medium text-gray-400">
              Assignee:{" "}
              <span className="text-black">{task.assignee?.email}</span>
            </p>
            <p className="font-medium text-gray-400">
              Due date: <span className="text-black">{task.dueDate}</span>
            </p>
            <p className="font-medium text-gray-400">
              Last Updated:{" "}
              <span className="text-black">{formatDate(task.updatedAt)}</span>
            </p>
          </div>
          <div className="mt-3 max-h-[150px] border-t overflow-y-auto py-2">
            {/* Comments Section */}
            <CommentsHeader />
            <CommentsSection taskID={task._id} />

            {isAddingComment && (
              <div className="mt-2 flex flex-col gap-2">
                <textarea
                  value={message}
                  onChange={(e) => {
                    e.preventDefault();
                    setMessage(e.target.value);
                  }}
                  placeholder="Add your comment"
                  className="w-full mt-4 text-sm outline-none p-2 border rounded-md"
                />
                <div className="flex gap-1.5">
                  <CustomButton
                    label="Save Comment"
                    icon={Save}
                    type="button"
                    onClick={handleSaveComment}
                    variant="primary"
                  />
                  <CustomButton
                    label="Cancel"
                    variant="secondary"
                    type="button"
                    onClick={() => setIsAddingComment(false)}
                  />
                </div>
              </div>
            )}

            <div className="mt-7 flex gap-1.5 flex-wrap">
              <CustomButton
                icon={Plus}
                label="Add Comment"
                variant="secondary"
                type="button"
                onClick={() => setIsAddingComment(true)}
              />

              <UpdateStatusDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                taskId={task._id}
                currentStatus={task.status}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <NewTasksForm task={task} />
    </div>
  );
};

export default TaskClientPage;
