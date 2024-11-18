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
import { Key, useEffect, useState } from "react";
import axiosInstance from "../../api/connectSurfApi";
import { ProfileInfo } from "../../components/profile-info";
import {
  getCorporateSections,
  getIndividualSections,
} from "../../utils/getSection";
import { formatDate } from "../../utils/formatDate";
import { getInitials } from "../../utils/getInitials";
import Header from "../../components/global/header";
import CustomImageView from "../../components/shared/CustomImageView";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleCheckBig, Upload, Zap } from "lucide-react";
import { Button } from "../../components/ui/button";
import CustomDialog from "../../components/shared/CustomDialog";
import VerifyUser from "./modal/VerifyUser";
import VerifySuccessModal from "./modal/VerifySuccessModal";
import ActivateUserModal from "./modal/ActivateUserModal";

const CustomersIdPage = () => {
  const { type, customerId } = useParams<{
    type: string;
    customerId: string;
  }>();
  const [verifyStatus, setVerifyStatus] = useState({
    verify: false,
    verifySuccess: false,
  });
  const [data, setData] = useState<Response | Corporate>();
  const [isLoading, setIsLoading] = useState(false);
  const [activateUser, setActivateUser] = useState(false);

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

  const sections =
    type === "individual"
      ? getIndividualSections(data as Response)
      : getCorporateSections(data as Corporate);

  const label =
    type === "individual"
      ? `${(data as Response)?.firstName ?? "N/A"} ${
          (data as Response)?.surName ?? "N/A"
        }`
      : (data as Corporate)?.companyName ?? "N/A";

  const verificationStatus =
    (data as Response)?.isNinVerified ||
    (data as Corporate)?.director?.isNinVerified
      ? "Verified"
      : "Pending";

  const documentType =
    (data as Response)?.documents?.documentType?.trim() ||
    (data as Corporate)?.documents?.type?.trim() ||
    "Not Provided";

  return (
    <div className="customersContainer  w-full">
      <div className="h-screen w-full">
        <div className="flex justify-between items-center">
          <Header title="Customer Profile" icon={true} />
          <div className="w-full  mt-5 lg:w-fit h-fit p-0 gap-3 flex justify-end ">
            <CustomDialog
              triggerComponent={
                <Button className="flex gap-2 bg-primary rounded-full">
                  <CircleCheckBig />
                  <span className="relative">Verify User </span>
                </Button>
              }
              open={verifyStatus.verify}
              onOpenChange={() =>
                setVerifyStatus((prevState) => ({
                  ...prevState,
                  verify: !prevState.verify,
                }))
              }
            >
              <VerifyUser
                onVerify={() =>
                  setVerifyStatus((prevState) => ({
                    ...prevState,
                    verify: false,
                  }))
                }
                type={type}
                data={data}
                verifyStatus={() =>
                  setVerifyStatus((prevState) => ({
                    ...prevState,
                    verifySuccess: true,
                  }))
                }
              />{" "}
            </CustomDialog>
            <Dialog
              open={verifyStatus.verifySuccess}
              onOpenChange={() =>
                setVerifyStatus((prevState) => ({
                  ...prevState,
                  verifySuccess: !prevState.verifySuccess,
                }))
              }
            >
              <DialogContent>
                <VerifySuccessModal
                  verifySuccessModal={() =>
                    setVerifyStatus((prevState) => ({
                      ...prevState,
                      verifySuccess: false,
                    }))
                  }
                />
              </DialogContent>
            </Dialog>
            <CustomDialog
              open={activateUser}
              onOpenChange={() => setActivateUser(!activateUser)}
              triggerComponent={
                <Button className="flex gap-2 bg-primary rounded-full">
                  <Zap />
                  <span className="relative">Activate User </span>
                </Button>
              }
            >
              <ActivateUserModal
                verifyStatus={() =>
                  setVerifyStatus((prevState) => ({
                    ...prevState,
                    verifySuccess: true,
                  }))
                }
                data={data}
                closeActivateUser={() => setActivateUser(false)}
              />
            </CustomDialog>

            <Button className="flex gap-2 rounded-full" variant="outline">
              <Upload />
              Export
            </Button>
          </div>
        </div>
        <div className="w-full mt-3 bg-white overflow-x-auto  rounded-2xl shadow-md">
          <div className="  px-4 w-fit lg:w-full gap-6 lg:gap-0 h-12 flex items-center justify-between">
            <ProfileInfo
              label={label}
              value={verificationStatus}
              badgeClassName=""
            />
            {(data as Corporate)?.registrationNumber && (
              <ProfileInfo
                label="Registration Type"
                value={(data as Corporate)?.registrationNumber}
                badgeClassName={`bg-grey whitespace-nowrap ${
                  isLoading ? "h-5 shimmer w-24" : ""
                } hover:bg-grey hover:text-white text-white rounded-md`}
              />
            )}
            <ProfileInfo
              label="Date Registered"
              value={
                formatDate((data as Response)?.createdAt) ||
                (data as Corporate)?.createdAt
              }
              badgeClassName={`bg-grey ${
                isLoading ? "h-5 shimmer w-24" : ""
              } hover:bg-grey hover:text-white text-white rounded-md`}
            />
            <ProfileInfo
              label="Date Verified"
              value={
                formatDate((data as Response)?.updatedAt) ||
                (data as Corporate)?.updatedAt
              }
              badgeClassName={`bg-grey ${
                isLoading ? "h-5 shimmer w-24" : ""
              } hover:bg-grey hover:text-white text-white rounded-md`}
            />
          </div>
        </div>

        {/* cards */}

        <div className="mt-6 grid grid-cols-12 gap-5 pb-5">
          {sections.map((section, index) => (
            <Card
              key={index}
              className={`col-span-12 ${
                section?.label == "Biodata" && "row-span-2 lg:row-span-3 "
              } ${
                section?.label == "Document" && type == "individual"
                  ? "row-span-2 col-span-12 lg:col-span-4"
                  : "md:col-span-6  lg:col-span-4"
              } 
              
              ${section.label == "Document" && type == "corporate" && "h-fit"}

              `}
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
                        isLoading && (idx as number) >= 1 ? " mt-6" : "mb-2"
                      }`}
                    >
                      {section.label === "Document" ||
                      section.label == "Image" ? (
                        ""
                      ) : isLoading ? (
                        <p className="text-grey h-3 rounded-lg w-36 shimmer text-sm"></p>
                      ) : (
                        <p className="text-grey  text-sm">{field.label}</p>
                      )}
                      {section.label === "Document" ? (
                        <div className="flex justify-between  flex-col  h-full order-last">
                          <p className="mb-2 text-sm">{documentType}</p>
                          <div
                            className={`w-3/4 border rounded-md overflow-hidden ${
                              isLoading ? "h-40" : "h-28"
                            }`}
                          >
                            <Dialog>
                              <DialogTrigger className="w-full h-full" asChild>
                                {isLoading ? (
                                  <div className="object-cover bg-gray-300 shimmer cursor-pointer w-full " />
                                ) : field.value ? (
                                  <img
                                    src={field.value as string}
                                    alt={field.label}
                                    className="object-cover order-last cursor-pointer flex-1 w-full h-full"
                                  />
                                ) : (
                                  <div className="object-cover bg-gray-300 text-black flex items-center justify-center text-2xl  cursor-pointer w-full h-full">
                                    {" "}
                                    {(data as Response)?.firstName &&
                                    (data as Response)?.surName
                                      ? getInitials(
                                          `${(data as Response)?.firstName} ${
                                            (data as Response)?.surName
                                          }`
                                        )
                                      : getInitials(
                                          `${(data as Corporate)?.companyName} `
                                        )}{" "}
                                  </div>
                                )}
                              </DialogTrigger>
                              {field.value && (
                                <DialogContent className="w-[90%] rounded-lg max-w-2xl px-4 h-[550px] lg:w-[600px] lg:h-[500px] p-4 overflow-hidden">
                                  <DialogHeader className="hidden">
                                    <DialogTitle>Image View</DialogTitle>
                                    <DialogDescription>
                                      Full image view
                                    </DialogDescription>
                                  </DialogHeader>
                                  <CustomImageView field={field} />
                                </DialogContent>
                              )}
                            </Dialog>
                          </div>
                        </div>
                      ) : section.label == "Image" ? (
                        <div className="flex justify-center ">
                          <div className="w-44 h-44 rounded-full overflow-hidden">
                            <Dialog>
                              <DialogTrigger asChild>
                                {isLoading ? (
                                  <div className="object-cover bg-gray-300 shimmer cursor-pointer w-full h-full" />
                                ) : field.value ? (
                                  <img
                                    src={field.value as string}
                                    alt={field.label}
                                    className="object-cover hover:scale-150 transition-transform duration-300 ease-in-out cursor-pointer w-full h-full"
                                  />
                                ) : (
                                  <div className="object-cover bg-gray-300 text-black flex items-center justify-center text-2xl  cursor-pointer w-full h-full">
                                    {" "}
                                    {(data as Response)?.firstName &&
                                    (data as Response)?.surName
                                      ? getInitials(
                                          `${(data as Response)?.firstName} ${
                                            (data as Response)?.surName
                                          }`
                                        )
                                      : getInitials(
                                          `${(data as Corporate)?.companyName} `
                                        )}
                                  </div>
                                )}
                              </DialogTrigger>
                              {field.value && (
                                <DialogContent className=" w-[350px] rounded-lg lg:w-[600px] max-h-[550px] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogDescription>
                                      <div className="gallery mt-2">
                                        <div className="pics relative overflow-hidden group rounded-md">
                                          <img
                                            src={field.value as string}
                                            alt={field.label}
                                            style={{ width: "100%" }}
                                            className="transition-transform duration-300 ease-in-out"
                                          />
                                        </div>
                                      </div>
                                    </DialogDescription>
                                  </DialogHeader>
                                </DialogContent>
                              )}
                            </Dialog>
                          </div>
                        </div>
                      ) : isLoading ? (
                        <p className="text-xs w-24 h-2 rounded-md shimmer mt-2 bg-gray-300 font-medium mb-3"></p>
                      ) : field.label == "Company Website" ? (
                        <a
                          className="text-xs font-medium mb-3 hover:text-primary hover:underline"
                          href={
                            typeof field.value === "string" &&
                            field.value.trim() !== ""
                              ? field.value.startsWith("http")
                                ? field.value
                                : `https://${field.value}`
                              : "about:blank"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {field.value}
                        </a>
                      ) : (
                        <p
                          className={`text-xs ${
                            field.label == "Email" ? " " : "capitalize"
                          } font-medium mb-3`}
                        >
                          {field.value}
                        </p>
                      )}
                    </div>
                  )
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
