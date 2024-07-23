import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useLocation, useNavigate } from "react-router-dom";
import { Ticket, Plus } from "lucide-react";
import { useState } from "react";
import { SidebarButton } from "../sidebar-button";
import { Cssky_Dashboard_Routes } from "../store/data";
import { filters } from "../store/data/ticket";
import { useMediaQuery } from "usehooks-ts";

interface TicketsAccordionProps {
  value: string;
  index: number;
  onAccordionChange: (index: string) => void;
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

  function updateUrlParam(filter: string) {
    const params = new URLSearchParams(location.search);
    params.set("filter", filter);
    navigate(`${Cssky_Dashboard_Routes.tickets}?${params.toString()}`);
  }

  function handleAccordionClick() {
    setSelected("all");
    updateUrlParam("all");
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={`item-${index}` === value ? `item-${index}` : ``}
      onValueChange={(value) => {
        onAccordionChange(value);
        handleAccordionClick();
      }}
      className="no-underline mt-2"
    >
      <AccordionItem
        value={`item-${index}`}
        className="no-underline border-none"
      >
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
            className={`hover:bg-transparent w-full bg-transparent`}
          >
            <span className="linkText">Tickets</span>
          </SidebarButton>
        </AccordionTrigger>
        <AccordionContent className="border-none p-0 h-fit mb-0 mt-1 outline-none">
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
              <span className="linkText">{filter.label}</span>
            </SidebarButton>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
