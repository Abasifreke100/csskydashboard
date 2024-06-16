import { ChevronRight, CircleAlert } from "lucide-react";
import CardComponent from "../components/reusables/card";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { MyLineChart } from "../components/charts/line-chart";
import ComposedBarChart from "../components/charts/composed-bar-chart";
import { useEffect, useState } from "react";
import axiosInstance from "../api/connectSurfApi";
import { formatTitle } from "../constants";
import GoToTop from "../utils/scroll-into-view";

const Home = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/overview");
        setIsLoading(false);
        setOverviewData(response.data.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchOverviewData();
  }, []);

  // if (!overviewData) {
  //   return <div className="h-screen">Loading...</div>;
  // }

  return (
    <div className="pb-7 h-screen customersContainer">
      <div className="grid grid-cols-12 gap-5">
        {!overviewData
          ? Array.from({ length: 8 }).map((_, idx) => (
              <CardComponent
                key={idx}
                isLoading={isLoading}
              />
            ))
          : Object.keys(overviewData).map((key, idx) => (
              <CardComponent
                key={idx}
                isLoading={isLoading}
                title={formatTitle(key)}
                value={overviewData[key]}
              />
            ))}
        <Card className="col-span-12 custom-md-col-span lg:col-span-4 row-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-md ">Total Registrations </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[200px]">
              <ComposedBarChart />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 custom-md-col-span row-span-2 lg:row-span-1 lg:col-span-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-md ">
              <div className="flex items-center justify-between">
                <p className="flex items-center">
                  Recent Activity <CircleAlert className="h-3" />
                </p>
                <p className="flex items-center">
                  See all <ChevronRight className="h-4" />
                </p>
              </div>
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent className="flex  items-center justify-between">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="ml-2">
                <p className="text-md font-medium">Obi Wankenobi</p>
                <p className="text-xs text-grey flex items-center">
                  {" "}
                  <BsFillPeopleFill />
                  <span className="ml-2">Personal</span>
                </p>
              </div>
            </div>

            <p className="mr-3 text-xs font-medium">1H Ago</p>
          </CardContent>
        </Card>
        <Card className="col-span-12 lg:col-span-12 shadow-md">
          <CardHeader>
            <CardTitle className="text-md ">Total Registrations </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full  h-[250px]">
              <MyLineChart />
            </div>
          </CardContent>
        </Card>
      </div>
      <GoToTop/>
    </div>
  );
};

export default Home;
