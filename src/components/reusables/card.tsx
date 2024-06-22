import { SVGProps } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LucideIcon } from "lucide-react";

type IconType = React.ComponentType<SVGProps<SVGSVGElement>>;

interface CardComponentProps {
  isLoading: boolean;
  value?: string | number;
  title?: string;
  icon: IconType | LucideIcon | any;
  order?: number;
}

const CardComponent = ({
  isLoading,
  value,
  title,
  icon: Icon,
  order
}: CardComponentProps) => {
  return (
    <Card
    className={`shadow-md rounded-xl lg:col-span-4 ${
      (title == "Total Corporates" || "Total Individuals") && "h-fit"
    } ${
      title == "Total Individuals" ? "custom-md-col-span" : "custom-md-col-span"
    } ${order !== undefined ? `order-${order}` : ""}`}
  >
      <CardHeader>
        <CardTitle>
          {isLoading ? (
            <div className="bg-gray-300 shimmer w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00]">
              <span className="opacity-0">
                {" "}
                <Icon />
              </span>
            </div>
          ) : (
            <div className="bg-[#FFF7EF] w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00]">
              <Icon />
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="font-semibold text-xl bg-gray-300 shimmer w-36 h-2 rounded-md"></p>
        ) : (
          <p className="font-semibold text-xl">{value}</p>
        )}
        {isLoading ? (
          <p className="font-semibold text-xl bg-gray-300 shimmer w-24 mt-1 h-2 rounded-md"></p>
        ) : (
          <p className="text-[#000000E5] text-xs font-poppins">{title}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
