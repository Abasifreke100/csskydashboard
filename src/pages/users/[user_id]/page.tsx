import { CircleCheckBig, Upload } from "lucide-react";
import Header from "../../../components/global/header";
import { ProfileInfo } from "../../../components/profile-info";
import {
  profileFields,
  staticSections,
} from "../../../components/store/data/user";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { getInitials } from "../../../utils/getInitials";

const UserIdPage = () => {
  const isLoading = false;
  return (
    <>
      <div className="flex justify-between items-center">
        {" "}
        <Header title="User Profile" icon={true} />
        <div className="w-full  mt-4  lg:w-fit h-fit p-0 gap-3 flex justify-end ">
          <Button variant="outline" className="flex gap-2 rounded-full">
            <CircleCheckBig />
            <span className="relative">
              {isLoading ? "Verifying..." : ` Verify`}
            </span>
          </Button>
          <Button className="flex gap-2 rounded-full" variant="outline">
            <Upload />
            Export
          </Button>
        </div>
      </div>
      <div className="w-full mt-3 bg-white overflow-x-auto rounded-2xl shadow-md">
        <div className="px-4 w-fit lg:w-full gap-6 lg:gap-0 h-12 flex items-center justify-between">
          {profileFields.map((field, index) => (
            <ProfileInfo
              key={index}
              label={field.label}
              value={field.value}
              badgeClassName={field.badgeClassName}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-5 pb-5">
        {staticSections.map((section, index) => (
          <Card
            key={index}
            className={`col-span-4 ${
              section.label == "Current Plan"
                ? "row-span-1 bg-[#fffaef] h-fit"
                : "row-span-2"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-md capitalize">
                {section.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {section.fields.map((field, idx) => (
                <div
                  key={idx}
                  className={`${isLoading && idx >= 1 ? "mt-6" : "mb-2"}`}
                >
                  <p className="text-gray-400">{field.label}</p>
                  {section.label === "Image" ? (
                    <div className="flex justify-center">
                      <div className="w-44 h-44 rounded-full overflow-hidden">
                        <Dialog>
                          <DialogTrigger asChild>
                            {isLoading ? (
                              <div className="object-cover bg-gray-300 shimmer cursor-pointer w-full h-full" />
                            ) : field.value ? (
                              <img
                                src={field.value}
                                alt={field.label}
                                className="object-cover hover:scale-150 transition-transform duration-300 ease-in-out cursor-pointer w-full h-full"
                              />
                            ) : (
                              <div className="object-cover bg-gray-300 text-black flex items-center justify-center text-2xl cursor-pointer w-full h-full">
                                {getInitials(`N`)}
                              </div>
                            )}
                          </DialogTrigger>
                          {field.value && (
                            <DialogContent className="w-[350px] rounded-lg lg:w-[600px] max-h-[550px] overflow-y-auto">
                              <DialogHeader>
                                <DialogDescription>
                                  <div className="gallery mt-2">
                                    <div className="pics relative overflow-hidden group rounded-md">
                                      <img
                                        src={field.value}
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
                  ) : field.label === "Company Website" ? (
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
                      className={`text-sm ${
                        field.label === "Email" ? "" : "capitalize"
                      } font-medium mb-3`}
                    >
                      {field.value}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default UserIdPage;
