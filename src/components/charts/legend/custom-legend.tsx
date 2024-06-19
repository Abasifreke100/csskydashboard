
export const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-col items-center  mt-6 justify-center">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center mb-2">
          <span className="w-3 h-3 mr-2 " style={{ backgroundColor: entry.color }}></span>
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

