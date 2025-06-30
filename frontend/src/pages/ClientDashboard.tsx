
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LogOut, Send, Paperclip, FileText, CheckCircle, Clock, AlertCircle, Download, Calendar, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import useLogout from "../hooks/useLogout";
import useAuthUser from '@/hooks/useAuthUser';

interface Message {
  id: string;
  subject: string;
  text: string;
  isClient: boolean;
  timestamp: Date;
  attachments?: { name: string; type: string; url: string }[];
  isRead: boolean;
}

interface Project {
  id: string;
  name: string;
  code: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  startDate: Date;
  endDate: Date;
  description: string;
  ganttChart?: string;
  logReports: LogReport[];
}

interface LogReport {
  id: string;
  date: Date;
  projectCode: string;
  fileName: string;
  url: string;
}

interface GanttTask {
  task: string;
  month: string;
  completed: boolean;
}

const ClientDashboard = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      subject: 'Welcome to Your Project Dashboard',
      text: 'Welcome to your client dashboard! We are excited to work with you on your project. Please feel free to share any questions or requirements you may have.',
      isClient: false,
      timestamp: new Date(Date.now() - 3600000),
      isRead: false
    },
    {
      id: '2',
      subject: 'Project Status Update',
      text: 'Your offshore pipeline installation project is progressing well. We have completed the initial survey phase and are moving into the installation phase.',
      isClient: false,
      timestamp: new Date(Date.now() - 86400000),
      isRead: true,
      attachments: [{ name: 'survey_report.pdf', type: 'pdf', url: '#' }]
    }
  ]);
  
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Offshore Pipeline Installation',
      code: 'DRN.221',
      progress: 65,
      status: 'in-progress',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-30'),
      description: 'Installation of 20km offshore pipeline for enhanced oil recovery operations. This project involves comprehensive seabed preparation, pipeline laying, and connection to existing infrastructure.',
      ganttChart: 'gantt-chart-url',
      logReports: [
        {
          id: '1',
          date: new Date('2024-02-15'),
          projectCode: 'DRN.221',
          fileName: 'February 15, 2024 - DRN.221 Project Progress Report',
          url: '#'
        },
        {
          id: '2',
          date: new Date('2024-02-01'),
          projectCode: 'DRN.221',
          fileName: 'February 1, 2024 - DRN.221 Project Progress Report',
          url: '#'
        }
      ]
    },
    {
      id: '2',
      name: 'Platform Maintenance',
      code: 'PLT.445',
      progress: 100,
      status: 'completed',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2024-01-10'),
      description: 'Quarterly maintenance of offshore platform including structural integrity checks, equipment servicing, and safety system updates.',
      logReports: [
        {
          id: '3',
          date: new Date('2024-01-10'),
          projectCode: 'PLT.445',
          fileName: 'January 10, 2024 - PLT.445 Project Completion Report',
          url: '#'
        }
      ]
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { logoutMutation } = useLogout();
  const { authUser } = useAuthUser();
  const { toast } = useToast();

  const ganttTasks: GanttTask[] = [
    { task: 'Site Survey & Planning', month: 'January 2024', completed: true },
    { task: 'Pipeline Manufacturing', month: 'February 2024', completed: true },
    { task: 'Seabed Preparation', month: 'March 2024', completed: false },
    { task: 'Pipeline Installation', month: 'April 2024', completed: false },
    { task: 'Testing & Commissioning', month: 'May 2024', completed: false }
  ];

  const handleSendMessage = (messageId?: string) => {
    if (!newMessage.trim()) return;

    const clientMessage: Message = {
      id: Date.now().toString(),
      subject: messageId ? `Re: ${messages.find(m => m.id === messageId)?.subject}` : 'New Message',
      text: newMessage,
      isClient: true,
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [clientMessage, ...prev]);
    setNewMessage('');
    setReplyTo(null);

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-secondary">Client Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {authUser?.username}</p>
            </div>
            <Button onClick={logoutMutation} variant="outline" size="sm" className="rounded-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Left Column - Projects List (1/4) */}
          <div className="col-span-1">
            <Card className="border-0 shadow-lg rounded-sm">
              <CardHeader>
                <CardTitle className="text-lg">My Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-3 rounded-sm cursor-pointer border transition-colors ${
                        selectedProject?.id === project.id
                          ? 'bg-primary/10 border-primary'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <h3 className="font-semibold text-sm mb-2">{project.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">Code: {project.code}</p>
                      <Badge className={`text-xs ${getStatusColor(project.status)} rounded-sm`}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(project.status)}
                          <span className="capitalize">{project.status.replace('-', ' ')}</span>
                        </span>
                      </Badge>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-primary h-1 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Project Details (3/4) */}
          <div className="col-span-3">
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Header */}
                <Card className="border-0 shadow-lg rounded-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedProject.name}</CardTitle>
                        <p className="text-gray-600 mt-2">{selectedProject.description}</p>
                      </div>
                      <Badge className={`text-sm ${getStatusColor(selectedProject.status)} rounded-sm`}>
                        <span className="flex items-center space-x-2">
                          {getStatusIcon(selectedProject.status)}
                          <span className="capitalize">{selectedProject.status.replace('-', ' ')}</span>
                        </span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mt-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedProject.startDate.toLocaleDateString()} - {selectedProject.endDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Southern Basin Limited</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Gantt Chart */}
                <Card className="border-0 shadow-lg rounded-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ganttTasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className={`font-medium ${task.completed ? 'text-green-700' : 'text-gray-700'}`}>
                              {task.task}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{task.month}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Project Log Reports */}
                <Card className="border-0 shadow-lg rounded-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Progress Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedProject.logReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-red-600" />
                            <span className="font-medium">{report.fileName}</span>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Messages Section */}
                <Card className="border-0 shadow-lg rounded-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {messages.map((message) => (
                        <AccordionItem key={message.id} value={message.id}>
                          <AccordionTrigger 
                            className="hover:no-underline"
                            onClick={() => markAsRead(message.id)}
                          >
                            <div className="flex items-center justify-between w-full mr-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${message.isRead ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                                <span className={`font-medium ${!message.isRead ? 'font-bold' : ''}`}>
                                  {message.subject}
                                </span>
                                {message.attachments && (
                                  <Paperclip className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                              <span className="text-sm text-gray-500">
                                {message.timestamp.toLocaleDateString()}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-4">
                              <div className="bg-gray-50 p-4 rounded-sm mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">
                                    {message.isClient ? 'You' : 'Southern Basin Limited'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {message.timestamp.toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">{message.text}</p>
                                {message.attachments && (
                                  <div className="mt-3 space-y-2">
                                    {message.attachments.map((attachment, index) => (
                                      <div key={index} className="flex items-center space-x-2 text-sm">
                                        <Paperclip className="h-4 w-4" />
                                        <a href={attachment.url} className="text-primary hover:underline">
                                          {attachment.name}
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              
                              {/* Reply Section */}
                              <div className="space-y-3">
                                <Textarea
                                  placeholder="Type your reply..."
                                  value={replyTo === message.id ? newMessage : ''}
                                  onChange={(e) => {
                                    setNewMessage(e.target.value);
                                    setReplyTo(message.id);
                                  }}
                                  className="rounded-sm"
                                  rows={3}
                                />
                                <div className="flex space-x-2">
                                  <Button
                                    onClick={() => handleSendMessage(message.id)}
                                    disabled={!newMessage.trim() || replyTo !== message.id}
                                    size="sm"
                                    className="bg-primary hover:bg-primary/90 rounded-sm"
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Reply
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-sm"
                                  >
                                    <Paperclip className="h-4 w-4 mr-2" />
                                    Attach File
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Select a Project</h3>
                  <p>Choose a project from the list to view details and progress</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;