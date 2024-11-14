import ApexPieChart from "../../components/charts/apex-pie-chart";
import SharedLineChart from "../../components/shared/line-chart";
// import ComposedBarChart from "../../components/charts/composed-bar-chart"
import { Card, CardContent } from "../../components/ui/card";

const BillingInfoPage = () => {
  // Array containing user data
  const userData = [
    { type: "Active", count: 35000 },
    { type: "Expired", count: 40000 },
    { type: "Active", count: 25000 },
    { type: "Expired", count: 15000 },
    { type: "Active", count: 50000 },
    { type: "Expired", count: 30000 },
    { type: "Active", count: 60000 },
    { type: "Expired", count: 45000 },
    { type: "Active", count: 70000 },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 pb-16">
      <Card className="col-span-4">
        <CardContent className="h-80 flex items-center">
          <ApexPieChart />
        </CardContent>
      </Card>
      {/* <Card className="col-span-4">
        <CardContent className="h-80">
          <ComposedBarChart />
        </CardContent>
      </Card> */}
      <Card className="col-span-8">
        <CardContent className="h-80 p-4 grid grid-cols-3 gap-4">
          {userData.map((user, index) => (
            <div key={index} className="flex items-center gap-0.5 text-sm ml-1">
              <div
                className={`${
                  user.type === "Active" ? "bg-primary" : "bg-[#994C00]"
                } h-5 w-5 rounded-sm`}
              />
              <p className="font-medium">
                {user.type} Users{" "}
                <span className="font-semibold">
                  {user.count.toLocaleString()}
                </span>
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="col-span-12">
        <CardContent className="h-80">
          <p className="mt-2.5 text-end mb-1.5 font-medium">Online Sessions</p>
          <SharedLineChart />
        </CardContent>
      </Card>
      <Card className="col-span-12">
        <CardContent className="h-80">
          <p className="mt-2.5 text-end mb-1.5 font-medium">Online Users</p>
          <SharedLineChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingInfoPage;
