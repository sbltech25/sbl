
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, Plus, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  email: string;
  status: 'new' | 'in-progress' | 'completed';
  lastMessage: Date;
  unreadCount: number;
}

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<any>(null);
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Chevron Nigeria Ltd',
      email: 'project@chevron.com',
      status: 'in-progress',
      lastMessage: new Date(Date.now() - 3600000),
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Shell Petroleum',
      email: 'contracts@shell.com',
      status: 'completed',
      lastMessage: new Date(Date.now() - 86400000),
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Total Nigeria',
      email: 'projects@total.ng',
      status: 'new',
      lastMessage: new Date(Date.now() - 1800000),
      unreadCount: 3
    }
  ]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClientForm, setNewClientForm] = useState({ name: '', email: '' });
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    const storedAdminData = localStorage.getItem('adminData');
    
    if (!isAuthenticated || !storedAdminData) {
      navigate('/secured/v1/login');
      return;
    }
    
    setAdminData(JSON.parse(storedAdminData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminData');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/secured/v1/login');
  };

  const handleCreateClient = async () => {
    if (!newClientForm.name || !newClientForm.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Generate random username and password
    const username = newClientForm.name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);
    const password = Math.random().toString(36).slice(-8);

    try {
      // Simulate creating client and sending email
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newClient: Client = {
        id: Date.now().toString(),
        name: newClientForm.name,
        email: newClientForm.email,
        status: 'new',
        lastMessage: new Date(),
        unreadCount: 0
      };

      setClients(prev => [...prev, newClient]);
      setNewClientForm({ name: '', email: '' });
      setShowNewClientForm(false);

      toast({
        title: "Client Created Successfully",
        description: `Credentials sent to ${newClientForm.email}. Username: ${username}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create client account.",
        variant: "destructive",
      });
    }
  };

  const updateClientStatus = (clientId: string, status: 'new' | 'in-progress' | 'completed') => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, status } : client
    ));
    toast({
      title: "Status Updated",
      description: `Client status updated to ${status}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  if (!adminData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Secure Administrator Panel</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="rounded-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Secure Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client List */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Client Communications</CardTitle>
                  <Button
                    onClick={() => setShowNewClientForm(!showNewClientForm)}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 rounded-sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* New Client Form */}
                {showNewClientForm && (
                  <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-sm">
                    <h3 className="font-semibold text-sm">Create New Client</h3>
                    <Input
                      placeholder="Client Name"
                      value={newClientForm.name}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, name: e.target.value }))}
                      className="rounded-sm"
                    />
                    <Input
                      placeholder="Client Email"
                      type="email"
                      value={newClientForm.email}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, email: e.target.value }))}
                      className="rounded-sm"
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleCreateClient}
                        size="sm"
                        className="bg-primary hover:bg-primary/90 rounded-sm"
                      >
                        Create & Send Credentials
                      </Button>
                      <Button
                        onClick={() => setShowNewClientForm(false)}
                        variant="outline"
                        size="sm"
                        className="rounded-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Client List */}
                <div className="space-y-2">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-3 rounded-sm cursor-pointer border transition-colors ${
                        selectedClient?.id === client.id
                          ? 'bg-primary/10 border-primary'
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => setSelectedClient(client)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{client.name}</h3>
                        {client.unreadCount > 0 && (
                          <Badge variant="default" className="bg-red-500 text-white text-xs">
                            {client.unreadCount}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{client.email}</span>
                        <span>{client.lastMessage.toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <Badge className={`text-xs ${getStatusColor(client.status)} rounded-sm`}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(client.status)}
                            <span className="capitalize">{client.status}</span>
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-2">
            {selectedClient ? (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedClient.name}</CardTitle>
                      <p className="text-sm text-gray-600">{selectedClient.email}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => updateClientStatus(selectedClient.id, 'in-progress')}
                        variant="outline"
                        size="sm"
                        className="rounded-sm text-orange-600 border-orange-200"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        In Progress
                      </Button>
                      <Button
                        onClick={() => updateClientStatus(selectedClient.id, 'completed')}
                        variant="outline"
                        size="sm"
                        className="rounded-sm text-green-600 border-green-200"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a client to view and manage communications</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        className="flex-1 rounded-sm"
                      />
                      <Button className="bg-primary hover:bg-primary/90 rounded-sm">
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Select a Client</h3>
                  <p>Choose a client from the list to view and manage communications</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
