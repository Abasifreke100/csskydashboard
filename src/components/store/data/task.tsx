import { Badge } from "../../../components/ui/badge";

export const taskTableHeaders = [
  "Task ID",
  "Title",
  "Priority",
  "Status",
  "Due Date",
  "Assignee",
];

export const sampleTaskCardsData = [
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

type Status = "Closed" | "In Progress" | "pending" | "Open";

export const renderCellContent = (status: Status): JSX.Element => {
  let badgeBgColor = "";

  if (status === "Closed") {
    badgeBgColor =
      "bg-lightGreen capitalize hover:bg-lightGreen text-deepGreen";
  } else if (status === "In Progress" || status === "pending") {
    badgeBgColor = "bg-secondary capitalize hover:bg-secondary text-primary";
  } else if (status === "Open") {
    badgeBgColor = "bg-lightRed capitalize hover:bg-lightRed text-deepRed";
  }

  return <Badge className={badgeBgColor}>{status}</Badge>;
};

export const sampleData = [
  {
    id: "TASK123456",
    subject: "Issue with login",
    description:
      "The primary objective of this task is to update and refine our project documentation to ensure accuracy, clarity, and completeness. This includes revising existing content, adding new sections where necessary, and ensuring that all information is up-to-date and easy to understand.",
    priority: "High",
    status: "Pending",
    dueDate: "2/10/2023",
    lastUpdated: "12/10/2023",
    assignee: {
      name: "John Doe",
      avatar: "https://example.com/john-doe.jpg",
      comments: "initial report on login issue",
    },
  },
];
