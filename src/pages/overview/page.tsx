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
import { renderOverviewSkeletonLoader } from "../../skeleton/recent-registrations";
import { useNavigate } from "react-router-dom";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import { useTicketOverview } from "../../hooks/useOverview";
import { truncateText } from "../../utils/text";
import { Cssky_Dashboard_Routes } from "../../components/store/data";
  import { getInboxStatusStyle } from "../../utils/status";
import { Ticket } from "../../types/ticket";
import { formatTimeAgo } from "../../utils/date";
import { Badge } from "../../components/ui/badge";

const icons = [
  Passport,
  ValidPassportIcon,
  PasswordExpired,
  CoporateIcon,
  PersonIcon,
];

const EmptyState = () => {
  return (
    <div className="text-center py-4">
      <p className="text-sm text-gray-500">No recent tickets</p>
    </div>
  );
};

const SupportOverviewPage = () => {
  const { data, isLoading } = useTicketOverview({ userId: "452770177430912" });

  const navigate = useNavigate();
  const supportOverviewPageSampleData = [
    {
      title: "Total Tickets",
      value: data?.totalTickets ?? 0,
      order: "order-1",
    },
    {
      title: "Open Tickets",
      value: data?.statusCounts?.open ?? 0,
      order: "order-2",
    },
    {
      title: "Closed Tickets",
      value: data?.statusCounts?.closed ?? 0,
      order: "order-4",
    },
    {
      title: "Pending Tickets",
      value: data?.statusCounts?.pending ?? 0,
      order: "order-5",
    },
  ];

  interface TicketWrapper {
    Ticket: Ticket;
  }
  return (
    <div className="grid grid-cols-12 gap-4 pb-16">
      {supportOverviewPageSampleData.map((data, idx) => {
        const { title, value, order } = data;
        const Icon = icons[idx % icons.length];

        return (
          <Card
            key={data.title}
            className={`${order} shadow-md rounded-xl col-span-12 md:col-span-6  lg:col-span-4`}
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
      <Card className="shadow-md rounded-xl order-5 md:order-4 lg:order-3 row-span-2 col-span-12 md:col-span-6 lg:col-span-4">
        <CardContent>
          <PieChartComponent
            open={data?.statusCounts?.open}
            closed={data?.statusCounts?.closed}
            pending={data?.statusCounts?.pending}
            total={data?.totalTickets} // Pass total tickets
          />{" "}
        </CardContent>
      </Card>
      <Card className={`order-6 col-span-12 h-full  shadow-md`}>
        <CardHeader>
          <CardTitle className="text-sm">
            <div className="flex items-center justify-between">
              <p className="flex items-center text-sm font-semibold">
                Latest Tickets <CircleAlert className="h-3 text-[#808080]" />
              </p>
              <button
                className="flex items-center cursor-pointer"
                onClick={() =>
                  navigate(Cssky_Dashboard_Routes.tickets + "?filter=all")
                }
              >
                See All <ChevronRight className="h-4" />
              </button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="px-2 max-h-[270px] overflow-y-auto ">
          <FetchLoadingAndEmptyState
            isLoading={isLoading}
            numberOfSkeleton={1}
            skeleton={
              <div className="flex flex-col col-span-3">
                {renderOverviewSkeletonLoader()}
              </div>
            }
            emptyState={<EmptyState />}
            data={data?.latestTickets?.length}
          >
            <div className="flex flex-col w-full">
              {data?.latestTickets?.map((ticketWrapper: TicketWrapper) => {
                const ticket = ticketWrapper.Ticket; // Access the Ticket object

                return (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between mb-4 px-2 rounded-md py-1 "
                  >
                    <div className="flex items-start">
                      <div className="ml-2">
                        <div className="h-4  rounded mb-2">
                          <p className="text-sm truncate  w-[150px] md:w-[400px] lg:w-[700px] whitespace-nowrap font-medium text-black">
                            {ticket.subject}
                          </p>
                          <p className="text-xs whitespace-nowrap text-gray-400">
                            {truncateText(ticket.assigned_to ?? "", 13)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        className={`${getInboxStatusStyle(
                          ticket.status
                        )} font-sans  h-5 text-[11px] p-2`}
                      >
                        {ticket.status}
                      </Badge>
                      <p className="text-xs">{formatTimeAgo(ticket.created)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FetchLoadingAndEmptyState>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportOverviewPage;
