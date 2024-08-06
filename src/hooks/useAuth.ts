import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUser } from "../api/api";
import { ApiResponse } from "@/types/types";

export const AUTH = "auth";

const useAuth = (opts = {}): UseQueryResult<ApiResponse> => {
  return useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });
};
export default useAuth;
