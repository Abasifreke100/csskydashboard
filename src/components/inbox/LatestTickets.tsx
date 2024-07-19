import { ChevronRight, CircleAlert } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { truncateText } from "../../utils/text";
import { Badge } from "../ui/badge";
import { getInboxStatusStyle } from "../../utils/status";
import { useNavigate } from "react-router-dom";

const LatestTickets = () => {
  const navigate = useNavigate();
  //sample data
  const sampleData = [
    {
      id: "6253ihgvitxhdarr433bjd94717",
      assignee: {
        issue: "Network Problem",
        name: "Janet Doe",
      },
      status: "open",
      time: "10:33",
    },
  ];

  const navigateToInbox = (id: string) => {
    navigate(`/inbox/${id}`);
  };

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center text-sm font-medium justify-between">
            <p className="flex   items-center">
              Latest Ticket <CircleAlert className="h-3" />
            </p>
            <button className="flex items-center ">
              See All <ChevronRight className="h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto">
          {sampleData.map((data) => {
            const { id, assignee, status, time } = data;
            const statusStyle = getInboxStatusStyle(status);
            return (
              <div
                key={status}
                onClick={() => navigateToInbox(id)}
                className="flex  items-center cursor-pointer justify-between border-b py-3"
              >
                <div className="flex gap-1.5">
                  <Avatar className=" h-10 w-10 mr-1">
                    <AvatarImage src="https://github.com/max-programming.png" />
                    <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className=" ml-1">
                    <p className="text-sm whitespace-nowrap font-medium text-black">
                      {truncateText(assignee.issue, 20)}
                    </p>
                    <p className="text-xs whitespace-nowrap text-gray-400">
                      {truncateText(assignee.name, 13)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge className={`${statusStyle} font-sans  h-5 text-[11px] p-2`}>
                    Open
                  </Badge>
                  <p className="text-xs">{time}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestTickets;
