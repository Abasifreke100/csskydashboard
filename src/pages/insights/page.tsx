import { SetStateAction, useEffect, useState } from "react";
import InsightDropdown from "../../components/dropdowns/insight-dropdown";
import { OverviewData } from "../../types";
import axiosInstance from "../../api/connectSurfApi";
import { formatTitle, icons, keysToDisplay } from "../../constants";
import InsightCardComponent from "../../components/reusables/insight-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { BsFillPeopleFill } from "react-icons/bs";
import { ChevronRight, MapPin } from "lucide-react";
import InsightPieChart from "../../components/charts/insight-chart";
import InsightLineChart from "../../components/charts/insight-line-chart";

const Insights = () => {
  const [selectedItem, setSelectedItem] = useState("This Year");
  const [isLoading, setIsLoading] = useState(false);
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
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
        const transformedData: Partial<OverviewData> = {};
        keysToDisplay.forEach((key) => {
          transformedData[key] = data[key] || 0;
        });

        setOverviewData(transformedData as OverviewData);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <div className="h-screen">
      <InsightDropdown
        selectedItem={selectedItem}
        handleMenuItemClick={handleMenuItemClick}
      />
      <div className="grid grid-cols-12  gap-5  mt-4">
        {!overviewData
          ? Array.from({ length: 5 }).map((_, idx) => (
              <InsightCardComponent
                key={idx}
                isLoading={isLoading}
                icon={icons[idx % icons.length]}
              />
            ))
          : keysToDisplay.map((key, idx) => (
              <InsightCardComponent
                key={idx}
                isLoading={isLoading}
                title={formatTitle(key)}
                value={overviewData[key as keyof OverviewData] ?? 0}
                icon={icons[idx % icons.length]}
              />
            ))}

        <Card className="col-span-12  lg:col-span-8 h-fit shadow-md">
          <CardHeader>
            <CardTitle className="text-md ">
              Verification Status Breakdown{" "}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[200px]">
              <InsightPieChart />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-4  shadow-md">
          <CardHeader className="px-0">
            <CardTitle className="text-sm px-0">
              <div className="flex items-center w-full px-0  justify-between">
                <p className="flex items-center text-sm font-semibold">
                  <MapPin className="h-3 text-[#808080]" />
                  Registrations by Region{" "}
                </p>
                <p className="flex items-center cursor-pointer">
                  See All <ChevronRight className="h-4" />
                </p>
              </div>
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent className="flex border-b py-2  items-center justify-between">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="text-xs font-medium">Rivers</p>
                <p className="text-xs text-grey flex items-center">
                  {" "}
                  <BsFillPeopleFill />
                  <span className="ml-2">22,000</span>
                </p>
              </div>
            </div>

            <p className="mr-3 text-[10px] font-medium text-[#000000E5]">1st</p>
          </CardContent>
        </Card>
        <Card className="col-span-12 mb-12 px-0 lg:col-span-12 shadow-md">
          <CardHeader>
            <CardTitle className="text-md ">Total Registrations </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="w-full h-[230px] md:h-[450px] pb-4">
              <InsightLineChart />
            </div>
          </CardContent>
        </Card>
        <div></div>
      </div>
    </div>
  );
};

export default Insights;
