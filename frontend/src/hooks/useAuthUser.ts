import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

type User = {
  id: string;
  fullName: string;
  email: string;
  username: string;
};

type AuthUserResponse = {
  user: User;
};


const useAuthUser = () => {
  const authUser = useQuery<AuthUserResponse>({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};
export default useAuthUser;