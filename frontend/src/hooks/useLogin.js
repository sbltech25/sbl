import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useToast } from "@/hooks/use-toast";
import {useNavigate} from 'react-router-dom'

const useLogin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();       
  const navigate = useNavigate()  

  const {
    mutate: loginMutation,
    isPending,
    error,                            
  } = useMutation({
    mutationFn: login,

    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      toast({
        title: "Login Successful",
        description: "Welcome to your client dashboard.",
      });

      navigate('/s/client/dashboard')
    },

    onError: (err) => {
      toast({
        title: "Login Failed",
        description: err instanceof Error
            ? err.message
            : "Invalid username or password.",
        variant: "destructive",
      });
    },
  });

  return { loginMutation, isPending, error };
};

export default useLogin;
