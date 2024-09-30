import { Skeleton } from "../ui/skeleton";

interface NotificationSkeletonProps {
  length: number; // Number of skeletons to display
  children?: React.ReactNode;
}

const NotificationSkeleton = ({
  length,
  children,
}: NotificationSkeletonProps) => {
  const renderSkeletonRows = Array.from({ length }).map((_, index) => (
    <div key={index} className="flex justify-between mt-4">
      <div className="flex items-center gap-1">
        <Skeleton className="h-6 w-6 rounded-md" />
        <div className="text-xs">
          <p className="font-semibold">
            <Skeleton className="h-4 w-20" />
          </p>
          <p className="text-gray-400 mt-1">
            <Skeleton className="h-3 w-32" />
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-300">
        <Skeleton className="h-3 w-10" />
      </p>
    </div>
  ));

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto  w-full col-span-3">
      {children}
      {renderSkeletonRows}
    </div>
  );
};

export default NotificationSkeleton;
