// components/CommentsTableSkeleton.js

const CommentsTableSkeleton = ({ length }: { length: number }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex items-center w-full justify-between mt-2"
        >
          <div className="flex items-center">
            <div className="mr-1 bg-gray-300 rounded-full h-6 w-6"></div>
            <div className="ml-1 flex flex-col space-y-1">
              <div className="bg-gray-300 h-4 w-24 rounded"></div>
              <div className="bg-gray-300 h-3 w-40 rounded"></div>
            </div>
          </div>
          <div className="bg-gray-300 h-4 w-12 rounded"></div>
        </div>
      ))}
    </>
  );
};

export default CommentsTableSkeleton;
