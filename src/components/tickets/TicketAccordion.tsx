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
import { useMediaQuery } from "usehooks-ts";
import { SheetClose } from "../ui/sheet";

interface TicketsAccordionProps {
  value: string;
  index: number;
  onAccordionChange: (index: string) => void;
}

function useFilterUpdate(location: Location, navigate: (path: string) => void) {
  return (filter: string) => {
    const params = new URLSearchParams(location.search);
    params.set("filter", filter);
    navigate(`${Cssky_Dashboard_Routes.tickets}?${params.toString()}`);
  };
}
 interface AccordionItemContentProps{
  selected: string;
  setSelected: (filter: string) => void;
  updateUrlParam: (filter: string) => void;
 }

function AccordionItemContent({
  selected,
  setSelected,
  updateUrlParam,
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
          iconSize={14}
          className={`w-full cursor-pointer text-grey rounded-2xl ${
            selected === filter.value ? "text-primary" : ""
          }`}
        >
          <span>{filter.label}</span>
        </SidebarButton>
      ))}
    </>
  );
}

export function TicketsAccordion({
  value,
  onAccordionChange,
  index,
}: Readonly<TicketsAccordionProps>) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("all");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const updateUrlParam = useFilterUpdate(location, navigate);

  function handleAccordionClick() {
    setSelected("all");
    updateUrlParam("all");
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
      className="no-underline mt-2"
    >
      <AccordionItem value={`item-${index}`} className="no-underline border-none">
        <AccordionTrigger
          isExpanded={isDesktop}
          className={`no-underline hover:no-underline w-full hover:text-grey hover:bg-gray-200 text-grey h-12 lg:rounded-xl ${
            location.search.includes("filter=")
              ? "lg:bg-[#FFFAEF] hover:bg-[#FFFAEF] text-[#FF7F00] hover:text-[#FF7F00]"
              : ""
          }`}
        >
          <SidebarButton
            icon={Ticket}
            className="hover:bg-transparent w-full bg-transparent"
          >
            <span>Tickets</span>
          </SidebarButton>
        </AccordionTrigger>
        <AccordionContent className="border-none p-0 h-fit mb-0 mt-1 outline-none">
          <AccordionItemContent
            selected={selected}
            setSelected={setSelected}
            updateUrlParam={updateUrlParam}
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
      <AccordionItem value={`item-${index}`} className="no-underline border-none">
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
                iconSize={14}
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
