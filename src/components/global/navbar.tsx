import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useProviderContext } from "../../constants";
import AvatarDropdown from "../dropdowns/avatar-dropdown";
import logo from "../../assets/cssmobilenewlogo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TierDropdown from "../dropdowns/tier-dropdown";
import NotificationDropdown from "../dropdowns/notification-dropdown";

const Navbar = () => {
  const { setIsSidebarOpen } = useProviderContext();
  const user = useSelector((state: RootState) => state.auth);

  const userTier = user?.user?.tier;

  return (
    <div className="containerLg h-14 z-20 border-b bg-white rounded-xl shadow-md col-span-12 ">
      <div className="flex items-center  h-full justify-between">
        <img src={logo} alt="logo" className="object-cover w-20 md:w-fit" />
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
           <NotificationDropdown/>
          </div>
          {user.user && userTier !== "tier-4" && (
            <TierDropdown user={user.user} />
          )}
          {user.user && <AvatarDropdown user={user.user} />}
          <Button
            size="icon"
            variant="ghost"
            className="menuIcon  h-fit w-fit "
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
