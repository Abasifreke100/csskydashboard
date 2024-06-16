import { ProfileInfoProps } from "../types";
import { Badge } from "./ui/badge";

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
    label,
    value,
    badgeClassName,
  }) => (
    <div className="flex items-center gap-2">
      <p className="text-grey text-sm font-semibold whitespace-nowrap">{label}</p>
      <Badge className={badgeClassName}>{value}</Badge>
    </div>
  );