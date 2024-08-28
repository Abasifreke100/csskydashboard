import { useEffect, useState } from "react";
import { Building2, ChevronRight, CircleAlert } from "lucide-react";
import { BsFillPeopleFill, BsPersonArmsUp } from "react-icons/bs";
import CardComponent from "../components/reusables/card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import axiosInstance from "../api/connectSurfApi";
import { formatTitle } from "../constants";
import GoToTop from "../utils/scroll-into-view";
import BarChartComponent from "../components/charts/stacked-bar-chart";
import { Chip } from "../utils/tab-chip";
import { ValidPassportIcon } from "../lib/icons/valid-passport-icon";
import { Passport } from "../lib/icons/passport-icon";
import { PasswordExpired } from "../lib/icons/passport-expired-icon";
import { CoporateIcon } from "../lib/icons/coporate-icon";
import { PersonIcon } from "../lib/icons/person-icon";
import { useNavigate } from "react-router-dom";
import { Corporate, Response, TransformedOverviewData } from "../types";
import { getInitials } from "../utils/getInitials";
import { formatRelativeTime } from "../utils/readableDateFormat";
import { renderSkeletonLoader } from "../skeleton/recent-registrations";
import { errorToast, successToast } from "../utils/toast";

const tabs = ["Corporate", "Individual"];
const tabIcons = [Building2, BsPersonArmsUp];

