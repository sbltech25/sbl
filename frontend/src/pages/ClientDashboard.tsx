
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, Send, Paperclip, Image, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isClient: boolean;
  timestamp: Date;
  attachments?: { name: string; type: string; url: string }[];
}

const ClientDashboard = () => {
  const [clientData, setClientData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your client dashboard! We are excited to work with you on your project. Please feel free to share any questions or requirements you may have.',
      isClient: false,
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('clientAuth');
    const storedClientData = localStorage.getItem('clientData');
    
    if (!isAuthenticated || !storedClientData) {
      navigate('/s/login');
      return;
    }
    
    setClientData(JSON.parse(storedClientData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('clientAuth');
    localStorage.removeItem('clientData');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/s/login');
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    
    const clientMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isClient: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, clientMessage]);
    setNewMessage('');

    // Simulate server response
    setTimeout(() => {
      const serverMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. Our team has received it and will respond shortly with detailed information.',
        isClient: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, serverMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!clientData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center space-x-4">
              <Link to="/">
                <img 
                  src="/uploads/91a86cb5-51d9-4ccb-a86e-e0d29f1d71e9.png" 
                  alt="Southern Basin Limited"
                  className="h-10 w-auto"
                />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-secondary">Client Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {clientData.username}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="rounded-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Project Overview */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-sm mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Project Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600 mb-2">Status: <span className="text-orange-600 font-medium">In Progress</span></p>
                    <p className="text-gray-600">Start Date: Jan 15, 2024</p>
                    <p className="text-gray-600">Est. Completion: Mar 30, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 hidden shadow-lg rounded-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start rounded-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start rounded-sm">
                    <Image className="h-4 w-4 mr-2" />
                    Project Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Communication Panel */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg rounded-sm h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Project Communication</CardTitle>
                <p className="text-sm text-gray-600">Direct communication with your project team</p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isClient ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.isClient
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.isClient ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg max-w-[80%]">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="resize-none rounded-sm"
                        rows={2}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-sm"
                        title="Attach File"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || isLoading}
                        size="sm"
                        className="bg-primary hover:bg-primary/90 rounded-sm"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
