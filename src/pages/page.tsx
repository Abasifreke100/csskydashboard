import { Building2, ChevronRight, CircleAlert } from "lucide-react";
import CardComponent from "../components/reusables/card";
import { BsFillPeopleFill, BsPersonArmsUp } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import ComposedBarChart from "../components/charts/composed-bar-chart";
import { SetStateAction, useEffect, useState } from "react";
import axiosInstance from "../api/connectSurfApi";
import { formatTitle } from "../constants";
import GoToTop from "../utils/scroll-into-view";
import BarChartComponent from "../components/charts/stacked-bar-chart";
import { Chip } from "../utils/tab-chip";
import { OverviewData } from "../types";
import DropdownComponent from "../components/dropdowns/dropdown";
import { ValidPassportIcon } from "../lib/icons/valid-passport-icon";
import { Passport } from "../lib/icons/passport-icon";
import { PasswordExpired } from "../lib/icons/passport-expired-icon";
import { CoporateIcon } from "../lib/icons/coporate-icon";
import { PersonIcon } from "../lib/icons/person-icon";

const tabs = ["Coporate", "Individual"];
const tabIcons = [Building2, BsPersonArmsUp];
const Home = () => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(tabs[0]);
  const [selectedItem, setSelectedItem] = useState("My Account");

  const handleMenuItemClick = (item: SetStateAction<string>) => {
    setSelectedItem(item);
    // You can perform additional actions here if needed
  };

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/overview");
        setIsLoading(false);
        const data = response.data.data;
        const keysToDisplay: (keyof OverviewData)[] = [
          "totalIndividuals",
          "totalCorporates",
          "individualsToday",
          "corporatesToday",
          "corporatesThisMonth",
          "corporatesThisWeek",
          "individualsThisMonth",
          "individualsThisWeek",
        ];
        // Create transformedData based on keysToDisplay
        const transformedData: Partial<OverviewData> = {};
        keysToDisplay.forEach((key) => {
          transformedData[key] = data[key] || 0; // Assign 0 if the key doesn't exist in data
        });

        setOverviewData(transformedData as OverviewData);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchOverviewData();
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
  return (
    <div className="pb-7 h-screen customersContainer">
      <div className="grid grid-cols-12  gap-5 ">
        {!overviewData
          ? Array.from({ length: 5 }).map((_, idx) => (
              <CardComponent
                key={idx}
                isLoading={isLoading}
                icon={icons[idx % icons.length]}
              />
            ))
          : keysToDisplay.map((key, idx) => (
              <CardComponent
                key={idx}
                isLoading={isLoading}
                title={formatTitle(key)}
                value={overviewData[key as keyof OverviewData] ?? 0}
                icon={icons[idx % icons.length]} // Pass the icon based on idx
              />
            ))}
        <Card className="col-span-12  md:col-span-6  lg:col-span-4 row-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-md ">Total Registrations </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ComposedBarChart />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:h-[250px] row-span-2 lg:row-span-1 md:col-span-6 lg:col-span-8  shadow-md">
          <CardHeader>
            <CardTitle className="text-sm ">
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
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent className="flex  items-center justify-between">
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
        <Card className="col-span-12 mb-12 px-0 lg:col-span-12 shadow-md">
          <CardHeader>
            <CardTitle className="text-md ">Total Registrations </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="w-full h-[230px] md:h-[450px] pb-4">
              <div className="lg:px-6 overflow-hidden flex flex-col-reverse md:flex-row lg:items-center justify-between">
                <div className=" flex  whitespace-nowrap overflow-x-auto  flex-nowrap gap-2">
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
              <BarChartComponent />
            </div>
          </CardContent>
        </Card>
      </div>
      <GoToTop />
    </div>
  );
};

export default Home;
