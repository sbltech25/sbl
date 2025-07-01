import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LogOut, Users, Plus, Mail, CheckCircle, Clock, AlertCircle, FileText, MessageSquare, Send, Calendar, BarChart3, Download, Paperclip } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import useAuthUser from '@/hooks/useAuthUser';
import useLogout from "../hooks/useLogout";
import { 
  getClientProjects,
  getProjectMessages,
  sendMessage,
  getProjectReports,
  getProjectGanttCharts,
  markMessageAsRead,
  getUnreadMessageCount
} from "../lib/api";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reports, setReports] = useState([]);
  const [ganttCharts, setGanttCharts] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  // Load projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await getClientProjects(authUser._id);
        setProjects(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        });
      }
    };
    loadProjects();
  }, [authUser._id]);

  // Load messages when project changes
  useEffect(() => {
    if (selectedProject) {
      const loadMessages = async () => {
        try {
          const { data } = await getProjectMessages(selectedProject._id);
          setMessages(data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load messages",
            variant: "destructive",
          });
        }
      };
      loadMessages();
    }
  }, [selectedProject]);

  // Load reports when project changes
  useEffect(() => {
    if (selectedProject) {
      const loadReports = async () => {
        try {
          const { data } = await getProjectReports(selectedProject._id);
          setReports(data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load reports",
            variant: "destructive",
          });
        }
      };
      loadReports();
    }
  }, [selectedProject]);

  // Load Gantt charts when project changes
  useEffect(() => {
    if (selectedProject) {
      const loadGanttCharts = async () => {
        try {
          const { data } = await getProjectGanttCharts(selectedProject._id);
          setGanttCharts(data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load Gantt charts",
            variant: "destructive",
          });
        }
      };
      loadGanttCharts();
    }
  }, [selectedProject]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectProject = async (project) => {
    setSelectedProject(project);
    try {
      const [
        { data: messages },
        { data: reports },
        { data: ganttCharts }
      ] = await Promise.all([
        getProjectMessages(project._id),
        getProjectReports(project._id),
        getProjectGanttCharts(project._id)
      ]);
      setMessages(messages);
      setReports(reports);
      setGanttCharts(ganttCharts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load project data",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    try {
    console.log(selectedProject?.clientId?._id)
    await sendMessage({
      subject: `Project Update: ${selectedProject.name}`,
      text: newMessage,
      receiverId: selectedProject?.clientId?._id, // Ensure this is just the ID string
      projectId: selectedProject?._id, // Ensure this is just the ID string
      attachment: attachment
    });
    setNewMessage('');
    setAttachment(null);
    // Refresh messages
    const { data } = await getProjectMessages(selectedProject._id);
    setMessages(data);
  } catch (error) {
    console.error('Failed to send message:', error);
    // Handle error
  }
};

  const handleMarkAsRead = async (messageId) => {
    try {
      await markMessageAsRead(messageId);
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, isRead: true } : msg
      ));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'in-progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'not-started': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-secondary">Client Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Welcome, {authUser.name}</p>
            </div>
            <Button 
              onClick={logoutMutation} 
              variant="outline" 
              size="sm" 
              className="rounded-sm"
              disabled={logoutMutation.isLoading}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">My Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className={`p-3 rounded-sm cursor-pointer border transition-colors ${
                        selectedProject?._id === project._id
                          ? 'bg-primary/10 border-primary dark:bg-primary/20'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => handleSelectProject(project)}
                    >
                      <h3 className="font-semibold text-sm mb-1">{project.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Code: {project.code}</p>
                      <div className="flex justify-between items-center">
                        <Badge className={`text-xs ${getStatusColor(project.status)} rounded-sm`}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(project.status)}
                            <span className="capitalize">{project?.status?.replace('-', ' ')}</span>
                          </span>
                        </Badge>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-3">
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Header */}
                <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedProject.name}</CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{selectedProject.description}</p>
                      </div>
                      <Badge className={`text-sm ${getStatusColor(selectedProject.status)} rounded-sm`}>
                        <span className="flex items-center space-x-2">
                          {getStatusIcon(selectedProject.status)}
                          <span className="capitalize">{selectedProject.status.replace('-', ' ')}</span>
                        </span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mt-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(selectedProject.startDate)} - {formatDate(selectedProject.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Southern Basin Limited</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Gantt Chart */}
                {ganttCharts.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Project Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ganttCharts[0].tasks.map((task, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-sm">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className={`font-medium ${task.completed ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                {task.task}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{task.month}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Reports */}
                {reports.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Project Progress Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {reports.map((report) => (
                          <div key={report._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-red-600 dark:text-red-300" />
                              <span className="font-medium">
                                {new Date(report.date).toLocaleDateString()} - {report.projectCode} Report
                              </span>
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
                )}

                {/* Messages Section - Email Style */}
                <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Communication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="max-h-96 overflow-y-auto space-y-4 pb-4">
                        {messages.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                            <p>No messages yet. Start the conversation!</p>
                          </div>
                        ) : (
                          messages.map((message) => (
                            <div
                              key={message._id}
                              className={`border rounded-sm p-4 ${
                                message.senderId._id === authUser._id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                              }`}
                              onClick={() => !message.isRead && handleMarkAsRead(message._id)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <p className="font-medium">
                                    {message.senderId._id === authUser._id ? 'You' : message.senderId.name}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    To: {message.receiverId._id === authUser._id ? 'You' : message.receiverId.name}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {!message.isRead && message.receiverId._id === authUser._id && (
                                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                  )}
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(message.createdAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="mb-2">
                                <p className="font-semibold">{message.subject}</p>
                              </div>
                              <div className="whitespace-pre-line mb-3">
                                {message.text}
                              </div>
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2">
                                  {message.attachments.map((attachment, index) => (
                                    <div key={index} className="flex items-center space-x-2 mt-1">
                                      <Paperclip className="h-4 w-4" />
                                      <a 
                                        href={attachment.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm underline hover:text-blue-600"
                                      >
                                        {attachment.name}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                      
                      <div className="border-t pt-4 dark:border-gray-700">
                        <div className="space-y-3">
                          <Input
                            placeholder="Subject"
                            value={`Project Update: ${selectedProject.name}`}
                            readOnly
                            className="rounded-sm bg-gray-100 dark:bg-gray-800"
                          />
                          <Textarea
                            placeholder="Type your message..."
                            className="rounded-sm"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={5}
                          />
                          {attachment && (
                            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-sm">
                              <div className="flex items-center space-x-2">
                                <Paperclip className="h-4 w-4" />
                                <span className="text-sm">{attachment.name}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setAttachment(null)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <label className="inline-flex items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    setAttachment(e.target.files[0]);
                                  }
                                }}
                              />
                              <Paperclip className="h-4 w-4 mr-2" />
                              <span className="text-sm">Attach File</span>
                            </label>
                            <Button
                              onClick={handleSendMessage}
                              disabled={!newMessage.trim() || isLoading}
                              className="bg-primary hover:bg-primary/90 rounded-sm"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              {isLoading ? 'Sending...' : 'Send Message'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex items-center justify-center dark:border dark:border-gray-700">
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