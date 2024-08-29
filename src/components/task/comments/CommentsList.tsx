import { CommentResponse } from "../../../types/task";
import { formatTimeAgo } from "../../../utils/date";
import { getInitials } from "../../../utils/getInitials";
import { formatTier, truncateText } from "../../../utils/text";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

const CommentsTable = ({ comments }: { comments: CommentResponse[] }) => {
  return (
    <div className="mt-3">
      {/* Comments Header */}
      <div className="flex justify-between items-center text-sm mb-2">
        <p className="font-medium text-gray-400">Comments:</p>
        <p className="font-medium text-black cursor-pointer">See all &gt;</p>
      </div>

      {/* Comments List */}
      <div className=" border-t h-fit flex flex-col gap-2.5 py-2">
        {comments.map((comment) => {
          const fullName =
            comment?.user?.firstName && comment?.user?.lastName
              ? `${comment.user.firstName} ${comment.user.lastName}`
              : "";

          return (
            <div
              key={comment._id}
              className="flex items-start w-full justify-between mt-2"
            >
              <div className="flex items-start w-full">
                <Avatar className="mr-1">
                  <AvatarImage
                  // src={comment.author?.avatarUrl || "default-avatar-url"}
                  />
                  <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                    {getInitials(
                      fullName !== "" ? fullName : comment?.user?.role
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-1 flex-1">
                  <div className="font-medium text-gray-400 text-sm whitespace-nowrap">
                    <div className="flex items-start justify-between ">
                      <div className="flex gap-0.5">
                        <p className="text-xs text-black">
                          {truncateText(
                            fullName !== "" ? fullName : comment.user.role,
                            13
                          )}
                        </p>
                        <Badge className="h-4 px-1 text-xs bg-[#FFFAEF] hover:bg-[#FFFAEF] whitespace-nowrap hover:text-primary text-[#FF7F00]">
                          {formatTier(comment.user?.tier ?? "Unknown")}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium">
                        {formatTimeAgo(comment.createdAt)}
                      </p>
                    </div>
                    <p className="text-xs mt-0.5 w-full  leading-tight whitespace-normal">
                      {comment?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsTable;
