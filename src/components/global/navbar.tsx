import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useProviderContext } from "../../constants";
import AvatarDropdown from "../dropdowns/avatar-dropdown";
import logo from "../../assets/cssMobileImage.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TierDropdown from "../dropdowns/tier-dropdown";

const Navbar = () => {
  const { setIsSidebarOpen } = useProviderContext();
  const user = useSelector((state: RootState) => state.auth);

  const userTier = user?.user?.tier;

  return (
    <div className="containerLg h-14 z-40 border-b bg-white rounded-xl shadow-md col-span-12 ">
      <div className="flex items-center  h-full justify-between">
        <img src={logo} alt="logo" className="w-16 h-full" />
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <IoIosNotificationsOutline className="text-xl" />
            <div className="w-2 h-2 bg-[#FF7F00] rounded-full absolute right-0.5 top-0" />
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
