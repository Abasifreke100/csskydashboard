import cn from "../../../lib/utils";
import { CommentResponse } from "../../../types/task";
import { formatTimeAgo } from "../../../utils/date";
import { getInitials } from "../../../utils/getInitials";
import { formatTier, truncateText } from "../../../utils/text";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

interface CommentsHeaderProps {
  title?: string; 
  onSeeAllClick?: () => void;
  className?: string; 
}
export const CommentsHeader: React.FC<CommentsHeaderProps> = ({
  title = "Comments:",
  onSeeAllClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between border-b pb-3 items-center text-sm mb-2",
        className
      )}
    >
      <p className="font-medium text-gray-400">{title}</p>
      {onSeeAllClick && (
        <button
          className="font-medium text-black cursor-pointer"
          onClick={onSeeAllClick}
        >
          See all &gt;
        </button>
      )}
    </div>
  );
};

const CommentsTable = ({ comments }: { comments: CommentResponse[] }) => {
  return (
    <div className="">  
      {/* Comments List */}
      <div className="  h-fit flex flex-col gap-2.5 py-2">
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
                      <p className="text-[10px] font-medium">
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
