import { SidebarButton } from "./sidebar-button";
// import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SidebarItems } from "../types";
import { useProviderContext } from "../constants";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const location = useLocation();
  const {setActive} = useProviderContext()

  function isActivePath(currentPath: string, linkPath: string) {
    if (currentPath === linkPath) {

      return true;
    }
    return (
      currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/"
    );
  }

  return (
    <div className="py-3 overflow-hidden  h-full">
      <aside className="lg:w-[240px] max-w-xs shadow-lg h-full bg-white rounded-tr-2xl  rounded-br-md overflow-y-auto ">
        <div className="flex flex-col justify-between border h-full">
          <div className="flex flex-col gap-3 w-full">
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} to={link.href}>
                <SidebarButton
                  // variant={location.pathname === link.href ? '' : 'ghost'}
                  onClick={() => setActive(link.label)}
                  icon={link.icon}
                  className={`w-full rounded-none  hover:bg-[#FF7F00]/45 text-grey  h-12 rounded-tr-2xl rounded-br-2xl ${
                    isActivePath(location.pathname, link.href) &&
                    "bg-[#FF7F00] shadow-md text-white hover:bg-[#FF7F00] hover:text-white"
                  }`}
                >
                  <span className="linkText">{link.label}</span>
                </SidebarButton>
              </Link>
            ))}
            {/* {props.sidebarItems.extras} */}
          </div>
          <div className="w-full  ">
            {/* <Separator className="absolute -top-3 left-0 w-full" /> */}
            <Popover>
              <PopoverTrigger className="h-10 w-full " asChild>
                <div className="flex justify-between  mb-2 items-center w-full px-2">
                  <div className="flex items-center logOutAvatar">
                    <Avatar className="h-10 w-10 mr-1 ">
                      <AvatarImage src="https://github.com/max-programming.png" />
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                    <p className="text-xs">John Doe</p>
                  </div>
                  {/* <p>Lo</p> */}
                  <LogOut size={20} className="cursor-pointer" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                className="mb-2 w-56 p-3 rounded-[1rem]"
              >
                <div className="">
                  {/* <Link to="/">
                    <SidebarButton
                      size="sm"
                      icon={Settings}
                      className="w-full border-none outline-none"
                    >
                      Account Settings
                    </SidebarButton>
                  </Link> */}
                  <SidebarButton size="sm" icon={LogOut} className="w-full ">
                    Log Out
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </aside>
    </div>
  );
}
