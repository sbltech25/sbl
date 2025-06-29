import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LogOut, Send, Paperclip, Image, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import useLogout from "../hooks/useLogout";
import useAuthUser from '@/hooks/useAuthUser';

interface Message {
  id: string;
  text: string;
  isClient: boolean;
  timestamp: Date;
  attachments?: { name: string; type: string; url: string }[];
}

interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  startDate: Date;
  endDate: Date;
  description: string;
}

const ClientDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your client dashboard! We are excited to work with you on your project. Please feel free to share any questions or requirements you may have.',
      isClient: false,
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Offshore Pipeline Installation',
      progress: 65,
      status: 'in-progress',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-30'),
      description: 'Installation of 20km offshore pipeline'
    },
    {
      id: '2',
      name: 'Platform Maintenance',
      progress: 100,
      status: 'completed',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2024-01-10'),
      description: 'Quarterly maintenance of offshore platform'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { logoutMutation } = useLogout();
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'messages' | 'projects'>('messages');

 
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

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
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not-started': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

 
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-secondary">Client Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {authUser.username}</p>
            </div>
            <Button onClick={logoutMutation} variant="outline" size="sm" className="rounded-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'messages' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'projects' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
        </div>

        {activeTab === 'messages' ? (
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
                      disabled={!newMessage.trim()}
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="border-0 shadow-lg rounded-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${getStatusColor(project.status)} rounded-sm`}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(project.status)}
                        <span className="capitalize">{project.status.replace('-', ' ')}</span>
                      </span>
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {project.startDate.toLocaleDateString()} - {project.endDate.toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Project Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        project.progress < 30 ? 'bg-red-500' : 
                        project.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;