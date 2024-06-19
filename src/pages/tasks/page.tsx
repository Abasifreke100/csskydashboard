import { Wifi } from "lucide-react";
import Header from "../../components/global/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/checkbox";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Total Tasks",
    value: 200,
  },
  {
    title: "Open Tasks",
    value: 20,
  },
  {
    title: "In Progress",
    value: 8,
  },
  {
    title: "Closed Tasks",
    value: 10,
  },
];

const tableHeader = [
  "Task ID",
  "Title",
  "Priority",
  "Status",
  "Due Date",
  "Assignee",
];

type Status = "Closed" | "In Progress" | "Open";
const Tasks = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const renderCellContent = (status: Status): JSX.Element => {
    let badgeBgColor = "";

    if (status === "Closed") {
      badgeBgColor = "bg-lightGreen hover:bg-lightGreen text-deepGreen";
    } else if (status === "In Progress") {
      badgeBgColor = "bg-secondary hover:bg-secondary text-primary";
    } else if (status === "Open") {
      badgeBgColor = "bg-lightRed hover:bg-lightRed text-deepRed";
    }

    return <Badge className={badgeBgColor}>{status}</Badge>;
  };

  const navigate = useNavigate();

  const data = {
    data: {
      response: [
        {
          _id: "1",
          taskID: "00123",
          title: "Update Docs",
          priority: "High",
          status: "Closed",
          dueDate: "2024-06-20",
          assignee: "John Doe",
          email: "johndoe@gmail.com",
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
    task: {
      _id: string;
      taskID: string;
      title: string;
      priority: string;
      status: string;
      dueDate: string;
      assignee: string;
      email: string;
    }
  ) => {
    const checkboxClicked = (event.target as HTMLElement).closest(
      'input[type="checkbox"]'
    );

    if (!checkboxClicked) {
      navigate(`/tasks/${task?._id}`);
    }
  };

  return (
    <div className="h-screen">
      <Header title="Task Overview" />
      <div className="grid grid-cols-12 gap-5 mt-4">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-md">
                <div className="bg-[#FFF7EF] w-fit p-2 rounded-md flex items-center justify-center text-[#FF7F00]">
                  <Wifi />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-xl">{card.value}</p>
              <p className="text-[#000000E5] text-xs font-poppins">
                {card.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Header title="Task List" />
        <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border overflow-hidden rounded-lg">
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
                    {task.taskID}
                  </td>
                  <td className="whitespace-nowrap px-6 py-[9px]">
                    {task.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-[9px]">
                    {task.priority}
                  </td>
                  <td className="whitespace-nowrap px-6 py-[9px]">
                    {(task.status &&
                      renderCellContent(task?.status as "Closed")) ||
                      "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-[9px]">
                    {task.dueDate}
                  </td>
                  <td className="whitespace-nowrap  flex items-center gap-1 px-6 py-[9px]">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://github.com/shadcn.png" alt="" />
                      <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
                      <p className="text-xs text-black font-medium group-hover:text-grey">
                        {task.assignee}
                      </p>
                      <p className="text-[10px] text-grey">{task.email}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;

{
  /* <td className="px-2 py-2">
<Checkbox
  id={cellData._id}
  isChecked={selectedRows.includes(cellData._id)}
  onChange={(id, isChecked) => {
    // Toggle selection
    if (isChecked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) =>
        prev.filter((item) => item !== id)
      );
    }
  }}
/>
</td> */
}
