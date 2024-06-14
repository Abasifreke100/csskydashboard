import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  // SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { LogOut, MoreHorizontal, X } from "lucide-react";
import { SidebarButtonSheet as SidebarButton } from "./sidebar-button";
import { Separator } from "./ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { SidebarItems } from "../types";
import { useProviderContext } from "../constants";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
  const location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen } = useProviderContext();


  function isActivePath(currentPath: string, linkPath: string) {
    if (currentPath === linkPath) {
      return true;
    }
    return (
      currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/"
    );
  }

  return (
    <Sheet open={isSidebarOpen} onOpenChange={() => setIsSidebarOpen(false)}>
      <SheetContent side="left" className="px-3 py-4" hideClose>
        <SheetHeader className="flex flex-row justify-end items-center space-y-0">
          
          <SheetClose asChild>
            <Button
              className="h-7 w-7 p-0"
              variant="ghost"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="h-full">
          <div className="mt-5 flex flex-col w-full gap-1">
            {props.sidebarItems.links.map((link, idx) => (
              <Link key={idx} to={link.href}>
                <SidebarButton
                  // variant={location.pathname === link.href ? '' : 'ghost'}
                  icon={link.icon}
                  className={`w-full rounded-none  hover:bg-[#FF7F00]/45 text-grey  h-12 rounded-tr-2xl rounded-br-2xl ${
                    isActivePath(location.pathname, link.href) &&
                    "bg-[#FF7F00] shadow-md text-white hover:bg-[#FF7F00] hover:text-white"
                  }`}
                >
                  <span className="">{link.label}</span>
                </SidebarButton>
              </Link>
            ))}
          </div>
          <div className="absolute w-full bottom-4 px-1 left-0">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-full  hover:bg-slate-100 bg-transparent text-black justify-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                     <div className="flex  items-center gap-4">
                     <Avatar className="h-10 w-10">
                        <AvatarImage src="https://github.com/max-programming.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">John Doe</span>
                     </div>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mb-2 p-2">
                <div className="flex flex-col space-y-2 mt-2">
                  {/* <Link to="/">
                    <SidebarButton size="sm" icon={Settings} className="w-full">
                      Account Settings
                    </SidebarButton>
                  </Link> */}
                  <SidebarButton size="sm" icon={LogOut} className="w-full">
                    Log Out
                  </SidebarButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
