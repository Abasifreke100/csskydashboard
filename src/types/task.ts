export interface Welcome {
  success: boolean;
  data: Data;
  message: string;
}

export interface Data {
  response: Response[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  currentPage: number;
  size: number;
}

export interface CommentResponse {
  _id: string;
  message: string;
  task: TaskResponse;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface TaskResponse {
  _id: string;
  title: string;
  description: string;
  priority: string;
  file: string;
  dueDate: string;
  taskId: string;
  author: string;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface User {
  _id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  tier: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ViewOneTaskDataResponse {
  _id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  taskId: string;
  author: Assignee;
  file?: File | null;
  assignee: Assignee;
  ticketID?: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  status: string;
}

export interface Assignee {
  _id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  firstName: string;
  isTierRequest: boolean;
  lastName: string;
  tier: string;
}
