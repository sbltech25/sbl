import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alogin } from "../lib/api";
import { useToast } from "@/hooks/use-toast";
import {useNavigate} from 'react-router-dom'

const useLoginAdmin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();       
  const navigate = useNavigate()  

  const {
    mutate: loginMutation,
    isPending,
    error,                            
  } = useMutation({
    mutationFn: alogin,

    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      toast({
        title: "Login Successful",
        description: "Welcome to your admin dashboard.",
      });

      navigate('/secured/v1/admin')
    },

    onError: (err) => {
      toast({
        title: "Login Failed",
        description: err instanceof Error
            ? err.message
            : "Unable to verify this session.",
        variant: "destructive",
      });
    },
  });

  return { loginMutation, isPending, error };
};

export default useLoginAdmin;
