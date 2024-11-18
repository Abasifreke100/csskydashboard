import { useState } from "react";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import UserTable from "../../components/user/UserTable";
import UserTableEmptyState from "../../components/user/UserTableEmptyState";
import { UserTableSkeleton } from "../../components/user/UserTableSkeleton";
import { tabs } from "../../constants";
import { Chip } from "../../utils/tab-chip";
import { Search } from "lucide-react";

const Users = () => {
      const [selected, setSelected] = useState(tabs[0]);

  const isLoading = false;
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-fit pt-6 lg:py-6 whitespace-nowrap overflow-x-auto flex items-center flex-nowrap gap-2">
          {tabs.map((tab) => (
            <Chip
              text={tab}
              selected={selected === tab}
              setSelected={setSelected}
              key={tab}
              // data={data}
            />
          ))}
        </div>{" "}
        <div className="w-full lg:w-[500px]">
          <div className="bg-white flex w-full items-center   px-1 py-1 rounded-xl gap-2">
            <div className="flex-1 ">
              <div className="flex text-grey items-center">
                <Search className="h-5" />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search Customer "
                  className="flex-1 lg:ml-2 border-none h-7 text-xs placeholder:text-sm outline-none"
                />
              </div>
            </div>
            <p className="bg-grey rounded-[12px] text-white py-1.5 px-2 text-xs h-full">
              Search
            </p>
          </div>
        </div>
      </div>
      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={<UserTableSkeleton length={10} />}
        emptyState={<UserTableEmptyState />}
        data={2}
      >
        <UserTable />
      </FetchLoadingAndEmptyState>{" "}
    </div>
  );
};

export default Users;
