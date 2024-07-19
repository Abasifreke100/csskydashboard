import { SVGProps } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LucideIcon } from "lucide-react";

type IconType = React.ComponentType<SVGProps<SVGSVGElement>>;

interface CardComponentProps {
  isLoading: boolean;
  value?: string | number;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: IconType | LucideIcon | any;
  order?: number;
  valueClassName?: string;
}

const CardComponent = ({
  isLoading,
  value,
  title,
  icon: Icon,
  order,
  valueClassName,
}: CardComponentProps) => {
  return (
    <Card
      className={`shadow-md rounded-xl lg:col-span-4 ${
        (title === "Total Corporates" || title === "Total Individuals") &&
        "h-fit"
      } custom-md-col-span ${order !== undefined ? `order-${order}` : ""}`}
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
          <p className="font-semibold text-xl bg-gray-300 shimmer w-36 mt-3 h-3 rounded-md"></p>
        ) : (
          <p className={`font-semibold text-xl ${valueClassName}`}>
            {value ?? "..."}
          </p>
        )}
        {isLoading ? (
          <p className="font-semibold text-xl bg-gray-300 shimmer w-24 mt-2 h-3 rounded-md"></p>
        ) : (
          <p
            className={`text-[#000000E5] text-xs font-poppins ${
              title === "..." ? "text-4xl" : ""
            }`}
          >
            {title ?? "..."}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
