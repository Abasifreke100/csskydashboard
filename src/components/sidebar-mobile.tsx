import { Sheet, SheetClose, SheetContent, SheetHeader } from "./ui/sheet";
import { Button } from "./ui/button";
import { LogOut, MoreHorizontal, X } from "lucide-react";
import { SidebarMobileButton } from "./sidebar-button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { SidebarItems, Theme } from "../types";
import { useProviderContext } from "../constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useCallback, useState } from "react";
import { MobileTicketsAccordion } from "./tickets/TicketAccordion";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
  handleLogout: () => void;
}

export function SidebarMobile(props: Readonly<SidebarMobileProps>) {
  const location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen, setActive, setCurrentPage } =
    useProviderContext();
  const [value, setValue] = useState("");

  function isActivePath(currentPath: string, linkPath: string) {
    if (currentPath === linkPath) {
      return true;
    }
    return (
      currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/"
    );
  }

  const handleAccordionChange = useCallback(
    (index: string) => {
      setCurrentPage(1);
      setValue(index);
    },
    [setCurrentPage]
  );

  return (
    <Sheet open={isSidebarOpen} onOpenChange={() => setIsSidebarOpen(false)}>
      <SheetContent side="left" className="px-1 py-4 " hideClose>
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
        <div className="h-full pb-6  overflow-y-auto">
          <div className="mt-5 flex flex-col  h-[46] w-full gap-1">
            {props?.sidebarItems?.theme?.map((theme: Theme) => (
              <div key={theme.title} className=" px-2">
                <h3 className="text-xs text-start font-semibold my-1 px-4 py-2">
                  {theme.title}
                </h3>
                {theme.links.map((link, index) =>
                  link.label === "Tickets" ? (
                    <MobileTicketsAccordion
                      key={link.label}
                      index={index}
                      value={value}
                      onAccordionChange={handleAccordionChange}
                    />
                  ) : link.children ? (
                    <Accordion
                      type="single"
                      className={`no-underline ${index > 0 && "mt-2"}`}
                      collapsible
                      key={link.label}
                      value={`item-${index}` === value ? `item-${index}` : " "}
                      onValueChange={(value) => handleAccordionChange(value)}
                      // value={`item-${value}`}
                      // onValueChange={() => {
                      //   if (value == " ") {
                      //     setValue(`${index}`);
                      //     setCurrentPage(1);
                      //   } else {
                      //     setValue(" ");
                      //     setCurrentPage(1);
                      //   }
                      // }}
                    >
                      <AccordionItem
                        className="no-underline border-none"
                        value={`item-${index}`}
                      >
                        <AccordionTrigger
                          isExpanded={true}
                          className={`no-underline hover:no-underline pr-3 w-full hover:text-grey hover:bg-gray-200 text-grey h-12 rounded-xl ${
                            isActivePath(location.pathname, link.href) &&
                            "bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00]"
                          } `}
                        >
                          <SidebarMobileButton
                            onClick={() => setValue("")}
                            icon={link.icon}
                            className={`hover:bg-transparent  bg-transparent ${
                              isActivePath(location.pathname, link.href) &&
                              "tex"
                            } `}
                          >
                            <span className=" no-underline">{link.label}</span>
                          </SidebarMobileButton>
                        </AccordionTrigger>
                        <AccordionContent className="border-none h-fit mb-0 mt-1 outline-none">
                          {link.children.map((child) => (
                            <Link key={child.label} to={child.href}>
                              <SheetClose className="w-full">
                                <SidebarMobileButton
                                  icon={child?.icon}
                                  onClick={() => {
                                    setActive(child.label);
                                    setValue(" ");
                                  }}
                                  className={`w-full hover:text-grey hover:bg-gray-200 text-grey rounded-2xl ${
                                    isActivePath(
                                      location.pathname,
                                      child.href
                                    ) && "text-primary"
                                  }`}
                                >
                                  <span className=""> {child.label}</span>
                                </SidebarMobileButton>
                              </SheetClose>
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link key={link.label} to={link.href}>
                      <SheetClose className="w-full">
                        <SidebarMobileButton
                          onClick={() => setActive(link.label)}
                          icon={link.icon}
                          className={`w-full ${
                            index > 0 && "mt-2"
                          }  hover:bg-gray-200 text-grey h-12 rounded-xl  ${
                            isActivePath(location.pathname, link.href) &&
                            "bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00]"
                          }`}
                        >
                          <span className="">{link.label}</span>
                        </SidebarMobileButton>
                      </SheetClose>
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
          <div className="absolute w-full bottom-0 py-2 bg-white px-1 left-0">
            {/* <Separator className="absolute -top-3 left-0 w-full" /> */}
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
                  <SidebarMobileButton
                    size="sm"
                    onClick={() => props.handleLogout()}
                    icon={LogOut}
                    className="w-full cursor-pointer"
                  >
                    Log Out
                  </SidebarMobileButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
