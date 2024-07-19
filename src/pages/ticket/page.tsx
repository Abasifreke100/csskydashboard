import { useState } from "react";
import Header from "../../components/global/header";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import TicketsTable from "../../components/tickets/TicketTable";
import TicketTableEmptyState from "../../components/tickets/TicketTableEmptyState";
import { TableSkeleton } from "../../components/tickets/TicketTableSkeleton";
import TicketDetailsModal from "../../components/tickets/TicketDetailsModal";
import { Chip } from "../../utils/tab-chip";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";

const ticketsTabs = ["all", "open", "in progress", "closed"];


const TicketPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowId, setRowId] = useState<string | null>(null);
  const [selected, setSelected] = useState(ticketsTabs[0]);
  const isLoading = false; // Replace with actual loading state
  return (
    <div className=" mb-16 lg:mb-0">
      <Header title="Tickets" />
      <div className="overflow-hidden flex-col lg:flex-row w-full  lg:justify-between flex lg:items-center flex-nowrap gap-2">
        <div className="w-fit pt-6 lg:py-6 whitespace-nowrap overflow-x-auto flex items-center flex-nowrap gap-2">
          {ticketsTabs.map((tab) => (
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
          <Input className="outline-none flex-1 w-[450px]" placeholder="Search"/>
        </div>
        {/* space for month */}
       </div>
      </div>
      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={<TableSkeleton length={5} />}
        emptyState={<TicketTableEmptyState />}
        data={3}
      >
        <TicketsTable
          setRowId={setRowId}
          setIsModalVisible={setIsModalVisible}
        />
      </FetchLoadingAndEmptyState>
      <TicketDetailsModal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        rowId={rowId}
      />
    </div>
  );
};

export default TicketPage;
