import Header from "../../components/global/header";
import { useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { truncateText } from "../../utils/text";
import { getStatusColor } from "../../utils/status";
import { CheckCircle, Plus, Save } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  CardTitle,
  CardContent,
  Card,
} from "../../components/ui/card";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/shared/CustomButton";
import NewTasksForm from "../../components/task/NewTasksForm";
import { sampleData } from "../../components/store/data/task";

const TaskID = () => {
  const [isAddingComment, setIsAddingComment] = useState(false); // State to manage comment input visibility
  const [comment, setComment] = useState(""); // State to manage comment input value
  const { taskID } = useParams();

  const handleAddCommentClick = () => {
    setIsAddingComment(true);
  };

  const handleSaveComment = () => {
    console.log("Comment saved:", comment); // This is where you will handle the API call in the future
    setComment("");
    setIsAddingComment(false);
  };

 
  const task = sampleData.find((item) => item.id === taskID);

  if (!task) {
    return null;
  }

  const statusTextColor = getStatusColor(task.status);

  return (
    <div className="customersContainer  w-full ">
      <div className="min-h-screen pb-5 w-full ">
        <Header title="Customer Profile" icon={true} />

        <Card className="mt-3">
          <CardContent
            aria-describedby="task-details-description"
            className="font-poppins rounded-xl"
          >
           
              <CardTitle className="text-sm mt-5">#{task.id}</CardTitle>
           
            <div className="flex flex-col gap-3 mt-3 text-xs">
              <p className="font-medium text-gray-400 ">
                Task Title: <span className="text-black ">{task.subject}</span>
              </p>
              <p className="font-medium  text-gray-400">
                Description: <br />
                <span className="text-black text-xs">{task.description}</span>
              </p>
              <p className="font-medium text-gray-400">
                Priority: <span className="text-black">{task.priority}</span>
              </p>
              <p className="font-medium text-gray-400">
                Status:{" "}
                <span className={`${statusTextColor}`}>{task.status}</span>
              </p>
              <p className="font-medium text-gray-400">
                Assignee:{" "}
                <span className="text-black">{task.assignee.name}</span>
              </p>
              <p className="font-medium text-gray-400">
                Due date:{" "}
                <span className="text-black">{task.dueDate}</span>
              </p>
              <p className="font-medium text-gray-400">
                Last Updated:{" "}
                <span className="text-black">{task.lastUpdated}</span>
              </p>
              <p className="font-medium text-gray-400">Attachments:</p>
            </div>
            <div className="mt-3 max-h-[150px] border-t overflow-y-auto py-2">
              <div className="flex justify-between items-center text-sm">
                <p className="font-medium text-gray-400 ">Comments:</p>
                <p className="font-medium  text-black cursor-pointer">
                  See all &gt;
                </p>
              </div>
              <div className="flex items-center w-full justify-between mt-2">
                <div className="flex items-center">
                  <Avatar className="mr-1">
                    <AvatarImage src="https://github.com/max-programming.png" />
                    <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-1 ">
                    <div className="font-medium text-gray-400 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-0.5">
                        <p className="text-xs text-black">
                          {truncateText(task.assignee.name, 13)}
                        </p>{" "}
                        <Badge className="h-4 px-1  text-xs  bg-secondary hover:bg-secondary">
                          Tier 3
                        </Badge>
                      </div>
                      <p className="text-[10px]">
                        {truncateText(task.assignee.comments, 30)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-medium">1H ago</p>
              </div>
              {/* buttons add comment , update status , save changes */}
              {isAddingComment && (
                <div className="mt-2 flex flex-col gap-2">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your comment"
                    className="w-full mt-4 text-sm outline-none p-2 border rounded-md"
                  />
                  <div className="flex gap-1.5">
                    <CustomButton
                      label="Save Comment"
                      icon={Save}
                      onClick={handleSaveComment}
                      variant="primary"
                    />
                    <CustomButton
                      label="Cancel"
                      variant="secondary"
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
                  onClick={handleAddCommentClick}
                />
                <CustomButton
                  icon={CheckCircle}
                  label="Update Status"
                  variant="secondary"
                />
                <CustomButton
                  icon={Save}
                  label="Save Changes"
                  variant="primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <NewTasksForm/>
      </div>
    </div>
  );
};

export default TaskID;
