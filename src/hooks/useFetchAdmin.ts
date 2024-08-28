import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/connectSurfApi";
import { QueryKeys } from "../models/query";
import { errorToast, successToast } from "../utils/toast";

// Define a function to fetch users
const fetchAllUsers = async (currentPage: number , itemsPerPage: number) => {
  const response = await axiosInstance.get(`/user/all?currentPage=${currentPage}&size=${itemsPerPage}`);
  return response.data;
};

// Define the custom hook
export const useFetchUsers = (currentPage: number, itemsPerPage: number) => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: QueryKeys.Get_All_Users,
    queryFn: () => fetchAllUsers(currentPage, itemsPerPage),
  });

  if (isSuccess) {
    successToast({
      title: "Users Data Loaded",
      message: "User details have been successfully loaded.",
    });
  }

  if (isError) {
    errorToast({
      title: "Fetch Error",
      message: "An error occurred while fetching user data. Please try again.",
    });
  }
  return {
    data,
    isLoading,
  };
};

export const upgradeUserToAdmin = async (userId: string, tier: string) => {
  const response = await axiosInstance.post(`/user/upgrade/admin/${userId}`, {
    tier,
  });
  return response.data;
};