// Define a type for the transformed data
const Home = () => {
  const [dashboardOverview, setDashboardOverview] = useState<
    TransformedOverviewData | undefined
  >(undefined);
  const [corporateBarchart, setCorporateBarchart] = useState<
    Array<{ month: number; count: number }> | undefined
  >(undefined);
  const [individualBarchart, setIndividualBarchart] = useState<
    Array<{ month: number; count: number }> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(tabs[0]);
  const [combinedRegistrationData, setCombinedRegistrationData] = useState<
    Array<Response | Corporate>
  >([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/dashboard");
        setIsLoading(false);
        const data = response.data.data;

        // Transform data to match keysToDisplay
        const transformedData: TransformedOverviewData = {
          totalRegistrations: data.totalRegistration || 0,
          validRegistrations: data.totalVerified || 0,
          invalidRegistrations: data.totalInvalid || 0,
          totalCorporates: data.corporates || 0,
          totalIndividuals: data.individuals || 0,
        };

        setDashboardOverview(transformedData);
        setCorporateBarchart(data.corporateBarchart || []);
        setIndividualBarchart(data.individualBarchart || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [corporateResponse, individualResponse] = await Promise.all([
          axiosInstance.get<{ data: { response: Corporate[] } }>("/corporate"),
          axiosInstance.get<{ data: { response: Response[] } }>("/individual"),
        ]);

        const corporateData = corporateResponse.data.data.response
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 2);

        const individualData = individualResponse.data.data.response
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 2);

        setCombinedRegistrationData([...corporateData, ...individualData]);
        successToast({
          title: "Data fetched successfully",
          message: "Your recent registrations have been successfully loaded.",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        errorToast({
          title: "Fetch Error",
          message: "An error occurred while fetching data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const icons = [
    Passport,
    ValidPassportIcon,
    PasswordExpired,
    CoporateIcon,
    PersonIcon,
  ];

  const keysToDisplay = [
    "totalRegistrations",
    "validRegistrations",
    "invalidRegistrations",
    "totalCorporates",
    "totalIndividuals",
  ];

  const navigate = useNavigate();

  const handleItemClick = (item: Response | Corporate) => {
    const isCorporate = (item as Corporate).registrationNumber !== undefined;
    const route = isCorporate
      ? `/customers/corporate/${item._id}`
      : `/customers/individual/${item._id}`;
    navigate(route);
  };
  return (
    <div className="pb-7 md:h-screen customersContainer">
      <div className="grid grid-cols-12 gap-5">
        {!dashboardOverview
          ? Array.from({ length: 5 }).map((_, idx) => (
              <CardComponent
                key={idx}
                isLoading={isLoading}
                icon={icons[idx % icons.length]}
                order={idx === keysToDisplay.length - 1 ? 6 : idx}
              />
            ))
          : keysToDisplay.map((key, idx) => (
              <CardComponent
                key={key}
                isLoading={isLoading}
                title={formatTitle(key) ?? "..."}
                value={
                  dashboardOverview[key as keyof TransformedOverviewData] ?? 0
                }
                icon={icons[idx % icons.length]}
                order={idx === keysToDisplay.length - 1 ? 6 : idx}
              />
            ))}

        <Card
          className={`col-span-12 h-full  row-span-2 order-6 lg:order-5  lg:col-span-8 shadow-md`}
        >
          <CardHeader>
            <CardTitle className="text-sm">
              <div className="flex items-center justify-between">
                <p className="flex items-center text-sm font-semibold">
                  Recent Registrations{" "}
                  <CircleAlert className="h-3 text-[#808080]" />
                </p>
                <button
                  className="flex items-center cursor-pointer"
                  onClick={() => navigate("/customers/individual")}
                >
                  See All <ChevronRight className="h-4" />
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2  h-[270px] overflow-y-auto ">
            {isLoading ? (
              renderSkeletonLoader()
            ) : combinedRegistrationData?.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">No recent registrations</p>
              </div>
            ) : (
              combinedRegistrationData.map((item) => (
                <button
                  className="flex items-center justify-between mb-4  w-full  group cursor-pointer  px-2 rounded-md py-1 hover:bg-white data-[state=selected]:bg-muted"
                  key={item._id}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-start">
                    <Avatar className="w-10 h-10 group-hover:bg-gray-300">
                      <AvatarImage
                        src={
                          (item as Response)?.biometrics?.selfie
                            ? (item as Response)?.biometrics?.selfie
                            : (item as Corporate)?.bioMetrics?.selfie
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {(item as Response)?.firstName &&
                        (item as Response)?.surName
                          ? getInitials(
                              `${(item as Response)?.firstName} ${
                                (item as Response)?.surName
                              }`
                            )
                          : getInitials(`${(item as Corporate)?.companyName} `)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-2 text-start">
                      {!(item as Corporate).registrationNumber ? (
                        <div className="">
                          <p className="text-xs text-black font-medium group-hover:text-grey">{`${
                            (item as Response)?.title
                          } ${(item as Response)?.firstName} ${(
                            item as Response
                          ).surName?.substring(0, 10)}`}</p>
                          <p className="text-xs text-grey ">
                            {(item as Response).email?.substring(0, 20)}...
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-black font-medium group-hover:text-grey">{`${
                            (item as Corporate).companyName?.length > 20
                              ? (item as Corporate).companyName?.substring(
                                  0,
                                  20
                                ) + "..."
                              : (item as Corporate).companyName
                          }`}</p>
                          <p className="text-[10px] text-grey">
                            {(item as Corporate).companyWebsite}...
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-grey flex items-center">
                        <BsFillPeopleFill />
                        <span className="ml-2">
                          {(item as Response)?.isNinVerified ||
                          (item as Corporate)?.director?.isNinVerified
                            ? "Verified"
                            : "Pending"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="mr-3 text-xs font-medium text-[#000000E5]">
                    {formatRelativeTime((item as Response)?.createdAt) ||
                      (item as Corporate)?.createdAt}
                  </p>
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="col-span-12 mb-12  px-0 lg:col-span-12 shadow-md order-last">
          <CardHeader>
            <CardTitle className="text-md">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent className="px-0 w-full">
            <div className="w-full px-0 h-[360px] md:h-[450px] pb-10 pr-4">
              <div className="lg:px-6 overflow-hidden flex flex-col-reverse md:flex-row lg:items-center justify-between">
                <div className="flex whitespace-nowrap overflow-x-auto flex-nowrap gap-2">
                  {tabs.map((tab, idx) => (
                    <Chip
                      text={tab}
                      selected={selected === tab}
                      setSelected={setSelected}
                      key={tab}
                      icon={tabIcons[idx]}
                    />
                  ))}
                </div>

                {/* <div className="self-end">
                  <DropdownComponent
                    selectedItem={selectedItem}
                    handleMenuItemClick={handleMenuItemClick}
                  />
                </div> */}
              </div>
              <BarChartComponent
                data={
                  selected === "Corporate"
                    ? corporateBarchart ?? []
                    : individualBarchart ?? []
                }
              />{" "}
            </div>
          </CardContent>
        </Card>
      </div>
      <GoToTop />
    </div>
  );
};

export default Home;
