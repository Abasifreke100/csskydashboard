import { ProfileInfoProps } from "../types";
import { Badge } from "./ui/badge";

const getBadgeDetails = (value: string | number) => {
  let badgeBgColor = "";
  let badgeText = "";

  const valueStr = String(value).toLowerCase();

  switch (valueStr) {
    case "verified":
      badgeBgColor = "bg-lightGreen hover:bg-lightGreen text-deepGreen";
      badgeText = "Verified";
      break;
    case "pending":
      badgeBgColor = "bg-secondary hover:bg-secondary text-primary";
      badgeText = "Pending";
      break;
    case "failed":
      badgeBgColor = "bg-lightRed hover:bg-lightRed text-deepRed";
      badgeText = "Failed";
      break;
    default:
      badgeBgColor = "bg-grey hover:bg-grey text-white";
      badgeText = valueStr;
  }

  return { badgeBgColor, badgeText };
};


export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  label,
  value,
  badgeClassName,
}) => {
  const { badgeBgColor, badgeText } = getBadgeDetails(value);

  return (
    <div className="flex items-center gap-2">
      <p className="text-grey text-sm font-semibold whitespace-nowrap">
        {label}
      </p>
      <Badge className={`${badgeBgColor} ${badgeClassName}`}>
        {badgeText}
      </Badge>
    </div>
  );
};
