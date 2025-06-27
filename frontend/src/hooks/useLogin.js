import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useToast } from "@/hooks/use-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();         

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
