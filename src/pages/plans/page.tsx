import { UsersRound } from "lucide-react";
import PlansTable from "../../components/plans/PlansTable";
import PlansTableEmptyState from "../../components/plans/PlansTableEmptyState";
import { PlansTableSkeleton } from "../../components/plans/PlansTableSkeleton";
import { FetchLoadingAndEmptyState } from "../../components/shared/FetchLoadingAndEmptyState";
import { Button } from "../../components/ui/button";
import { Cssky_Dashboard_Routes } from "../../components/store/data";
import { useNavigate } from "react-router-dom";

const PlansPage = () => {
  const isLoading = false;
  const navigate = useNavigate()
  return (
    <div>
      <p className="font-semibold text-xl">Plans</p>
      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={<PlansTableSkeleton length={10} />}
        emptyState={<PlansTableEmptyState />}
        data={1}
      >
        <div className="flex flex-col">
          <Button className="self-end  rounded-2xl" onClick={() => navigate(Cssky_Dashboard_Routes.users)}>
            <UsersRound size={14} className=" mr-3"/> View All Users
          </Button>
          <PlansTable />
        </div>
      </FetchLoadingAndEmptyState>
    </div>
  );
};

export default PlansPage;
