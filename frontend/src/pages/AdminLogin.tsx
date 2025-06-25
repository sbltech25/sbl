
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, User, Lock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate IP restriction check and authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept admin/admin
      if (formData.username === 'admin' && formData.password === 'admin') {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminData', JSON.stringify({
          username: formData.username,
          loginTime: new Date().toISOString(),
          role: 'administrator'
        }));
        
        toast({
          title: "Secure Login Successful",
          description: "Welcome to the admin dashboard.",
        });
        
        navigate('/secured/v1/admin');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Access Denied",
        description: "Invalid credentials or unauthorized IP address.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                Administrator Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 rounded-sm border-gray-300"
                  placeholder="Admin username"
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
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Secure Login'}
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
