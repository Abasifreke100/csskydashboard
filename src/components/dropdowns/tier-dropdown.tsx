import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { User } from "../../types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface TierDropdownProps {
  user: User;
}

const TierDropdown: React.FC<TierDropdownProps> = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <Badge className="bg-[#FFFAEF] hover:bg-[#FFFAEF] hover:text-primary hidden md:block text-[#FF7F00]">
            Tier 3
          </Badge>
        </div>
      </PopoverTrigger>

      <PopoverContent sideOffset={5} align="end">
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
            Tier 3
          </Badge>
        </div>
        <div className="flex w-full justify-center mt-3 gap-3">
          <Button className="flex-1 h-8 gap-1 bg-primary border outline-none text-white hover:bg-primary hover:text-white">
            <BiSolidEdit className="text-sm" />
            Request Upgrade
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TierDropdown;
