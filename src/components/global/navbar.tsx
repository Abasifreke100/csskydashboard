import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useProviderContext } from "../../constants";
import AvatarDropdown from "../dropdowns/avatar-dropdown";
// import { Badge } from "..//ui/badge";
// import { Input } from "../ui/input";
import logo from "../../assets/cssMobileImage.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TierDropdown from "../dropdowns/tier-dropdown";

const Navbar = () => {
  const { setIsSidebarOpen } = useProviderContext();
  const user = useSelector((state: RootState) => state.auth);  
  
  return (
    <div className="containerLg h-14 z-40 bg-white rounded-xl shadow-md col-span-12 ">
      <div className="flex items-center  h-full justify-between">
        <img src={logo} alt="logo" className="w-16 h-full" />
        {/* <Input
          type="search"
          placeholder="Search"
          className="max-w-[450px] ml-12 hidden lg:block h-8 px-5 text-[#8F8F8F] rounded-3xl border-none outline-none bg-[#F5F5F7]"
        /> */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <IoIosNotificationsOutline className="text-xl" />
            <div className="w-2 h-2 bg-[#FF7F00] rounded-full absolute right-0.5 top-0" />
          </div>
          {user.user && <TierDropdown user={user.user} />}
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
