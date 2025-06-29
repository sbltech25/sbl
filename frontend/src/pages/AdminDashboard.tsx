import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, Plus, Mail, CheckCircle, Clock, AlertCircle, FileText, MessageSquare, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import useAuthUser from '@/hooks/useAuthUser';
import useLogout from "../hooks/useLogout";
import { Separator } from "@/components/ui/separator";
import {createClientAccount, getAll} from "../lib/api"

interface Client {
  id: string;
  name: string;
  fullName: string;
  email: string;
  status: 'new' | 'in-progress' | 'completed';
  lastMessage?: Date;
  unreadCount: number;
  projects: number;
}

interface Message {
  id: string;
  text: string;
  isAdmin: boolean;
  timestamp: Date;
}

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newClientForm, setNewClientForm] = useState({ name: '', email: '' });
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  useEffect(() => {
    handleAll()
  }, [])

  const handleAll = async () => {
    const res = await getAll()
    console.log(res.data)
    setClients(res.data.map((client: any) => ({
      ...client,
      status: 'new',
      unreadCount: 0,
      projects: 0,
    })))
  }

  const handleCreateClient = async () => {
    if (!newClientForm.name || !newClientForm.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    await createClientAccount(newClientForm)
    setShowNewClientForm(false)
    setNewClientForm({ name: '', email: '' })
    handleAll()
  };

  const updateClientStatus = (clientId: string, status: 'new' | 'in-progress' | 'completed') => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, status } : client
    ));
    if (selectedClient?.id === clientId) {
      setSelectedClient(prev => prev ? { ...prev, status } : null);
    }
    toast({
      title: "Status Updated",
      description: `Client status updated to ${status}.`,
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedClient) return;

    const adminMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isAdmin: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, adminMessage]);
    setNewMessage('');

    setTimeout(() => {
      const clientMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. We will review it and get back to you.',
        isAdmin: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, clientMessage]);
    }, 2000);
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

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure Administrator Panel</p>
              </div>
            </div>
            <Button onClick={logoutMutation} variant="outline" size="sm" className="rounded-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Secure Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Client Management</CardTitle>
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
                {showNewClientForm && (
                  <div className="space-y-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-sm">
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
                        Create Client
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

                <div className="space-y-2">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-3 rounded-sm cursor-pointer border transition-colors ${
                        selectedClient?.id === client.id
                          ? 'bg-primary/10 border-primary'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => {
                        setSelectedClient(client);
                        setMessages([]);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{client?.fullName}</h3>
                        {client.unreadCount > 0 && (
                          <Badge variant="default" className="bg-red-500 text-white text-xs">
                            {client.unreadCount}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>{client.email}</span>
                        <span>{client.lastMessage ? client.lastMessage.toLocaleDateString() : 'No messages'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <Badge className={`text-xs ${getStatusColor(client.status)} rounded-sm`}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(client.status)}
                            <span className="capitalize">{client.status}</span>
                          </span>
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {client.projects} {client.projects === 1 ? 'project' : 'projects'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedClient ? (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedClient.fullName}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedClient.email}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => updateClientStatus(selectedClient.id, 'in-progress')}
                        variant="outline"
                        size="sm"
                        className={`rounded-sm ${
                          selectedClient.status === 'in-progress' 
                            ? 'bg-orange-100 text-orange-800 border-orange-200' 
                            : 'border-gray-200'
                        }`}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        In Progress
                      </Button>
                      <Button
                        onClick={() => updateClientStatus(selectedClient.id, 'completed')}
                        variant="outline"
                        size="sm"
                        className={`rounded-sm ${
                          selectedClient.status === 'completed' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'border-gray-200'
                        }`}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                    {messages.length > 0 ? (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg ${
                              message.isAdmin
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-2 ${message.isAdmin ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No messages yet. Start the conversation with {selectedClient.name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        className="flex-1 rounded-sm"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-primary hover:bg-primary/90 rounded-sm"
                      >
                        <Send className="h-4 w-4" />
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
                  <p>Choose a client from the list to view details and communicate</p>
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