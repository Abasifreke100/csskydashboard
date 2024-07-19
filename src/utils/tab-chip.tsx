import { Dispatch, SetStateAction } from "react";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { CorporateResponse, CustomerIndividualResponse, Data } from "../types";

export const Chip = ({
  text,
  selected,
  setSelected,
  icon,
  data,
}: {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
  icon?: LucideIcon | IconType;
  data?: CustomerIndividualResponse | CorporateResponse | null;
}) => {
  let badgeColor;
  let number;
  const Icon = icon;

  const verifiedCount =
  (data?.data as Data)?.verifiedIndividual ??
  (data as CorporateResponse)?.data.verifiedCorporate ??
  0;

const pendingCount =
  (data?.data as Data)?.pendingIndividual ??
  (data as CorporateResponse)?.data.pendingCorporate ??
  0;

  switch (text) {
    case "all":
      badgeColor = "bg-[#FFFAEF] hover:bg-primary /75 text-[#FF7F00]";
      number = verifiedCount + pendingCount;
      break;
    case "verified":
      badgeColor = "bg-lightGreen hover:bg-deepGreen/75 text-deepGreen";
      number = verifiedCount
      break;
    case "pending":
      badgeColor = "bg-secondary hover:bg-primary/75 text-primary";
      number = pendingCount;
      break;
    // case "failed":
    //   badgeColor = "bg-lightRed hover:bg-deepRed/75 text-deepRed";
    //   number = 2203;
    //   break;
    default:
      badgeColor = "bg-[#FFFAEF] text-[#FF7F00]";
  }
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected ? "" : "text-slate-400 "
      } text-xs flex items-center  transition-colors px-2.5 py-0.5 rounded-md border-none h-7 outline-none  relative`}
    >
      <span className="relative capitalize z-10   text-md flex items-center">
        {Icon && (
          <Icon
            className={`inline-flex h-5 text-[16px] mr-1  ${
              selected && "text-primary"
            }`}
          />
        )}
        {text}
      </span>

      {number && number > 0 ? (
        <Badge className={`${badgeColor} ml-3 hover:text-white`}>
          {number}
        </Badge>
      ) : (
        " "
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
