import { ChevronRight, CircleAlert } from "lucide-react";
import PieChartComponent from "../../components/overview/overview-chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { CoporateIcon } from "../../lib/icons/coporate-icon";
import { PasswordExpired } from "../../lib/icons/passport-expired-icon";
import { Passport } from "../../lib/icons/passport-icon";
import { PersonIcon } from "../../lib/icons/person-icon";
import { ValidPassportIcon } from "../../lib/icons/valid-passport-icon";
import { renderSkeletonLoader } from "../../skeleton/recent-registrations";
import { useNavigate } from "react-router-dom";

const supportOverviewPageSampleData = [
  {
    title: "Total Tickets",
    value: 1000,
    order: 1,
  },
  {
    title: "Open Tickets",
    value: 500,
    order: 2,
  },
  {
    title: "Closed Tickets",
    value: 500,
    order: 4,
  },
  {
    title: "Pending Tickets",
    value: 200,
    order: 5,
  },
];

const icons = [
  Passport,
  ValidPassportIcon,
  PasswordExpired,
  CoporateIcon,
  PersonIcon,
];

const SupportOverviewPage = () => {
  const isLoading = false;
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
      {supportOverviewPageSampleData.map((data, idx) => {
        const { title, value, order } = data;
        const Icon = icons[idx % icons.length];

        return (
          <Card
            key={data.title}
            style={{ order }} // Inline CSS for the order
            className="shadow-md rounded-xl"
          >
            <CardHeader>
              <CardTitle>
                {isLoading ? (
                  <div className="bg-gray-300 shimmer w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00]">
                    <span className="opacity-0">
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
                <p className="font-semibold text-xl">{value ?? "..."}</p>
              )}
              {isLoading ? (
                <p className="font-semibold text-xl bg-gray-300 shimmer w-24 mt-2 h-3 rounded-md"></p>
              ) : (
                <p className="text-[#000000E5] text-xs font-poppins">
                  {title ?? "..."}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
      <Card style={{ order: 3 }} className="shadow-md rounded-xl row-span-2">
        <CardContent>
          <PieChartComponent />
        </CardContent>
      </Card>
      <Card
        className={`order-6 col-span-3 h-full  shadow-md`}
      >
        <CardHeader>
          <CardTitle className="text-sm">
            <div className="flex items-center justify-between">
              <p className="flex items-center text-sm font-semibold">
                Today&apos;s Statistics{" "}
                <CircleAlert className="h-3 text-[#808080]" />
              </p>
              <button
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/customers/individual")}
              >
                See All <ChevronRight className="h-4" />
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2  h-[270px] overflow-y-auto ">
          {isLoading ? renderSkeletonLoader() : <div></div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportOverviewPage;
