import { Wifi } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const CardComponent = ({ ...items }) => {
  return (
    <Card className="shadow-md custom-md-col-span lg:col-span-4">
      <CardHeader>
        <CardTitle>
          {items.isLoading ? (
            <div className="bg-gray-300 shimmer w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00] ">
              {" "}
              <Wifi className="opacity-0" />{" "}
            </div>
          ) : (
            <div className="bg-[#FFF7EF] w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00] ">
              {" "}
              <Wifi />{" "}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.isLoading ? (
          <p className="font-semibold text-xl bg-gray-300 shimmer w-36 h-2 rounded-md"></p>
        ) : (
          <p className="font-semibold text-xl">{items.value}</p>
        )}
        {items.isLoading ? (
          <p className="font-semibold text-xl bg-gray-300 shimmer w-24 mt-1 h-2 rounded-md"></p>
        ) : (
          <p className="text-[#000000E5] text-xs">{items.title}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
