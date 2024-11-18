import { CircleCheckBig } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Cssky_Dashboard_Routes } from "../../../components/store/data";

const VerifySuccessModal = ({
  verifySuccessModal,
}: {
  verifySuccessModal: () => void; // Callback to handle the verification action
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <CircleCheckBig size={80} className="text-primary mx-auto" />
      <p className="text-center mx-auto font-medium mt-10">Success!</p>
      <p className="text-center mx-auto text-xs">
        User verification successful. New task &quot;Create User Profile&quot;
        created
      </p>
      <Button
        className="w-full bg-primary mt-5 rounded-full h-12"
        onClick={() => navigate(Cssky_Dashboard_Routes.tasks)}
      >
        See Task
      </Button>
      <Button
        onClick={() => verifySuccessModal()}
        className="w-full mt-4 bg-white hover:bg-white border-primary border text-primary rounded-full h-12"
      >
        Later
      </Button>
    </div>
  );
};

export default VerifySuccessModal;
