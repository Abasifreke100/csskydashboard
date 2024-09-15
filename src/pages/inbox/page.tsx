import { useMemo, useState } from "react";
import Header from "../../components/global/header";
import LatestTicketEmptyState from "../../components/inbox/LatestTicketEmptyState";
import LatestTicketSkeleton from "../../components/inbox/LatestTicketSkeleton";
import LatestTickets from "../../components/inbox/LatestTickets";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import { Chip } from "../../utils/tab-chip";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useFetchTickets } from "../../hooks/useFetchTickets";
import { useFetchUserIds } from "../../hooks/useAllUserIds";

const inboxTabs = ["all", "open", "unresolved", "closed"];

const InboxPage = () => {
  const [selected, setSelected] = useState(inboxTabs[0]);
  const { data: userIds, isLoading: isLoadingIds } = useFetchUserIds();
  const { tickets, isLoading } = useFetchTickets({
    userIds: userIds?.data ?? [],
  });

  const filteredAndSortedTickets = useMemo(() => {
    const filteredTickets = tickets.filter((ticket) => {
      if (selected === "all") return true;
      return ticket.status === selected;
    });

    const sortedTickets = filteredTickets.slice().sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedTickets.slice(0, 10);
  }, [tickets, selected]);

  return (
    <div>
      <Header title="Inbox" />
      <div className="overflow-hidden flex-col lg:flex-row w-full lg:py-6 lg:justify-between flex lg:items-center flex-nowrap gap-2">
        <div className="w-fit whitespace-nowrap overflow-x-auto flex items-center flex-nowrap gap-2">
          {inboxTabs.map((tab) => (
            <Chip
              text={tab}
              selected={selected === tab}
              setSelected={setSelected}
              key={tab}
            />
          ))}
        </div>
        <div>
          <div className="bg-white flex gap-0.5 rounded-lg items-center px-2">
            <Search size={15} />
            <Input
              className="outline-none flex-1 w-[450px]"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <FetchLoadingAndEmptyState
          isLoading={isLoadingIds || isLoading}
          numberOfSkeleton={1}
          skeleton={<LatestTicketSkeleton length={3} />}
          emptyState={<LatestTicketEmptyState />}
          data={filteredAndSortedTickets.length}
        >
          <LatestTickets tickets={filteredAndSortedTickets} />
        </FetchLoadingAndEmptyState>
      </div>
    </div>
  );
};

export default InboxPage;
