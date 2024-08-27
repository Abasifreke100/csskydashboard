// src/hooks/useTasks.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/connectSurfApi";
import { QueryKeys } from "../models/query";
import { TaskService } from "../service/task";
import { errorToast, successToast } from "../utils/toast";

const fetchTasks = async (currentPage: number, itemsPerPage: number) => {
  const response = await axiosInstance.get(
    `/task?currentPage=${currentPage}&size=${itemsPerPage}`
  );
  return response.data.data.response;
};

export const useTasks = (currentPage: number, itemsPerPage: number) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: QueryKeys.Get_Tasks(currentPage, itemsPerPage),
    queryFn: () => fetchTasks(currentPage, itemsPerPage),
    meta: {
      errCode: "TASKS_FETCH_ERROR", // Example error code, adjust as needed
    },
  });

  if (isSuccess) {
    successToast({
      title: "Tasks Loaded",
      message: "Your tasks have been successfully loaded.",
    });
  }

  if (isError) {
    errorToast({
      title: "Fetch Error",
      message: `An error occurred while fetching tasks: ${error?.message}`,
    });
  }

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

interface UseFetchTaskProps {
  taskID: string;
}

export const useFetchTask = ({ taskID }: UseFetchTaskProps) => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: QueryKeys.Get_Single_Task(taskID),
    queryFn: () => TaskService.getTaskById(taskID),
    enabled: !!taskID, // Ensure taskID is provided before making the query
  });

  if (isSuccess) {
    successToast({
      title: "Task Data Loaded",
      message: "Task details have been successfully loaded.",
    });
  }

  if (isError) {
    errorToast({
      title: "Fetch Error",
      message: "An error occurred while fetching task data. Please try again.",
    });
  }

  return {
    data,
    isLoading,
  };
};
