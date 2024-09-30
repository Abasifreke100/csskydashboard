import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProviderContext } from "../constants";
import { SidebarItems, Theme, User } from "../types";
import { AlignJustify, LogOut } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SidebarButton } from "./sidebar-button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { truncateText } from "../utils/text";
import { TicketsAccordion } from "./tickets/TicketAccordion";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
  handleLogout: () => void;
  user: User | null;
  initials: string;
  fullName: string;
}

export function SidebarDesktop(props: Readonly<SidebarDesktopProps>) {
  const location = useLocation();
  const [value, setValue] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { setActive, setCurrentPage } = useProviderContext();
  const lastClickedRef = useRef<string | null>(null);

  useEffect(() => {
    setValue("");
  }, [location.pathname]);

  function isActivePath(currentPath: string, linkPath: string): boolean {
    if (currentPath === linkPath) {
      return true;
    }
    return (
      currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/"
    );
  }

  function toggleSidebar() {
    setIsExpanded(!isExpanded);
    setValue("");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleAccordionClick(link: any, index: number) {
    if (location.pathname !== link.href) {
      setIsExpanded(true);
      lastClickedRef.current = link.href;
      setCurrentPage(1);
      setValue("");
    } else if (lastClickedRef.current === link.href) {
      setValue(`item-${index}`);
    }
    lastClickedRef.current = link.href;
  }

  const handleAccordionChange = useCallback(
    (index: string) => {
      setCurrentPage(1);
      setValue(index);
    },
    [setCurrentPage]
  );

  return (
    <div
      className={`overflow-hidden h-full  py-2 ${
        isExpanded ? "fixed z-10 lg:relative top-0 " : ""
      }`}
    >
      <aside
        className={`transition-all duration-300 h-full  rounded-tr-md  bg-white overflow-y-scroll ${
          isExpanded ? "w-[240px]" : "w-[50px]"
        } lg:w-[240px] max-w-xs shadow-lg flex flex-col `}
      >
        <div className="flex flex-col flex-1 gap-6 justify-between mt-4 lg:mt-0 ">
          <div className="flex flex-col  gap-5 w-full">
            <button
              className={`w-full px-4 h-[20px] border-none outline-none flex lg:hidden items-center  ${
                isExpanded
                  ? "justify-between mt-14 "
                  : "justify-center lg:justify-between "
              }`}
              onClick={toggleSidebar}
            >
              <p className={` ${isExpanded ? "block" : "hidden lg:block"}`}>
                Connect Surf Smile
              </p>
              <AlignJustify
                size={20}
                className={`${isExpanded ? "" : "mt-3 lg:mt-0"}`}
              />
            </button>
            {props.sidebarItems.theme.map((theme: Theme) => (
              <div key={theme.title} className="px-2 w-full h-full">
                <p
                  className={` ml-1 mb-1 font-medium text-xs ${
                    isExpanded ? "block" : "hidden lg:block"
                  } ${theme.title == "KYC" && "mt-4"}`}
                >
                  {theme.title}
                </p>
                {theme.links.map((link, index) =>
                  link.label === "Tickets" ? (
                    <TicketsAccordion
                      key={link.label}
                      index={index + 2}
                      value={value}
                      onAccordionChange={handleAccordionChange}
                      isExpanded={isExpanded}
                      setIsExpanded={setIsExpanded}
                    />
                  ) : link.children ? (
                    <Accordion
                      type="single"
                      className={`no-underline `}
                      collapsible
                      key={link.label}
                      value={`item-${index}` === value ? `item-${index}` : ""}
                      onValueChange={(value) => handleAccordionChange(value)}
                    >
                      <AccordionItem
                        className="no-underline mt-2 border-none"
                        value={`item-${index}`}
                      >
                        <AccordionTrigger
                          isExpanded={isExpanded}
                          className={`w-full items-center text-xs ${
                            isExpanded
                              ? "px-4 lg:px-0"
                              : "justify-center lg:justify-start px-0"
                          }  text-grey hover:bg-gray-200 h-12 rounded-xl ${
                            isActivePath(location.pathname, link.href) &&
                            " lg:bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00] "
                          } ${
                            isExpanded &&
                            isActivePath(location.pathname, link.href)
                              ? "text-primary bg-[#FFFAEF] hover:bg-[#FFFAEF] "
                              : isExpanded &&
                                isActivePath(location.pathname, link.href)
                              ? "bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00]"
                              : isExpanded &&
                                !isActivePath(location.pathname, link.href)
                              ? ""
                              : !isExpanded &&
                                isActivePath(location.pathname, link.href)
                              ? "lg:bg-[#FFFAEF] hover:bg-[#FFFAEF] text-primary"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccordionClick(link, index);
                          }}
                        >
                          <SidebarButton
                            icon={link.icon}
                            className={`bg-transparent hover:bg-transparent text-xs ${
                              isExpanded
                                ? ""
                                : "justify-center lg:justify-start"
                            } bg-transparent  ${
                              isActivePath(location.pathname, link.href) && ""
                            }`}
                          >
                            <span
                              className={` ml-2 no-underline ${
                                isExpanded ? "block" : "hidden lg:block"
                              }`}
                            >
                              {link.label}
                            </span>
                          </SidebarButton>
                        </AccordionTrigger>
                        <AccordionContent className="flex gap-2 flex-col pb-0 h-fit mb-0 mt-1 outline-none">
                          <div className=" flex flex-col gap-2 pt-1">
                            {link.children.map((child) => (
                              <Link key={child.href} to={child.href}>
                                <SidebarButton
                                  icon={child?.icon}
                                  onClick={() => setActive(child.label)}
                                  className={`w-full text-xs hover:text-grey hover:bg-gray-200 text-grey rounded-2xl ${
                                    isExpanded
                                      ? "px-4"
                                      : "justify-center lg:justify-start lg:px-0"
                                  }    ${
                                    isActivePath(
                                      location.pathname,
                                      child.href
                                    ) &&
                                    "bg-transparent focus:bg-transparent lg:bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00]"
                                  }`}
                                >
                                  <span
                                    className={` ml-2 no-underline ${
                                      isExpanded ? "block" : "hidden lg:block"
                                    }`}
                                  >
                                    {child.label}
                                  </span>
                                </SidebarButton>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="w-full"
                      onClick={() => setValue("")}
                    >
                      <SidebarButton
                        onClick={() => setActive(link.label)}
                        icon={link.icon}
                        className={`w-full ${
                          index > 0 ? "mt-2" : "mt-0"
                        } items-center text-xs ${
                          isExpanded
                            ? "px-4"
                            : "justify-center lg:justify-start"
                        }  hover:bg-gray-200 text-grey h-12 rounded-xl ${
                          isActivePath(location.pathname, link.href) &&
                          " lg:bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00]  "
                        } ${
                          isExpanded &&
                          isActivePath(location.pathname, link.href)
                            ? "bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00]"
                            : isExpanded &&
                              !isActivePath(location.pathname, link.href)
                            ? ""
                            : !isExpanded &&
                              isActivePath(location.pathname, link.href)
                            ? "text-primary  bg-transparent hover:bg-transparent"
                            : ""
                        }`}
                      >
                        <span
                          className={` ml-2 ${
                            isExpanded ? "block" : "hidden lg:block"
                          }`}
                        >
                          {link.label}
                        </span>
                      </SidebarButton>
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
          <div className="w-full h-10 ">
            <Popover>
              <PopoverTrigger className="h-full w-full" asChild>
                <div
                  className={`flex ${
                    isExpanded
                      ? "justify-between"
                      : "justify-center lg:justify-between"
                  } cursor-pointer  items-center w-full px-2 `}
                >
                  <div
                    className={`items-center  ${
                      isExpanded ? "flex" : "hidden lg:flex"
                    }`}
                  >
                    <Avatar className="h-8 w-8 mr-1">
                      <AvatarFallback className="text-xs ">
                        {props.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className=" ml-1">
                      <p className="text-xs">
                        {truncateText(props.fullName, 20)}
                      </p>
                      <p className="text-[10px]">
                        {truncateText(props.user?.email ?? "", 20)}
                      </p>
                    </div>
                  </div>
                  <LogOut size={14} className="cursor-pointer" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                sideOffset={9}
                className="mb-2 w-56 p-1 rounded-lg border"
              >
                <div>
                  <SidebarButton
                    size="sm"
                    onClick={props.handleLogout}
                    icon={LogOut}
                    className="w-full gap-3 cursor-pointer"
                  >
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
