import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { Ticket, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { SidebarButton, SidebarMobileButton } from "../sidebar-button";
import { Cssky_Dashboard_Routes } from "../store/data";
import { filters } from "../store/data/ticket";
import { SheetClose } from "../ui/sheet";
import { Dispatch, SetStateAction } from "react";

interface TicketsAccordionProps {
  value: string;
  index: number;
  onAccordionChange: (index: string) => void;
  isExpanded?: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
}

function useFilterUpdate(location: Location, navigate: (path: string) => void) {
  return (filter: string) => {
    const params = new URLSearchParams(location.search);
    params.set("filter", filter);
    navigate(`${Cssky_Dashboard_Routes.tickets}?${params.toString()}`);
  };
}
interface AccordionItemContentProps {
  selected: string;
  setSelected: (filter: string) => void;
  updateUrlParam: (filter: string) => void;
  isExpanded?: boolean;
}

function AccordionItemContent({
  selected,
  setSelected,
  updateUrlParam,
  isExpanded,
}: Readonly<AccordionItemContentProps>) {
  return (
    <>
      {filters.map((filter) => (
        <SidebarButton
          key={filter.value}
          icon={Plus}
          onClick={() => {
            setSelected(filter.value);
            updateUrlParam(filter.value);
          }}
          className={`w-full h-7 text-grey text-xs cursor-pointer ${
            isExpanded ? "px-4" : "justify-center lg:justify-start lg:px-0"
          }    ${
            selected === filter.value &&
            "bg-transparent focus:bg-transparent  text-[#FF7F00] hover:text-[#FF7F00]"
          }`}
        >
          <span
            className={` ml-2 no-underline ${
              isExpanded ? "block" : "hidden lg:block"
            }`}
          >
            {filter.label}
          </span>
        </SidebarButton>
      ))}
    </>
  );
}

export function TicketsAccordion({
  value,
  onAccordionChange,
  index,
  isExpanded,
  setIsExpanded,
}: Readonly<TicketsAccordionProps>) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("all");
  const updateUrlParam = useFilterUpdate(location, navigate);

  function handleAccordionClick() {
    setSelected("all");
    updateUrlParam("all");
    if (setIsExpanded) {
      setIsExpanded(true);
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={`item-${index}` === value ? `item-${index}` : ""}
      onValueChange={(value) => {
        onAccordionChange(value);
        handleAccordionClick();
      }}
    >
      <AccordionItem
        value={`item-${index}`}
        className="no-underline mt-2 border-none"
      >
        <AccordionTrigger
          isExpanded={isExpanded}
          className={`w-full items-center text-xs ${
            isExpanded ? "px-4 lg:px-0" : "justify-center lg:justify-start px-0"
          }  hover:bg-gray-200 text-grey h-12 rounded-xl ${
            location.search.includes("filter=") &&
            " bg-[#FFFAEF] hover:bg-[#FFFAEF]"
          } ${
            isExpanded && location.search.includes("filter=")
              ? "text-primary bg-[#FFFAEF] hover:bg-[#FFFAEF]  "
              : isExpanded && location.search.includes("filter=")
              ? "bg-transparent hover:bg-transparent text-[#618be8]"
              : isExpanded && !location.search.includes("filter=")
              ? ""
              : !isExpanded && location.search.includes("filter=")
              ? "bg-[#FFFAEF] hover:bg-[#FFFAEF] text-primary"
              : ""
          }`}
        >
          <SidebarButton
            icon={Ticket}
            className={`h-fit  hover:bg-transparent text-xs ${
              isExpanded ? "" : "justify-center lg:justify-start"
            } bg-transparent  ${location.search.includes("filter=") && ""}`}
          >
            <span
              className={` ml-2 no-underline ${
                isExpanded ? "block" : "hidden lg:block"
              }`}
            >
              Tickets
            </span>
          </SidebarButton>
        </AccordionTrigger>
        <AccordionContent className="flex gap-2 flex-col pb-0 h-fit mb-0 mt-1 outline-none">
          <AccordionItemContent
            selected={selected}
            setSelected={setSelected}
            updateUrlParam={updateUrlParam}
            isExpanded={isExpanded}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function MobileTicketsAccordion({
  value,
  onAccordionChange,
  index,
}: Readonly<TicketsAccordionProps>) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("all");
  const updateUrlParam = useFilterUpdate(location, navigate);

  // Effect to synchronize selected state with URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter") ?? "all";
    setSelected(filter);
  }, [location.search]);

  function handleAccordionClick(isOpening: boolean) {
    if (isOpening) {
      setSelected("all");
      updateUrlParam("all");
    }
  }

  function handleFilterClick(filterValue: string) {
    setSelected(filterValue);
    updateUrlParam(filterValue);
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={`item-${index}` === value ? `item-${index}` : ""}
      onValueChange={(value) => {
        const isOpening = value === `item-${index}`;
        onAccordionChange(value);
        handleAccordionClick(isOpening);
      }}
      className="no-underline mt-2"
    >
      <AccordionItem
        value={`item-${index}`}
        className="no-underline border-none"
      >
        <AccordionTrigger
          isExpanded={true}
          className={`no-underline hover:no-underline w-full hover:text-grey hover:bg-gray-200 text-grey h-12 rounded-xl ${
            location.search.includes("filter=")
              ? "lg:bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00]"
              : ""
          }`}
        >
          <SidebarMobileButton
            icon={Ticket}
            className="hover:bg-transparent w-full bg-transparent"
          >
            <span>Tickets</span>
          </SidebarMobileButton>
        </AccordionTrigger>
        <AccordionContent className="border-none p-0 h-fit mb-0 mt-1 outline-none">
          {filters.map((filter) => (
            <SheetClose className="w-full" key={filter.value}>
              <SidebarMobileButton
                icon={Plus}
                onClick={() => handleFilterClick(filter.value)}
                // iconSize={14}
                className={`w-full cursor-pointer text-grey rounded-2xl ${
                  selected === filter.value ? "text-primary" : ""
                }`}
              >
                <span>{filter.label}</span>
              </SidebarMobileButton>
            </SheetClose>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
