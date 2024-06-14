import { Wifi } from "lucide-react";
import { dashboardCardItemsProps } from "../../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

const CardComponent = ({ ...items }: dashboardCardItemsProps) => {
  return (
    <Card className="shadow-md custom-md-col-span lg:col-span-4">
      <CardHeader>
        <CardTitle>
          <div className="bg-[#FFF7EF] w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00] ">
            {" "}
            <Wifi />{" "}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-xl">{items.digit}</p>
        <p className="text-[#000000E5] text-xs">{items.tag}</p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
