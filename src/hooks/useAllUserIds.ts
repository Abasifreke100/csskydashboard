import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../models/query";
import { UserService } from "../service/user";

export const useFetchUserIds = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.Get_All_User_Ids],
    queryFn: () => UserService.getAllUserIds(),
    // refetchInterval: 300000,
  });
  return {
    data,
    isLoading,
  };
};
