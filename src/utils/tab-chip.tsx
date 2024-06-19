import { Dispatch, SetStateAction } from "react";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export const Chip = ({
  text,
  selected,
  setSelected,
  totalItems,
  icon,
}: {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
  totalItems?: number;
  icon?: LucideIcon | IconType;
}) => {
  let badgeColor;
  let number;
  let Icon = icon;
  switch (text) {
    case "All":
      badgeColor = "bg-[#FFFAEF] hover:bg-primary /75 text-[#FF7F00]";
      number = totalItems;
      break;
    case "Verified":
      badgeColor = "bg-lightGreen hover:bg-deepGreen/75 text-deepGreen";
      number = 2203;
      break;
    case "Pending":
      badgeColor = "bg-secondary hover:bg-primary/75 text-primary";
      number = 2203;
      break;
    case "Failed":
      badgeColor = "bg-lightRed hover:bg-deepRed/75 text-deepRed";
      number = 2203;
      break;
    default:
      badgeColor = "bg-[#FFFAEF] text-[#FF7F00]";
  }
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected ? "" : "text-slate-400 "
      } text-xs flex items-center  transition-colors px-2.5 py-0.5 rounded-md border-none outline-none  relative`}
    >
      <span className="relative z-10 text-md flex items-center">
        {Icon && <Icon className={`inline-flex h-5 text-[16px] mr-1 ${selected && "text-primary"}`} />} {text}
      </span>

      {number && (
        <Badge className={`${badgeColor} ml-3 hover:text-white`}>
          {number}
        </Badge>
      )}
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0  z-0 border-b-2 mt-0.5 border-primary "
        ></motion.span>
      )}
    </button>
  );
};
