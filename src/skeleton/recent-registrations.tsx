export const renderSkeletonLoader = () => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx} className="flex items-center justify-between mb-4  px-2 rounded-md py-1 ">
        <div className="flex items-start">
          <div className="w-10 h-10  rounded-full shimmer"></div>
          <div className="ml-2">
            <div className="h-4 shimmer rounded w-32 mb-2"></div>
            <div className="h-3 shimmer rounded w-24"></div>
          </div>
        </div>
        <div className="w-12 h-3 shimmer rounded"></div>
      </div>
    ));
};
  
export const renderOverviewSkeletonLoader = () => {
  return Array.from({ length: 4 }).map((_, idx) => (
    <div
      key={idx}
      className="flex items-center justify-between mb-4  px-2 rounded-md py-1 "
    >
      <div className="flex items-start">
        <div className="ml-2">
          <div className="h-4 shimmer rounded w-32 mb-2"></div>
          <div className="h-3 shimmer rounded w-24"></div>
        </div>
      </div>
      <div className="w-12 h-3 shimmer rounded"></div>
    </div>
  ));
};