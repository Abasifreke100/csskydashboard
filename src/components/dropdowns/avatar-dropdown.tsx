import { BiSolidEdit } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "../../types";
import { getInitials } from "../../utils/getInitials";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useAppDispatch } from "../../app/hooks";
import { loggedOut } from "../../features/auth/authActions";
import { truncateText } from "../../utils/text";

interface AvatarDropdownProps {
  user: User;
}

const AvatarDropdown = ({ user }: AvatarDropdownProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(loggedOut())
      .then(() => {
        toast({
          title: "Success",
          description: "Logged out successfully",
        });
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast({
          title: "Error",
          description: "Failed to log out",
        });
      });
  };

  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`;
  const initials = getInitials(fullName);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar className="w-8 h-8 ">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <p className="font-poppins text-sm">{truncateText(fullName, 3)}</p>
          <button
            className="border-none outline-none text-[#808080]"
            aria-label="Customize options"
          >
            <FaCaretDown />
          </button>
        </div>
      </PopoverTrigger>

      <PopoverContent sideOffset={5} align="end">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-sm">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-medium">{user.firstName}</p>
              <p className="text-xs text-grey ">
                {truncateText(user?.email, 20)}
              </p>
            </div>
          </div>
          {user.tier && (
            <Badge className="bg-[#FFFAEF] hover:bg-[#FFFAEF] hover:text-primary hidden md:block text-[#FF7F00] ">
              {user.tier}
            </Badge>
          )}
        </div>
        <div className="flex w-full mt-3 gap-3">
          <Button className="flex-1 h-8 gap-1 bg-white border  outline-none text-grey hover:bg-white hover:text-grey">
            <BiSolidEdit className="text-sm" />
            My Account
          </Button>
          <Button
            onClick={handleLogOut}
            className="flex-1 h-8 bg-white border text-grey outline-none hover:bg-white hover:text-grey"
          >
            <LogOut className="h-4" /> Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarDropdown;
