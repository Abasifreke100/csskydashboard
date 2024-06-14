import { MoveLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { Badge } from "../../components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ProfileInfoProps } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { cardData } from "../../constants";

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  label,
  value,
  badgeClassName,
}) => (
  <div className="flex items-center gap-2">
    <p className="text-grey text-sm font-semibold whitespace-nowrap">{label}</p>
    <Badge className={badgeClassName}>{value}</Badge>
  </div>
);

const CustomersIdPage = () => {
  const { customerId } = useParams();

  console.log(customerId);

  const isPdfFile = (url: string) => url.endsWith(".pdf");

  return (
    <div className="customersContainer  w-full">
      <div className="h-screen w-full">
        <p
          className="flex items-center gap-3 mt-3 text-xl font-semibold cursor-pointer"
          onClick={() => window.history.back()}
        >
          <MoveLeft /> Customer Profile
        </p>
        <div className="w-full overflow-x-auto">
          <div className="mt-3  bg-white px-4 w-fit lg:w-full gap-6 lg:gap-0 rounded-2xl shadow-md h-14 flex items-center justify-between">
            <ProfileInfo
              label="John Doe"
              value="Verified"
              badgeClassName="bg-lightGreen text-deepGreen"
            />
            <ProfileInfo
              label="Registration Type"
              value="00123"
              badgeClassName="bg-grey text-white rounded-md"
            />
            <ProfileInfo
              label="Date Registered"
              value="10/10/2023"
              badgeClassName="bg-grey text-white rounded-md"
            />
            <ProfileInfo
              label="Date Verified"
              value="12/10/2023"
              badgeClassName="bg-grey text-white rounded-md"
            />
          </div>
        </div>

        {/* cards */}

        <div className="mt-6 grid grid-cols-12 gap-5 pb-5">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className={`col-span-12 md:col-span-6 lg:col-span-4 ${
                index > 2 && "h-fit"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-md">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {card.content
                  ? card.content.map((detail, detailIndex) => (
                      <div key={detailIndex} className="mb-2">
                        <p className="text-grey text-sm">{detail.detailName}</p>
                        {isPdfFile(detail.detailInfo) ? (
                          <>
                            <p className="text-xs font-medium mb-3">
                              {" "}
                              {detail.detailDescription || detail.detailName}
                            </p>
                            <iframe
                              src={detail.detailInfo}
                              width="100%"
                              height="100px"
                              title={
                                detail.detailDescription || detail.detailName
                              }
                            />
                          </>
                        ) : (
                          <span className="text-xs font-medium">
                            {" "}
                            {detail.detailInfo}
                          </span>
                        )}
                      </div>
                    ))
                  : card.image && (
                      <div className="flex justify-center">
                        <div className="w-44 h-44 rounded-full overflow-hidden">
                          <Dialog >
                            <DialogTrigger asChild>
                              <img
                                src={card.image}
                                alt={card.title}
                                className="object-cover cursor-pointer w-full h-full"
                              />
                            </DialogTrigger>
                            <DialogContent className=" w-[380px] lg:w-[600px]">
                              <DialogHeader>
                                <DialogDescription>
                                  <img
                                    src={card.image}
                                    alt={card.title}
                                    className="object-cover w-full mt-4 h-full"
                                  />
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomersIdPage;
