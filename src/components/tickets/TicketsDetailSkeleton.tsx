import { TicketsCommentSkeleton } from "../task/comments/CommentListSkeleton";

const TicketsDetailSkeleton = () => {
  return (
    <div className="col-span-3">
      <div className="animate-pulse">
        <div className="h-5 w-32 rounded bg-gray-300 "></div>
      </div>
      <div className="flex flex-col gap-3 mt-3 text-xs">
        <div className="font-medium text-gray-400">
          Subject:{" "}
          <span className="inline-block w-1/2 h-3 bg-gray-300 animate-pulse rounded"></span>
        </div>
        <div className="font-medium text-gray-400">
          Description: <br />
          <span className="inline-block w-full h-4 mt-1 bg-gray-300 animate-pulse rounded"></span>
        </div>
        <div className="font-medium text-gray-400 flex items-center gap-1.5">
          Priority:{" "}
          <span className="inline-block w-1/4 h-3.5 bg-gray-300 animate-pulse rounded"></span>
        </div>
        <div className="font-medium text-gray-400 flex items-center gap-1.5">
          Status:{" "}
          <span className="inline-block w-1/4 h-3.5 bg-gray-300 animate-pulse rounded"></span>
        </div>
        <div className="font-medium text-gray-400 flex items-center gap-1.5">
          Created On:{" "}
          <span className="inline-block w-1/4 h-3.5 bg-gray-300 animate-pulse rounded"></span>
        </div>
        <div className="font-medium text-gray-400 flex items-center gap-1.5">
          Due Date:{" "}
          <span className="inline-block w-1/4 h-3.5 bg-gray-300 animate-pulse rounded"></span>
        </div>
        <div className="font-medium text-gray-400 flex items-center gap-1.5">
          Assignee:{" "}
          <span className="inline-block w-1/4 h-3.5 bg-gray-300 animate-pulse rounded"></span>
        </div>
        <div className="font-medium text-gray-400">Task Assignee:</div>
        <div className="flex items-center">
          <div className="mr-1 bg-gray-300 rounded-full h-6 w-6"></div>
          <div className="ml-1 flex flex-col space-y-1">
            <div className="bg-gray-300 h-4 w-24 rounded"></div>
            <div className="bg-gray-300 h-3 w-40 rounded"></div>
          </div>
        </div>
      </div>
      <TicketsCommentSkeleton length={1} />
    </div>
  );
};

export default TicketsDetailSkeleton;
