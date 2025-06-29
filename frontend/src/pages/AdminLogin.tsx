import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, User, Lock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import useLoginAdmin from '../hooks/useLoginAdmin';
import PageLoader from '@/components/layout/PageLoader';

interface AdminLoginForm {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const {loginMutation} =useLoginAdmin()
  const [formData, setFormData] = useState<AdminLoginForm>({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: login, isPending } = useLoginAdmin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      await loginMutation(formData);
  };

  if (isPending) return <PageLoader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900/20 to-gray-900/20 px-4 pt-20">
      <Card className="w-full max-w-md border-0 shadow-2xl rounded-sm bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Secure Admin Access</CardTitle>
          <p className="text-gray-600">Restricted IP Access Only</p>
        </CardHeader>
        
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-sm p-3 mb-6">
            <p className="text-sm text-red-800">
              <strong>Security Notice:</strong> This area is restricted to authorized personnel only. 
              All access attempts are monitored and logged.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 rounded-sm border-gray-300"
                  placeholder="Admin email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 rounded-sm border-gray-300"
                  placeholder="Secure password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-sm"
              disabled={isPending}
            >
              {isPending ? 'Authenticating...' : 'Secure Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              For security purposes, only pre-authorized IP addresses can access this system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;