import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { User } from "../../types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/connectSurfApi";
import { errorToast, successToast } from "../../utils/toast";
import { formatTier } from "../../utils/text";

interface TierDropdownProps {
  user: User;
}

const requestUpgrade = async (userId: string) => {
  const response = await axiosInstance.post("/user/admin/request/upgrade", {
    userId,
  });
  return response.data;
};

const TierDropdown: React.FC<TierDropdownProps> = ({ user }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => requestUpgrade(user._id),
    onSuccess: () => {
      successToast({
        title: "Upgrade Request Sent",
        message: "Your upgrade request has been sent successfully.",
      });
      setIsPopoverOpen(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setIsPopoverOpen(false); // Close the popover on success
      errorToast({
        title: "Error Sending Upgrade Request",
        message:
          error.response.data.message ??
          "An error occurred while sending your upgrade request.",
      });
    },
  });

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
            <Badge className="bg-[#FFFAEF] hover:bg-[#FFFAEF] hover:text-primary text-[#FF7F00]">
              {formatTier(user?.tier ?? "N/A")}
            </Badge>
        </div>
      </PopoverTrigger>

      <PopoverContent sideOffset={0}>
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start gap-2">
            <p className="text-xs font-medium">Current Tier</p>
            <div>
              <p className="text-xs text-grey">
                Tier 1, 2, 3 Access privilege available
              </p>
            </div>
          </div>
          <Badge className="bg-[#FFFAEF] hover:bg-[#FFFAEF] hover:text-primary hidden md:block text-[#FF7F00]">
          {formatTier(user?.tier ?? "N/A")}
          </Badge>
        </div>
        <div className="flex w-full justify-center mt-3 gap-3">
          <Button
            className="flex-1 h-8 gap-1 bg-primary border outline-none text-white hover:bg-primary hover:text-white"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              "Processing..."
            ) : (
              <>
                <BiSolidEdit className="text-sm" />
                Request Upgrade
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TierDropdown;
