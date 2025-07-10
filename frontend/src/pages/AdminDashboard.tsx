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
import {
  LogOut, Users, Plus, Mail, CheckCircle, Clock, AlertCircle,
  FileText, MessageSquare, Send, Calendar, BarChart3, Download,
  Paperclip, Loader2, PauseCircle, ChevronDown, ChevronUp, ArrowRight,
  XIcon, Eye
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import useAuthUser from '@/hooks/useAuthUser';
import useLogout from "../hooks/useLogout";
import {
  createClientAccount,
  getAllClients,
  createProject,
  getClientProjects,
  createProjectReport,
  createGanttChart,
  sendMessage,
  getProjectMessages,
  updateClientStatus,
  updateProjectStatus,
  getProjectReports,
  getProjectGanttCharts,
  downloadReport,
  updateTaskStatus,
  uploadMessageAttachment
} from "../lib/api";

const AdminDashboard = () => {
  // State declarations
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [clientProjects, setClientProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reports, setReports] = useState([]);
  const [ganttCharts, setGanttCharts] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newClientForm, setNewClientForm] = useState({ name: '', email: '' });
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [showGanttForm, setShowGanttForm] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);
  const [subjectSuffix, setSubjectSuffix] = useState("");
  const [loading, setLoading] = useState({
    clients: false,
    projects: false,
    messages: false,
    reports: false,
    ganttCharts: false,
    sending: false
  });
  const [attachments, setAttachments] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    code: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const [ganttForm, setGanttForm] = useState({
    projectTitle: '',
    tasks: [{ task: '', month: '', status: 'not-started' }]
  });

  const [logForm, setLogForm] = useState({
    date: new Date().toISOString().split('T')[0],
    project: '',
    team: 'Southern Basin Limited',
    tasks: '',
    progress: '',
    challenges: '',
    actionTaken: '',
    helpNeeded: '',
    nextSteps: '',
    feedback: '',
    conclusion: ''
  });

  const subjectPrefix = "Subject: ";

  // Refs
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'not-started': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'paused': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'not-started': return <AlertCircle className="h-4 w-4" />;
      case 'paused': return <PauseCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'not-started': return 'bg-gray-200 text-gray-800';
      case 'in-progress': return 'bg-blue-200 text-blue-800';
      case 'paused': return 'bg-yellow-200 text-yellow-800';
      case 'completed': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case 'not-started': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'paused': return <PauseCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = files.filter(file => {
      const validTypes = [
        'image/jpeg', 'image/png', 'image/webp', 'image/gif',
        'video/mp4', 'video/quicktime', 'video/x-msvideo',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      const maxSize = 50 * 1024 * 1024; // 50MB

      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} has an unsupported file type`,
          variant: "destructive",
        });
        return false;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds the 50MB size limit`,
          variant: "destructive",
        });
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    setAttachments(prev => [...prev, ...validFiles]);

    // Create preview URLs for images and videos only
    const newPreviewUrls = validFiles
      .filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'))
      .map(file => URL.createObjectURL(file));

    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    const removedFile = newAttachments.splice(index, 1)[0];

    // If it was an image/video, find and revoke the corresponding URL
    if (removedFile.type.startsWith('image/') || removedFile.type.startsWith('video/')) {
      const urlIndex = previewUrls.findIndex(url => 
        url.includes(removedFile.name.split('.')[0])
      );
      if (urlIndex !== -1) {
        const newPreviewUrls = [...previewUrls];
        URL.revokeObjectURL(newPreviewUrls[urlIndex]);
        newPreviewUrls.splice(urlIndex, 1);
        setPreviewUrls(newPreviewUrls);
      }
    }

    setAttachments(newAttachments);
  };

  const openPreview = (index) => {
    setCurrentPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleSendMessage = async (e) => {
  e.preventDefault();

  if (!newMessage.trim() || !selectedProject || !selectedClient) {
    toast({
      title: "Error",
      description: "Please enter a message",
      variant: "destructive",
    });
    return;
  }

  setLoading(prev => ({ ...prev, sending: true }));

  try {
    // Upload all attachments first
    const uploadPromises = attachments.map(file => 
      uploadMessageAttachment(file)
        .then(res => res?.success ? res.file : null)
        .catch(error => {
          console.error(`Failed to upload ${file.name}:`, error);
          return null;
        })
    );

    const uploadedFiles = await Promise.all(uploadPromises);
    const successfulUploads = uploadedFiles.filter(Boolean);

    if (attachments.length > 0 && successfulUploads.length === 0) {
      throw new Error("Failed to upload all attachments");
    }

    // Prepare the message data with properly structured attachments
    const messageData = {
      subject: subjectPrefix + subjectSuffix,
      text: newMessage,
      receiverId: selectedClient._id,
      projectId: selectedProject._id,
      attachments: successfulUploads.map(file => ({
        url: file.url,
        publicId: file.publicId,
        type: file.type,
        name: file.name,
        mimeType: file.mimeType
      }))
    };

    const response = await sendMessage(messageData);

    if (!response.success) {
      throw new Error(response.message || 'Failed to send message');
    }

    // Refresh messages
    const { data } = await getProjectMessages(selectedProject._id);
    setMessages(data);

    // Reset form
    setNewMessage('');
    setSubjectSuffix('');
    setAttachments([]);
    setPreviewUrls([]);

    // Revoke all preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));

    toast({
      title: "Success",
      description: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    toast({
      title: "Error",
      description: error.message || "Failed to send message. Please try again.",
      variant: "destructive",
    });
  } finally {
    setLoading(prev => ({ ...prev, sending: false }));
  }
};

  // Data fetching functions
  const fetchClients = async () => {
    try {
      setLoading(prev => ({ ...prev, clients: true }));
      const { data } = await getAllClients();
      setClients(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load clients",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, clients: false }));
    }
  };

  const handleLoadClientProjects = async (clientId) => {
    try {
      setLoading(prev => ({ ...prev, projects: true }));
      const { data } = await getClientProjects(clientId);
      setClientProjects(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const handleSelectClient = async (client) => {
    setSelectedClient(client);
    setSelectedProject(null);
    setMessages([]);
    setReports([]);
    setGanttCharts([]);
    await handleLoadClientProjects(client._id);
  };

  const handleSelectProject = async (project) => {
    setSelectedProject(project);
  };

  const loadProjectData = async () => {
    if (!selectedProject) return;

    try {
      setLoading(prev => ({ ...prev, messages: true, reports: true, ganttCharts: true }));
      const [
        { data: messages },
        { data: reports },
        { data: ganttCharts }
      ] = await Promise.all([
        getProjectMessages(selectedProject._id),
        getProjectReports(selectedProject._id),
        getProjectGanttCharts(selectedProject._id)
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
    } finally {
      setLoading(prev => ({ ...prev, messages: false, reports: false, ganttCharts: false }));
    }
  };

  // CRUD operations
  const handleCreateClient = async () => {
    if (!newClientForm.name || !newClientForm.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(prev => ({ ...prev, sending: true }));
      await createClientAccount(newClientForm);
      const { data } = await getAllClients();
      setClients(data);
      setShowNewClientForm(false);
      setNewClientForm({ name: '', email: '' });
      toast({
        title: "Success",
        description: "Client created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create client",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, sending: false }));
    }
  };

  const handleCreateProject = async () => {
    if (!selectedClient || !newProjectForm.name || !newProjectForm.code) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(prev => ({ ...prev, sending: true }));
      await createProject({
        ...newProjectForm,
        clientId: selectedClient?._id,
        budget: parseFloat(newProjectForm.budget) || 0
      });
      const { data } = await getClientProjects(selectedClient?._id);
      setClientProjects(data);
      setShowNewProjectForm(false);
      setNewProjectForm({
        name: '',
        code: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: ''
      });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, sending: false }));
    }
  };

  const handleCreateGanttChart = async () => {
    if (!selectedProject || !ganttForm.projectTitle || ganttForm.tasks.some(t => !t.task || !t.month)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(prev => ({ ...prev, sending: true }));
      await createGanttChart({
        projectId: selectedProject._id,
        title: ganttForm.projectTitle,
        tasks: ganttForm.tasks
      });
      setShowGanttForm(false);
      setGanttForm({ projectTitle: '', tasks: [{ task: '', month: '', status: 'not-started' }] });

      const { data } = await getProjectGanttCharts(selectedProject._id);
      setGanttCharts(data);

      toast({
        title: "Success",
        description: "Gantt chart created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create Gantt chart",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, sending: false }));
    }
  };

  const handleCreateLogReport = async () => {
    if (!selectedProject) {
      toast({
        title: "Error",
        description: "Please select a project first",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(prev => ({ ...prev, sending: true }));
      await createProjectReport({
        projectId: selectedProject._id,
        projectCode: selectedProject.code,
        ...logForm
      });
      setShowLogForm(false);
      setLogForm({
        date: new Date().toISOString().split('T')[0],
        project: selectedProject.name,
        team: 'Southern Basin Limited',
        tasks: '',
        progress: '',
        challenges: '',
        actionTaken: '',
        helpNeeded: '',
        nextSteps: '',
        feedback: '',
        conclusion: ''
      });

      const { data } = await getProjectReports(selectedProject._id);
      setReports(data);

      toast({
        title: "Success",
        description: "Report created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create report",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, sending: false }));
    }
  };

  const handleDownloadReport = async (reportId) => {
    try {
      const response = await downloadReport(reportId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report",
        variant: "destructive",
      });
    }
  };

  const handleTaskStatusChange = async (ganttId, taskId, status) => {
    try {
      setLoading(prev => ({ ...prev, sending: true }));
      await updateTaskStatus(ganttId, taskId, status);
      const { data } = await getProjectGanttCharts(selectedProject._id);
      setGanttCharts(data);
      toast({
        title: "Success",
        description: "Task status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, sending: false }));
    }
  };

  const addGanttTask = () => {
    setGanttForm(prev => ({
      ...prev,
      tasks: [...prev.tasks, { task: '', month: '', status: 'not-started' }]
    }));
  };

  const updateGanttTask = (index, field, value) => {
    setGanttForm(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) =>
        i === index ? { ...task, [field]: value } : task
      )
    }));
  };

  const handleStatusChange = async (clientId, status) => {
    try {
      await updateClientStatus(clientId, status);
      setClients(prev => prev.map(c =>
        c._id === clientId ? { ...c, status } : c
      ));
      if (selectedClient?._id === clientId) {
        setSelectedClient(prev => ({ ...prev, status }));
      }
      toast({
        title: "Success",
        description: "Client status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleProjectStatusChange = async (projectId, status) => {
    try {
      await updateProjectStatus(projectId, status);
      setClientProjects(prev => prev.map(p =>
        p._id === projectId ? { ...p, status } : p
      ));
      if (selectedProject?._id === projectId) {
        setSelectedProject(prev => ({ ...prev, status }));
      }
      toast({
        title: "Success",
        description: "Project status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project status",
        variant: "destructive",
      });
    }
  };

  // Loading skeletons
  const ClientSkeleton = () => (
    <div className="p-3 rounded-sm bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );

  const ProjectSkeleton = () => (
    <div className="p-3 rounded-sm bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );

  const MessageSkeleton = () => (
    <div className="border rounded-sm p-4 bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );

  const ReportSkeleton = () => (
    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-sm animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
      <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );

  const GanttSkeleton = () => (
    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-sm animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );

  // Effects
  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadProjectData();
    }
  }, [selectedProject]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900">
                <Users className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome, {authUser?.name}</p>
              </div>
            </div>
            <Button
              onClick={logoutMutation}
              variant="outline"
              size="sm"
              className="rounded-sm"
              disabled={logoutMutation.isLoading}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {logoutMutation.isLoading ? 'Logging out...' : 'Secure Logout'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Client Management - Collapsible */}
            <Accordion type="single" collapsible defaultValue="clients">
              <AccordionItem value="clients">
                <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
                  <CardHeader className="p-0">
                    <AccordionTrigger className="hover:no-underline px-6 py-4">
                      <div className="flex items-center justify-between w-full">
                        <CardTitle className="text-lg">Client Management</CardTitle>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowNewClientForm(!showNewClientForm);
                          }}
                          size="sm"
                          className="bg-primary hover:bg-primary/90 rounded-sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent>
                    <CardContent>
                      {/* New Client Form */}
                      {showNewClientForm && (
                        <div className="space-y-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700">
                          <h3 className="font-semibold text-sm">Create New Client</h3>
                          <Input
                            placeholder="Client Name"
                            value={newClientForm.name}
                            onChange={(e) => setNewClientForm({ ...newClientForm, name: e.target.value })}
                            className="rounded-sm"
                          />
                          <Input
                            placeholder="Client Email"
                            type="email"
                            value={newClientForm.email}
                            onChange={(e) => setNewClientForm({ ...newClientForm, email: e.target.value })}
                            className="rounded-sm"
                          />
                          <div className="flex space-x-2">
                            <Button
                              onClick={handleCreateClient}
                              size="sm"
                              className="bg-primary hover:bg-primary/90 rounded-sm"
                              disabled={loading.sending}
                            >
                              {loading.sending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : 'Create Client'}
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
                        {loading.clients ? (
                          <>
                            <ClientSkeleton />
                            <ClientSkeleton />
                            <ClientSkeleton />
                          </>
                        ) : clients.length > 0 ? (
                          clients.map((client) => (
                            <div
                              key={client._id}
                              className={`p-3 rounded-sm cursor-pointer border transition-colors ${
                                selectedClient?._id === client._id
                                  ? 'bg-primary/10 border-primary dark:bg-primary/20'
                                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                              }`}
                              onClick={() => handleSelectClient(client)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-sm">{client.name}</h3>
                                {client.unreadCount > 0 && (
                                  <Badge variant="default" className="bg-red-500 text-white text-xs">
                                    {client.unreadCount}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                <span>{client.email}</span>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                <div className="flex space-x-1">
                                  <Badge
                                    className={`text-xs ${getStatusColor(client.status)} rounded-sm cursor-pointer`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newStatus =
                                        client.status === 'new' ? 'in-progress' :
                                        client.status === 'in-progress' ? 'completed' : 'new';
                                      handleStatusChange(client._id, newStatus);
                                    }}
                                  >
                                    <span className="flex items-center space-x-1">
                                      {getStatusIcon(client.status)}
                                      <span className="capitalize">{client?.status?.replace('-', ' ')}</span>
                                    </span>
                                  </Badge>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {client.projects} {client.projects === 1 ? 'project' : 'projects'}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            <Users className="h-6 w-6 mx-auto mb-2" />
                            <p>No clients found</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            </Accordion>

            {/* Projects List - Only shown when client is selected */}
            {selectedClient && (
              <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Projects</CardTitle>
                    <Button
                      onClick={() => setShowNewProjectForm(true)}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 rounded-sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    {loading.projects ? (
                      <>
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                      </>
                    ) : clientProjects.length > 0 ? (
                      clientProjects.map((project) => (
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
                            <Badge
                              className={`hidden text-xs ${getStatusColor(project.status)} rounded-sm cursor-pointer`}
                              onClick={(e) => {
                                e.stopPropagation();
                                const newStatus =
                                  project.status === 'not-started' ? 'in-progress' :
                                  project.status === 'in-progress' ? 'paused' :
                                  project.status === 'paused' ? 'completed' : 'not-started';
                                handleProjectStatusChange(project._id, newStatus);
                              }}
                            >
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
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <FileText className="h-6 w-6 mx-auto mb-2" />
                        <p>No projects found</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content Area */}
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
                      <Badge className={`hidden text-sm ${getStatusColor(selectedProject.status)} rounded-sm`}>
                        <span className="flex items-center space-x-2">
                          {getStatusIcon(selectedProject.status)}
                          <span className="capitalize">{selectedProject?.status?.replace('-', ' ')}</span>
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
                        <span>Client: {selectedClient?.name}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Communication Section */}
                <Accordion type="single">
                  <AccordionItem value="communication">
                    <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
                      <CardHeader className="p-0">
                        <AccordionTrigger className="hover:no-underline px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">Project Communication</CardTitle>
                          </div>
                        </AccordionTrigger>
                      </CardHeader>
                      <AccordionContent>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Message List */}
                              <div ref={messagesEndRef} />
                            <div className="max-h-96 overflow-y-auto space-y-4 pb-4">
                              {loading.messages ? (
                                <>
                                  <MessageSkeleton />
                                  <MessageSkeleton />
                                </>
                              ) : messages.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                  <Mail className="h-8 w-8 mx-auto mb-2" />
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
                                  >
                                    {/* Message Header */}
                                    <div className="flex justify-between items-start mb-4">
                                      <div className="flex w-full items-center p-2 justify-between">
                                        <p className="font-medium flex items-center">
                                          {message?.senderId?._id === authUser?._id ? 'You' : message?.senderId?.name}
                                          <ArrowRight className="h-4 w-4 mx-2 text-gray-500" />
                                          {message?.senderId?._id !== authUser?._id ? 'You' : message?.receiverId?.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          {formatDateTime(message.createdAt)}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Message Subject */}
                                    <div className="mb-4">
                                      <p className="font-semibold text-lg">{message.subject}</p>
                                    </div>

                                    {/* Message Body */}
                                    <div className="whitespace-pre-line mb-4 border-t pt-4 dark:border-gray-700">
                                      {message.text}
                                    </div>

                                    {/* Attachments */}
                                    {message.attachments && message.attachments.length > 0 && (
                                      <div className="mt-4 pt-4 border-t dark:border-gray-700">
                                        <p className="text-sm font-medium mb-2">Attachments:</p>
                                        <div className="grid grid-cols-3 gap-2">
                                          {message.attachments.map((attachment, index) => (
                                            <div key={index} className="relative group border rounded-sm p-2">
                                              <div className="flex items-center space-x-2">
                                                {attachment.type === 'image' ? (
                                                  <img
                                                    src={attachment.url}
                                                    alt={attachment.name}
                                                    className="h-10 w-10 object-cover rounded-sm cursor-pointer"
                                                    onClick={() => window.open(attachment.url, '_blank')}
                                                  />
                                                ) : attachment.type === 'video' ? (
                                                  <video className="h-10 w-10 object-cover rounded-sm">
                                                    <source src={attachment.url} type={attachment.mimeType} />
                                                  </video>
                                                ) : (
                                                  <FileText className="h-10 w-10 text-gray-400" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                  <p className="text-xs truncate">{attachment.name}</p>
                                                </div>
                                                <a
                                                  href={attachment.url}
                                                  download={attachment.name}
                                                  className="text-blue-500 hover:text-blue-700"
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  <Download className="h-4 w-4" />
                                                </a>
                                                {(attachment.type === 'image' || attachment.type === 'video') && (
                                                  <button
                                                    onClick={() => window.open(attachment.url, '_blank')}
                                                    className="text-gray-500 hover:text-gray-700"
                                                  >
                                                    <Eye className="h-4 w-4" />
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))
                              )}
                            </div>

                            {/* New Message Composition */}
                            <div className="border-t pt-4 dark:border-gray-700">
                              <div className="space-y-3">
                                <Input
                                  placeholder="Subject"
                                  value={subjectPrefix + subjectSuffix}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (inputValue.startsWith(subjectPrefix)) {
                                      setSubjectSuffix(inputValue.slice(subjectPrefix.length));
                                    }
                                  }}
                                  className="rounded-sm"
                                />
                                <Textarea
                                  placeholder="Type your message..."
                                  className="rounded-sm"
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  rows={5}
                                />

                                {/* Attachments preview */}
                                {attachments.length > 0 && (
                                  <div className="grid grid-cols-3 gap-2 mb-3">
                                    {attachments.map((file, index) => (
                                      <div key={index} className="relative group border rounded-sm p-2">
                                        <div className="flex items-center space-x-2">
                                          {file.type.startsWith('image/') ? (
                                            <img
                                              src={URL.createObjectURL(file)}
                                              alt={`Preview ${index}`}
                                              className="h-10 w-10 object-cover rounded-sm cursor-pointer"
                                              onClick={() => openPreview(index)}
                                            />
                                          ) : file.type.startsWith('video/') ? (
                                            <video className="h-10 w-10 object-cover rounded-sm">
                                              <source src={URL.createObjectURL(file)} type={file.type} />
                                            </video>
                                          ) : (
                                            <FileText className="h-10 w-10 text-gray-400" />
                                          )}
                                          <div className="flex-1 min-w-0">
                                            <p className="text-xs truncate">{file.name}</p>
                                            <p className="text-xs text-gray-500">
                                              {(file.size / 1024).toFixed(1)} KB
                                            </p>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => removeAttachment(index)}
                                            className="text-red-500 hover:text-red-700"
                                          >
                                            <XIcon className="h-4 w-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="flex justify-between items-center">
                                  <label className="inline-flex items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={handleFileChange}
                                      multiple
                                      accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                                      id="message-attachments"
                                    />
                                    <Paperclip className="h-4 w-4 mr-2" />
                                    <span className="text-sm">Attach Files</span>
                                  </label>
                                  <Button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim() || loading.sending}
                                    className="bg-primary hover:bg-primary/90 rounded-sm"
                                  >
                                    {loading.sending ? (
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                      <Send className="h-4 w-4 mr-2" />
                                    )}
                                    {loading.sending ? 'Sending...' : 'Send Message'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : selectedClient ? (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex items-center justify-center dark:border dark:border-gray-700">
                <div className="text-center text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Select a Project</h3>
                  <p>Choose a project from the list to view details and manage communications</p>
                </div>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex items-center justify-center dark:border dark:border-gray-700">
                <div className="text-center text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Select a Client</h3>
                  <p>Choose a client from the list to view projects and communicate</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <div className="relative h-[80vh]">
            {previewUrls[currentPreviewIndex] &&
            attachments[currentPreviewIndex]?.type.startsWith('image/') ? (
              <img
                src={previewUrls[currentPreviewIndex]}
                alt={`Preview ${currentPreviewIndex}`}
                className="w-full h-full object-contain"
              />
            ) : previewUrls[currentPreviewIndex] &&
            attachments[currentPreviewIndex]?.type.startsWith('video/') ? (
              <video controls className="w-full h-full">
                <source
                  src={previewUrls[currentPreviewIndex]}
                  type={attachments[currentPreviewIndex].type}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="h-full flex items-center justify-center">
                <FileText className="h-16 w-16 text-gray-400" />
                <p className="mt-2">Preview not available for this file type</p>
              </div>
            )}

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {previewUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPreviewIndex(index)}
                  className={`h-2 w-2 rounded-full ${currentPreviewIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = previewUrls[currentPreviewIndex] ||
                            URL.createObjectURL(attachments[currentPreviewIndex]);
                  link.download = attachments[currentPreviewIndex].name;
                  link.click();
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={closePreview}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Project Dialog */}
      <Dialog open={showNewProjectForm} onOpenChange={setShowNewProjectForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project for {selectedClient?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Project Name *"
              value={newProjectForm.name}
              onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
              className="rounded-sm"
            />
            <Input
              placeholder="Project Code *"
              value={newProjectForm.code}
              onChange={(e) => setNewProjectForm({ ...newProjectForm, code: e.target.value })}
              className="rounded-sm"
            />
            <Textarea
              placeholder="Project Description"
              value={newProjectForm.description}
              onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
              className="rounded-sm"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Input
                  type="date"
                  value={newProjectForm.startDate}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, startDate: e.target.value })}
                  className="rounded-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <Input
                  type="date"
                  value={newProjectForm.endDate}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, endDate: e.target.value })}
                  className="rounded-sm"
                />
              </div>
            </div>
            <Input
              placeholder="Budget (optional)"
              type="number"
              value={newProjectForm.budget}
              onChange={(e) => setNewProjectForm({ ...newProjectForm, budget: e.target.value })}
              className="rounded-sm"
            />

            <div className="flex space-x-2 pt-4">
              <Button
                onClick={handleCreateProject}
                className="rounded-sm"
                disabled={loading.sending}
              >
                {loading.sending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : 'Create Project'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewProjectForm(false)}
                className="rounded-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={showLogForm} onOpenChange={setShowLogForm}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Project Report for {selectedProject?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <Input
                type="date"
                value={logForm.date}
                onChange={(e) => setLogForm({ ...logForm, date: e.target.value })}
                className="rounded-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Project *</label>
              <Input
                placeholder="Project Code/Name"
                value={selectedProject?.name || ''}
                readOnly
                className="rounded-sm bg-gray-100 dark:bg-gray-800"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Team</label>
              <Input
                value={logForm.team}
                onChange={(e) => setLogForm({ ...logForm, team: e.target.value })}
                className="rounded-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Task(s) *</label>
              <Textarea
                placeholder="Describe the tasks completed..."
                value={logForm.tasks}
                onChange={(e) => setLogForm({ ...logForm, tasks: e.target.value })}
                className="rounded-sm"
                rows={3}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Progress *</label>
              <Textarea
                placeholder="Describe the progress made..."
                value={logForm.progress}
                onChange={(e) => setLogForm({ ...logForm, progress: e.target.value })}
                className="rounded-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Challenges</label>
              <Textarea
                placeholder="Any challenges encountered..."
                value={logForm.challenges}
                onChange={(e) => setLogForm({ ...logForm, challenges: e.target.value })}
                className="rounded-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Action Taken</label>
              <Textarea
                placeholder="Actions taken to address challenges..."
                value={logForm.actionTaken}
                onChange={(e) => setLogForm({ ...logForm, actionTaken: e.target.value })}
                className="rounded-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Help Needed</label>
              <Textarea
                placeholder="Any help or support needed..."
                value={logForm.helpNeeded}
                onChange={(e) => setLogForm({ ...logForm, helpNeeded: e.target.value })}
                className="rounded-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Next Steps</label>
              <Textarea
                placeholder="Planned next steps..."
                value={logForm.nextSteps}
                onChange={(e) => setLogForm({ ...logForm, nextSteps: e.target.value })}
                className="rounded-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Feedback</label>
              <Textarea
                placeholder="Client feedback or comments..."
                value={logForm.feedback}
                onChange={(e) => setLogForm({ ...logForm, feedback: e.target.value })}
                className="rounded-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Conclusion</label>
              <Textarea
                placeholder="Summary and conclusions..."
                value={logForm.conclusion}
                onChange={(e) => setLogForm({ ...logForm, conclusion: e.target.value })}
                className="rounded-sm"
                rows={3}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Upload Images</label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setLogForm({ ...logForm, images: Array.from(e.target.files) });
                  }
                }}
                className="rounded-sm"
              />
            </div>
          </div>
          <div className="flex space-x-2 pt-4">
            <Button
              onClick={handleCreateLogReport}
              className="rounded-sm"
              disabled={loading.sending}
            >
              {loading.sending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : 'Create Report'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowLogForm(false)}
              className="rounded-sm"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;