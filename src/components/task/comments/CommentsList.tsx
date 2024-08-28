import { CommentResponse } from "../../../types/task";
import { formatTimeAgo } from "../../../utils/date";
import { getInitials } from "../../../utils/getInitials";
import { truncateText } from "../../../utils/text";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

const CommentsTable = ({ comments }: { comments: CommentResponse[] }) => {
  return (
    <div className="mt-3">
      {/* Comments Header */}
      <div className="flex justify-between items-center text-sm mb-2">
        <p className="font-medium text-gray-400">Comments:</p>
        <p className="font-medium text-black cursor-pointer">
          See all &gt;
        </p>
      </div>

      {/* Comments List */}
      <div className=" border-t h-fit py-2">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-center w-full justify-between mt-2"
          >
            <div className="flex items-center">
              <Avatar className="mr-1">
                <AvatarImage
                // src={comment.author?.avatarUrl || "default-avatar-url"}
                />
                <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                  {getInitials(comment.user.role) || "NN"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-1">
                <div className="font-medium text-gray-400 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-0.5">
                    <p className="text-xs text-black">
                      {truncateText(comment.user?.email ?? "", 13)}
                    </p>
                    <Badge className="h-4 px-1 text-xs bg-secondary hover:bg-secondary">
                      {comment.user?.role ?? "Unknown"}
                    </Badge>
                  </div>
                  <p className="text-[10px]">
                    {truncateText(comment.message ?? " ", 30)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs font-medium">
              {formatTimeAgo(comment.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsTable;
