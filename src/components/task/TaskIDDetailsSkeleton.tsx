import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const TaskIDDetailsSkeleton = ({ length }: { length: number }) => (
  <div className="w-full col-span-3 h-fit">
    {Array.from({ length }).map((_, idx) => (
      <div key={idx} className=" w-full ">
        <Card className="min-h- pb-5 px-3 w-full">
          <div className="mt-3 w-full"></div>

          <div className="mt-3 p-4  rounded-xl w-full">
            <Skeleton className="h-8 w-1/3" />
            <div className="flex flex-col gap-3 mt-3 text-xs">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="mt-3 max-h-[150px] w-full border-t overflow-y-auto py-2">
              <Skeleton className="h-8 w-1/3" />
              <div className="mt-2 flex flex-col gap-2">
              <Skeleton className="h-24 w-full" />
                <div className="flex gap-1.5 mt-4">
                  <Skeleton className="h-10 w-1/4" />
                  <Skeleton className="h-10 w-1/4" />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="mt-6 mb-6">
          <CardContent className="font-poppins rounded-xl">
            <CardTitle className="text-sm mt-5">
              <Skeleton className="w-20 h-4" /> {/* Placeholder for taskID */}
            </CardTitle>
            <div className="flex flex-col gap-3 mt-3 text-xs mb-4">
              <div className="font-medium text-gray-400">
                <Skeleton className="w-60 h-4" />{" "}
                {/* Placeholder for instruction text */}
              </div>
            </div>
            <form className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <Skeleton className="w-full h-4" />{" "}
                  {/* Placeholder for Task Title label */}
                  <Skeleton className="w-full h-10 bg-gray-200 rounded" />{" "}
                  {/* Placeholder for Input */}
                </div>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="w-full h-4" />{" "}
                  {/* Placeholder for Due Date label */}
                  <Skeleton className="w-full h-10 bg-gray-200 rounded" />{" "}
                  {/* Placeholder for Date Picker */}
                </div>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="w-full h-4" />{" "}
                  {/* Placeholder for Task Description label */}
                  <Skeleton className="w-full h-24 bg-gray-200 rounded" />{" "}
                  {/* Placeholder for Textarea */}
                </div>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="w-full h-4" />{" "}
                  {/* Placeholder for Priority label */}
                  <Skeleton className="w-full h-10 bg-gray-200 rounded" />{" "}
                  {/* Placeholder for Select */}
                </div>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="w-full h-4" />{" "}
                  {/* Placeholder for Attach File label */}
                  <Skeleton className="w-full h-10 bg-gray-200 rounded" />{" "}
                  {/* Placeholder for File Input */}
                </div>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="w-full h-4" />{" "}
                  {/* Placeholder for Assignee label */}
                  <Skeleton className="w-full h-10 bg-gray-200 rounded" />{" "}
                  {/* Placeholder for Select */}
                </div>
              </div>
              <div className="flex justify-start">
                <Skeleton className="w-32 h-10 bg-gray-200 rounded" />{" "}
                {/* Placeholder for Button */}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    ))}
  </div>
);

export default TaskIDDetailsSkeleton;
