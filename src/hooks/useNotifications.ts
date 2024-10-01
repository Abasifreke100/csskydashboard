import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { QueryKeys } from "../models/query";
import { NotificationService } from "../service/notification";

// Define the structure of your Notification data
interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  file: string | null;
  status: string;
  dueDate: string;
  taskId: string;
  ticketID: string;
  author: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Assignee {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isTierRequest: boolean;
  tier: string;
  firstName: string;
  lastName: string;
}

export interface Notification {
  _id: string;
  title: string;
  type: string;
  channel: string;
  description: string;
  markAsRead: boolean;
  task: Task;
  assignee: Assignee;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Pagination {
  total: number;
  currentPage: number;
  size: number;
}

interface NotificationResponse {
  response: Notification[];
  pagination: Pagination;
}

interface UseNotificationsProps {
  page?: number;
  size?: number;
}

export const useNotifications = ({
  page = 1,
  size = 10,
}: UseNotificationsProps) => {
  const { data, isLoading, isSuccess, isError, error } =
    useQuery<NotificationResponse>({
      queryKey: QueryKeys.Get_Notifications(page, size),
      queryFn: () => NotificationService.getNotifications(page, size),
      meta: {
        errCode: "NOTIFICATIONS_FETCH_ERROR",
      },
    });

  useEffect(() => {
    if (isSuccess) {
      console.log("Notifications successfully loaded");
    }
    if (isError) {
      console.error(
        `An error occurred while fetching notifications: ${error?.message}`
      );
    }
  }, [isSuccess, isError, error]);

  return {
    data: data?.response,
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
  };
};

// New Hook to Mark All Notifications as Read
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => NotificationService.markNotificationAsRead(),
    onSuccess: () => {
       queryClient.invalidateQueries({
        queryKey: QueryKeys.Get_Notifications(1, 10), 
      });
    },
  });
};

export const useNotificationById = (notificationID: string) => {
  return useQuery({
    queryKey: ["notification", notificationID],
    queryFn: () => NotificationService.getNotificationById(notificationID),
    enabled: !!notificationID, // Only run the query if notificationID is provided
  });
};
