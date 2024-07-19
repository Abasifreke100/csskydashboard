import { useState } from "react";
import Header from "../../components/global/header";
import LatestTicketEmptyState from "../../components/inbox/LatestTicketEmptyState";
import LatestTicketSkeleton from "../../components/inbox/LatestTicketSkeleton";
import LatestTickets from "../../components/inbox/LatestTickets";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import { Chip } from "../../utils/tab-chip";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";

const inboxTabs = ["all", "open", "in progress", "closed"];

const InboxPage = () => {
  const isLoading = false;
  const [selected, setSelected] = useState(inboxTabs[0]);

  return (
    <div>
      <Header title="Inbox" />
      <div className="overflow-hidden flex-col lg:flex-row w-full lg:py-6 lg:justify-between flex lg:items-center flex-nowrap gap-2">
        <div className="w-fit  whitespace-nowrap overflow-x-auto flex items-center flex-nowrap gap-2">
          {inboxTabs.map((tab) => (
            <Chip
              text={tab}
              selected={selected === tab}
              setSelected={setSelected}
              key={tab}
              // data={data}
            />
          ))}
        </div>
        <div>
          <div className="bg-white flex gap-0.5 rounded-lg items-center px-2">
            <Search size={15} />
            <Input
              className="outline-none flex-1 w-[450px] "
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <FetchLoadingAndEmptyState
          isLoading={isLoading}
          numberOfSkeleton={1}
          skeleton={<LatestTicketSkeleton length={3} />}
          emptyState={<LatestTicketEmptyState />}
          data={1}
        >
          <LatestTickets />
        </FetchLoadingAndEmptyState>
      </div>
    </div>
  );
};

export default InboxPage;
