import  { useEffect, useState } from "react";
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
import DropdownComponent from "../components/dropdowns/dropdown";
import { ValidPassportIcon } from "../lib/icons/valid-passport-icon";
import { Passport } from "../lib/icons/passport-icon";
import { PasswordExpired } from "../lib/icons/passport-expired-icon";
import { CoporateIcon } from "../lib/icons/coporate-icon";
import { PersonIcon } from "../lib/icons/person-icon";

const tabs = ["Coporate", "Individual"];
const tabIcons = [Building2, BsPersonArmsUp];

// Define a type for the transformed data
interface TransformedOverviewData {
  totalRegistrations: number;
  validRegistrations: number;
  invalidRegistrations: number;
  totalCorporates: number;
  totalIndividuals: number;
}

const Home = () => {
  const [dashboardOverview, setDashboardOverview] = useState<TransformedOverviewData | undefined>(undefined);
  const [corporateBarchart, setCorporateBarchart] = useState<Array<{ month: number; count: number }> | undefined>(undefined);
  const [individualBarchart, setIndividualBarchart] = useState<Array<{ month: number; count: number }> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(tabs[0]);
  const [selectedItem, setSelectedItem] = useState("Daily");

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
  };

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

  console.log("corporateBarChart ==>" , corporateBarchart)
  console.log("individualBarChart ==>" , individualBarchart)

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
                key={idx}
                isLoading={isLoading}
                title={formatTitle(key)}
                value={dashboardOverview[key as keyof TransformedOverviewData] ?? 0}
                icon={icons[idx % icons.length]}
                order={idx === keysToDisplay.length - 1 ? 6 : idx}
              />
            ))}

        <Card className="col-span-12  row-span-2 order-6 lg:order-5  lg:col-span-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-sm">
              <div className="flex items-center justify-between">
                <p className="flex items-center text-sm font-semibold">
                  Recent Registrations{" "}
                  <CircleAlert className="h-3 text-[#808080]" />
                </p>
                <p className="flex items-center cursor-pointer">
                  See All <ChevronRight className="h-4" />
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="ml-2">
                <p className="text-xs font-medium">Obi Wankenobi</p>
                <p className="text-xs text-grey flex items-center">
                  {" "}
                  <BsFillPeopleFill />
                  <span className="ml-2">Personal</span>
                </p>
              </div>
            </div>

            <p className="mr-3 text-[10px] font-medium text-[#000000E5]">
              1H Ago
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-12 mb-12 px-0 lg:col-span-12 shadow-md order-last">
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

                <div className="self-end">
                  <DropdownComponent
                    selectedItem={selectedItem}
                    handleMenuItemClick={handleMenuItemClick}
                  />
                </div>
              </div>
              <BarChartComponent
                data={selected === "Coporate" ? corporateBarchart ?? [] : individualBarchart ?? []}
              />            </div>
          </CardContent>
        </Card>
      </div>
      <GoToTop />
    </div>
  );
};

export default Home;
