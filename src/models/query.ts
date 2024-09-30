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
  static readonly GetSingleTicket = (ticketId: string) => [
    "single-ticket",
    ticketId,
  ];

  // Query key for fetching a ticket overview by user ID
  static readonly Get_Ticket_Overview = (userId: string) => [
    "ticket",
    "overview",
    userId,
  ];

    // New query key for fetching a specific ticket
  static readonly GetSpecificTicket = (ticketId: string) => [
    "specific-ticket",
    ticketId,
  ];
  
  // Notifications
  static readonly Get_Notifications = (page: number, size: number) => [
    "notifications",
    page,
    size,
  ];

  // Notification mutation keys
  static readonly Mark_Notification_As_Read = (notificationID: string) => [
    "notification",
    "read",
    notificationID,
  ];

  // Query key for fetching comments by task ID
  static readonly Get_Comments_By_TaskID = (taskID: string) => [
    "comments",
    "task",
    taskID,
  ];


}
