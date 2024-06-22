import Header from "../../components/global/header";
import { Card, CardContent } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import EditIcon from "../../lib/icons/edit-icon";
import LegalIcon from "../../lib/icons/legal-icon";
import HeadsetIcon from "../../lib/icons/headset-icon";
import { DocumentationIcon } from "../../lib/icons/document-icon";

const moreCard = [
  {
    icon: HeadsetIcon,
    title: "Support",
  },
  {
    icon: DocumentationIcon,
    title: "Documentation",
  },
  {
    icon: LegalIcon,
    title: "Legal",
  },
];

const handleCardClick = (title: string) => {
  if (title === "Documentation") {
    window.open("https://documenter.getpostman.com/view/7257932/2sA2r82Pmm", "_blank");
  }
};

const More = () => {
  return (
    <div className="md:h-screen mb-16 lg:mb-0">
      <Header title="More Options" />
      <div className="grid grid-cols-12 gap-5 mt-4">
        <Card className="col-span-12  h-44 flex py-4 items-center justify-center  md:col-span-6  lg:col-span-4  shadow-md">
          <CardContent className="flex flex-col  items-center justify-center">
            <Avatar className="w-14 h-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col mt-3 items-center">
              <p className="text-md font-medium  flex  items-center gap-3">
                My Profile{" "}
                <span className="text-grey">
                  <EditIcon />
                </span>
              </p>
              <Badge className="bg-[#FFFAEF] mt-2 hover:bg-[#FFFAEF] hover:text-primary hidden md:block text-[#FF7F00] ">
                Tier 3
              </Badge>
            </div>
          </CardContent>
        </Card>
        {moreCard.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className={`${card.title == "Documentation" && "cursor-pointer"}col-span-12 py-6  h-44 md:col-span-6   lg:col-span-4  shadow-md`}
              onClick={() => handleCardClick(card.title)}
            >
              <CardContent className="flex flex-col items-center justify-center mt-2">
                <div className="bg-[#FFF7EF] w-fit p-3 rounded-md flex items-center justify-center text-[#FF7F00]">
                  <Icon />
                </div>
                <p className="text-md font-semibold mt-5">{card.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default More;
