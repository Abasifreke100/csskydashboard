import { SidebarButton } from "./sidebar-button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SidebarItems } from "../types";
import { useProviderContext } from "../constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useEffect, useState } from "react";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
  handleLogout: () => void
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const location = useLocation();
  const [value, setValue] = useState(" ");
  const { setActive, setCurrentPage } = useProviderContext();
  


  useEffect(() => {
    setValue(" ");
  }, [location.pathname]);

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
            {props.sidebarItems.links.map((link, index) =>
              link.children ? (
                <Accordion
                  type="single"
                  className="no-underline"
                  collapsible
                  key={index}
                  value={`item-${value}`}
                  onValueChange={() => {
                    if (value == " ") {
                      setValue(`${index}`);
                      setCurrentPage(1);
                    } else {
                      setValue(" ");
                      setCurrentPage(1);
                    }
                  }}
                >
                  <AccordionItem
                    className="no-underline border-none"
                    value={`item-${index}`}
                  >
                    <AccordionTrigger
                      className={`no-underline hover:no-underline pr-3 w-full rounded-none hover:bg-[#FF7F00]/45 text-grey h-12 rounded-tr-2xl rounded-br-2xl ${
                        isActivePath(location.pathname, link.href) &&
                        "bg-[#FF7F00] shadow-md text-white hover:bg-[#FF7F00] hover:text-white"
                      } `}
                    >
                      <SidebarButton
                        onClick={() => setValue("")}
                        icon={link.icon}
                        className={`hover:bg-transparent text-black hover:text-black bg-transparent ${
                          isActivePath(location.pathname, link.href) &&
                          "text-white hover:text-white"
                        } `}
                      >
                        <span className="linkText no-underline">
                          {link.label}
                        </span>
                      </SidebarButton>
                    </AccordionTrigger>
                    <AccordionContent className="border-none h-fit mb-0  mt-1 outline-none">
                      {link.children.map((child, childIndex) => (
                        <Link key={childIndex} to={child.href}>
                          <SidebarButton
                            icon={child?.icon}
                            onClick={() => setActive(child.label)}
                            className={`w-full hover:bg-[#fffaef]  rounded-tr-2xl rounded-br-2xl  ${
                              isActivePath(location.pathname, child.href) &&
                              "text-primary "
                            }`}
                          >
                            <span className="linkText"> {child.label}</span>
                          </SidebarButton>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link key={index} to={link.href}>
                  <SidebarButton
                    onClick={() => setActive(link.label)}
                    icon={link.icon}
                    className={`w-full rounded-none hover:bg-[#FF7F00]/45 text-grey h-12 rounded-tr-2xl rounded-br-2xl ${
                      isActivePath(location.pathname, link.href) &&
                      "bg-[#FF7F00] shadow-md text-white hover:bg-[#FF7F00] hover:text-white"
                    }`}
                  >
                    <span className="linkText">{link.label}</span>
                  </SidebarButton>
                </Link>
              )
            )}
            {/* {props.sidebarItems.extras} */}
          </div>
          <div className="w-full  ">
            {/* <Separator className="absolute -top-3 left-0 w-full" /> */}
            <Popover>
              <PopoverTrigger className="h-10 w-full " asChild>
                <div className="flex justify-between cursor-pointer  mb-2 items-center w-full px-2">
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
                  <SidebarButton size="sm" onClick={() => props.handleLogout()} icon={LogOut} className="w-full cursor-pointer">
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
