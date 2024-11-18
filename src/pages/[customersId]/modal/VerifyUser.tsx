import React from "react";
import { Corporate, Response } from "../../../types";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

interface VerifyUserProps {
  onVerify: () => void; // Callback to handle the verification action
  verifyStatus: () => void; // Callback to handle the verification action
  type?: string;
  data?: Response | Corporate;
}

const VerifyUser: React.FC<VerifyUserProps> = ({
  onVerify,
  verifyStatus,
  type,
  data,
}) => {
  const handleVerify = () => {
    verifyStatus();
    console.log("User verified!");
    onVerify();
  };
  return (
    <div>
      <p className="text-sm text-primary uppercase">Verify User</p>
      <div className="flex justify-between">
        <p className="text-lg font-medium ">
          Verify{" "}
          {(data as Response)?.firstName ?? (data as Corporate)?.companyName}
        </p>
        <Badge className="uppercase bg-[#fffaef] hover:bg-[#fffaef] text-primary rounded-md">
          {type}
        </Badge>
      </div>
      <p>
        A verification email will be sent to a person.Please ensure that the
        information provided are accurate and sufficient
      </p>
      <Button
        className="w-full bg-primary mt-5 rounded-full h-12"
        onClick={handleVerify}
      >
        Proceed
      </Button>
      <Button
        className="w-full mt-4 bg-white hover:bg-white border-primary border text-primary rounded-full h-12"
        onClick={() => verifyStatus()}
      >
        Cancel
      </Button>
    </div>
  );
};

export default VerifyUser;
