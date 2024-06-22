export const  CustomerTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <tr
          key={idx}
          className="bg-white h-16 w-full border group border-b cursor-pointer transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted  border-[#F5F5F7]"
        >
          <td className="px-2  py-2">
            <div className=" w-8 h-8 flex items-center justify-center">
              <div className="w-4 h-4 flex items-center justify-center  bg-gray-300 "></div>
            </div>
          </td>
          <td className="px-6 py-2 flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 shimmer rounded-full"></div>
            <div className="flex flex-col">
              <div className="w-32 h-4 bg-gray-300 rounded shimmer"></div>
              <div className="w-24 h-3 mt-1 bg-gray-300 rounded shimmer"></div>
            </div>
          </td>
          <td className="px-6 py-2">
            <div className="w-24 h-4 bg-gray-300 rounded shimmer"></div>
          </td>
          <td className="px-6 py-2">
            <div className="w-20 h-4 bg-gray-300 rounded shimmer"></div>
          </td>
          <td className="px-6 py-2">
            <div className="w-24 h-4 bg-gray-300 rounded shimmer"></div>
          </td>
          <td className="px-6 py-2">
            <div className="w-24 h-4 bg-gray-300 rounded shimmer"></div>
          </td>
          <td className="px-6 py-2 capitalize text-grey text-sm">
            <div className="w-16 h-4 bg-gray-300 rounded shimmer"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

