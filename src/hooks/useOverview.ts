// src/hooks/useTicketOverview.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/connectSurfApi";
import { QueryKeys } from "../models/query";
import { errorToast, successToast } from "../utils/toast";
import { useEffect } from "react";

// Fetch function to get ticket overview
const fetchTicketOverview = async (userId: string) => {
  const response = await axiosInstance.get(
    `/ticket/get/overview?userId=${userId}`
  );
  return response.data.data.data;
};

interface UseTicketOverviewProps {
  userId: string;
}

export const useTicketOverview = ({ userId }: UseTicketOverviewProps) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: QueryKeys.Get_Ticket_Overview(userId), 
    queryFn: () => fetchTicketOverview(userId), 
    enabled: !!userId,
    meta: {
      errCode: "TICKET_OVERVIEW_FETCH_ERROR", 
    },
  });

  // Effect to handle toasts based on success or error
  useEffect(() => {
    if (isSuccess) {
      successToast({
        title: "Overview Loaded",
        message: "Your ticket overview has been successfully loaded.",
      });
    }

    if (isError) {
      errorToast({
        title: "Fetch Error",
        message: `An error occurred while fetching the ticket overview: ${error?.message}`,
      });
    }
  }, [isSuccess, isError, error]); // Dependencies to trigger the effect

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
