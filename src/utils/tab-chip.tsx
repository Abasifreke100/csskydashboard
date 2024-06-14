import { Dispatch, SetStateAction } from "react";
import { Badge } from "../components/ui/badge";
import {motion} from "framer-motion"

export const Chip = ({
    text,
    selected,
    setSelected,
  }: {
    text: string;
    selected: boolean;
    setSelected: Dispatch<SetStateAction<string>>;
  }) => {
    let badgeColor;
    let number;
  
    switch (text) {
      case "All":
        badgeColor = "bg-[#FFFAEF] hover:bg-primary /75 text-[#FF7F00]";
        number = 213403;
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
        } text-sm transition-colors px-2.5 py-0.5 rounded-md border-none outline-none relative`}
      >
        <span className="relative z-10 text-md">{text}</span>
        <Badge className={`${badgeColor} ml-3 hover:text-white`}>{number}</Badge>
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 z-0 border-b-2 mt-0.5 border-primary "
          ></motion.span>
        )}
      </button>
    );
  };