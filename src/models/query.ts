export class QueryKeys {
  // Auth
  static readonly SignUp_User = ["user", "signup"];

  // Query key for fetching a list of tasks
  static readonly Get_Tasks = (currentPage: number, itemsPerPage: number) => [
    "tasks",
    currentPage,
    itemsPerPage,
  ];

  // Query key for fetching a single task
  static readonly Get_Single_Task = (taskID: string) => [
    "task",
    "single",
    taskID,
  ];

  static readonly Get_All_Users = ["users", "all"];

  static readonly Get_All_User_Ids = ["userIds"];

  static readonly Get_Tickets = (status: string) => ["Get Tickets", status];

  // Query key for fetching a ticket overview by user ID
  static readonly Get_Ticket_Overview = (userId: string) => [
    "ticket",
    "overview",
    userId,
  ];
}
