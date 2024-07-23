
interface Filter {
  label: string;
  value: string;
}


export const ticketTableHeaders = [
    "Ticket ID",
    "Subject",
    "Priority",
    "Status",
    "Created On",
    "Assignee",
  ];
  


  export const filters: Filter[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Onhold", value: "onhold" },
    { label: "Closed", value: "closed" },
    { label: "Overdue", value: "overdue" },
    // Add more filters here if needed
  ];