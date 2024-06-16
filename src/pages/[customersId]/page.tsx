import { MoveLeft } from "lucide-react";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Corporate, FieldValue, Response } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Key,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../../api/connectSurfApi";
import { ProfileInfo } from "../../components/profile-info";
import {
  getCorporateSections,
  getIndividualSections,
} from "../../utils/getSection";

const CustomersIdPage = () => {
  const { type, customerId } = useParams<{
    type: string;
    customerId: string;
  }>();
  const [data, setData] = useState<Response | Corporate>();
  const [isLoading, setIsLoading] = useState(false);
  // const isPdfFile = (url: string) => url.endsWith(".pdf");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/${type}/${customerId}`);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (type === "corporate" || type === "individual") {
      fetchData();
    }
  }, [type, customerId]);

  console.log("customers personal details", data);

  const sections =
    type === "individual"
      ? getIndividualSections(data as Response)
      : getCorporateSections(data as Corporate);

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
          {/* {Object.entries(data ?? {})?.map(([key, value]) => ( */}
          {sections.map((section, index) => (
            <Card
              key={index}
              className={`col-span-12 md:col-span-6 ${
                index == 3 && "h-fit"
              } lg:col-span-4`}
            >
              <CardHeader>
                <CardTitle className="text-md capitalize">
                  {section.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.fields.map(
                  (
                    field: {
                      label: string;
                      value: FieldValue;
                    },
                    idx: Key | null | undefined
                  ) => (
                    <div
                      key={idx}
                      className={` ${
                        isLoading && (idx as number) >= 1 ? " mt-8" : "mb-2"
                      }`}
                    >
                      {section.label === "Image" ? (
                        ""
                      ) : isLoading ? (
                        <p className="text-grey h-3 rounded-lg w-36 shimmer text-sm"></p>
                      ) : (
                        <p className="text-grey text-sm">{field.label}</p>
                      )}
                      {section.label === "Image" ? (
                        <div className="flex justify-center">
                          <div className="w-44 h-44 rounded-full overflow-hidden">
                            <Dialog>
                              <DialogTrigger asChild>
                                {isLoading ? (
                                  <div className="object-cover bg-gray-300 shimmer cursor-pointer w-full h-full" />
                                ) : (
                                  <img
                                    src={field.value as string}
                                    alt={field.label}
                                    className="object-cover  cursor-pointer w-full h-full"
                                  />
                                )}
                              </DialogTrigger>
                              <DialogContent className=" w-[380px] lg:w-[600px]">
                                <DialogHeader>
                                  <DialogDescription>
                                    <img
                                      src={field.value as string}
                                      alt={field.label}
                                      className="object-cover w-full mt-4 h-full"
                                    />
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      ) : isLoading ? (
                        <p className="text-xs w-24 h-2 rounded-md shimmer mt-2 bg-gray-300 font-medium mb-3"></p>
                      ) : (
                        <p className="text-xs font-medium mb-3">
                          {field.value}
                        </p>
                      )}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          ))}
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default CustomersIdPage;
