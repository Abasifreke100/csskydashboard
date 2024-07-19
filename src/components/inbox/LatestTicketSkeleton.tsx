import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface LatestTicketSkeletonProps {
  length: number;
  children?: React.ReactNode;
}

const LatestTicketSkeleton = ({
  length,
  children,
}: LatestTicketSkeletonProps) => {
  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <div
      key={index}
      className="flex  items-center justify-between border-b py-3"
    >
      <div className="flex items-center py-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="ml-2">
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Skeleton className="" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  ));

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border rounded-lg w-full col-span-3">
      {children}
      <Card>
        <CardHeader>
          <div className="flex items-center text-sm font-medium justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto">
          {renderSkeletonRows}
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestTicketSkeleton;
