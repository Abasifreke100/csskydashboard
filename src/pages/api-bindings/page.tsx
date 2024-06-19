import { ExternalLink } from "lucide-react";
import Header from "../../components/global/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/checkbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/ui/button";

const tableHeader = ["Endpoint", "Method", "Description"];

const ApiBindings = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const navigate = useNavigate();

  const data = {
    data: {
      response: [
        {
          _id: "1",
          endPoint: "/authenticate",
          method: "POST",
          description: "Authenticate user and obtain token",
        },
        // Add more task objects as needed
      ],
    },
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.data.response.map((cellData) => cellData._id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    task: { _id: string; endPoint: string; method: string; description: string }
  ) => {
    const checkboxClicked = (event.target as HTMLElement).closest(
      'input[type="checkbox"]'
    );

    if (!checkboxClicked) {
      navigate(`/tasks/${task?._id}`);
    }
  };

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  return (
    <div className="h-screen">
      <Header title="API Overview" />
      <div className="grid grid-cols-12 gap-5 mt-4">
        <Card className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-md">
              <div className="bg-[#FFF7EF] w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00]">
                <ExternalLink />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-xl">5</p>
            <p className="text-[#000000E5] text-xs font-poppins">
              Total Endpoints
            </p>
          </CardContent>
        </Card>
      </div>
      <p className="text-md text-grey mt-4 font-medium">
        Authentication:{" "}
        <span className="text-[#000000E5] ">OAuth2/API Key</span>
      </p>

      <div className="mt-8">
        <Header title="API Endpoints List" />
        <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border oveflow-hidden rounded-lg">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs uppercase bg-[#F5F5F7]">
              <tr className="font-medium border-b border-gray-200 text-muted-foreground">
                <th className="px-2 py-[9px] font-medium text-muted-foreground">
                  <Checkbox
                    id="select-all"
                    isChecked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                {tableHeader.map((header, idx) => (
                  <th
                    scope="col"
                    key={idx}
                    className={`whitespace-nowrap px-6 capitalize font-medium py-[9px] text-[#000000E5] text-sm text-start`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.data.response.map((task) => (
                <tr
                  key={task._id}
                  onClick={(event) => handleRowClick(event, task)}
                  className="border group border-b cursor-pointer transition-colors  hover:bg-muted/50 data-[state=selected]:bg-muted bg-white border-[#F5F5F7]"
                >
                  <td className="px-2 py-[9px]  flex items-center justify-center font-medium text-muted-foreground">
                    <Checkbox
                      id={`select-task-${task._id}`}
                      isChecked={selectedRows.includes(task._id)}
                      onChange={() => {
                        setSelectedRows((prevSelectedRows) =>
                           prevSelectedRows.includes(task._id)
                            ? prevSelectedRows.filter((id) => id !== task._id)
                            : [...prevSelectedRows, task._id]
                        );
                      }}
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-[9px]">
                    {task.endPoint}
                  </td>
                  <td className="whitespace-nowrap px-6 text-center py-[9px]">
                    {task.method}
                  </td>
                  <td className="whitespace-nowrap px-6 py-[9px]">
                    {task.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button className="mt-8 text-white transform transition-transform duration-200 ease-in-out hover:scale-105">
          <a
            target="_blank"
            href={baseURL}
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <span>Access API Documentation</span>
            <div className="bg-primary w-fit p-2 rounded-md flex items-center justify-center text-white">
              <ExternalLink />
            </div>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ApiBindings;
