import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LogOut, Users, Plus, Mail, CheckCircle, Clock, AlertCircle, FileText, MessageSquare, Send, Calendar, BarChart3 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import useAuthUser from '@/hooks/useAuthUser';
import useLogout from "../hooks/useLogout";
import { createClientAccount, getAll, createProject, getClientProjects, createProjectReport, createGanttChart, sendMessage, getProjectMessages } from "../lib/api";

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

interface GanttTask {
  task: string;
  month: string;
}

interface LogEntry {
  date: string;
  project: string;
  team: string;
  tasks: string;
  progress: string;
  challenges: string;
  actionTaken: string;
  helpNeeded: string;
  nextSteps: string;
  feedback: string;
  conclusion: string;
}

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [clientProjects, setClientProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newClientForm, setNewClientForm] = useState({ name: '', email: '' });
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [showGanttForm, setShowGanttForm] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);
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
    tasks: [{ task: '', month: '' }] as GanttTask[]
  });
  const [logForm, setLogForm] = useState<LogEntry>({
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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
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
    setClients(res.data.map((client) => ({
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
    
    toast({
      title: "Client Created",
      description: "Client account has been created successfully.",
    });
  };

  const handleCreateProject = async () => {
    if (!selectedClient || !newProjectForm.name || !newProjectForm.code) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createProject({
        ...newProjectForm,
        clientId: selectedClient.id,
        budget: parseFloat(newProjectForm.budget) || 0
      });
      
      setShowNewProjectForm(false);
      setNewProjectForm({ name: '', code: '', description: '', startDate: '', endDate: '', budget: '' });
      handleLoadClientProjects(selectedClient.id);
      
      toast({
        title: "Project Created",
        description: "Project has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project.",
        variant: "destructive",
      });
    }
  };

  const handleLoadClientProjects = async (clientId: string) => {
    try {
      const response = await getClientProjects(clientId);
      setClientProjects(response.data);
    } catch (error) {
      console.error('Failed to load client projects:', error);
    }
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setSelectedProject(null);
    setMessages([]);
    handleLoadClientProjects(client.id);
  };

  const handleSelectProject = async (project) => {
    setSelectedProject(project);
    try {
      const response = await getProjectMessages(project._id || project.id);
      setMessages(response.data || []);
    } catch (error) {
      console.error('Failed to load project messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedProject || !selectedClient) return;

    try {
      await sendMessage({
        subject: 'Project Communication',
        text: newMessage,
        receiverId: selectedClient.id,
        projectId: selectedProject._id || selectedProject.id
      });

      setNewMessage('');
      handleSelectProject(selectedProject);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
    }
  };

  const handleCreateGanttChart = async () => {
    if (!selectedProject || !ganttForm.projectTitle || ganttForm.tasks.some(task => !task.task || !task.month)) {
      toast({
        title: "Error",
        description: "Please fill in all fields for the Gantt chart.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createGanttChart({
        projectId: selectedProject._id || selectedProject.id,
        title: ganttForm.projectTitle,
        tasks: ganttForm.tasks
      });

      toast({
        title: "Gantt Chart Created",
        description: "Gantt chart has been created and assigned to the project.",
      });
      
      setShowGanttForm(false);
      setGanttForm({ projectTitle: '', tasks: [{ task: '', month: '' }] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create Gantt chart.",
        variant: "destructive",
      });
    }
  };

  const handleCreateLogReport = async () => {
    if (!selectedProject) {
      toast({
        title: "Error",
        description: "Please select a project first.",
        variant: "destructive",
      });
      return;
    }

    const requiredFields = ['project', 'tasks', 'progress'];
    const missingFields = requiredFields.filter(field => !logForm[field as keyof LogEntry].trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Project, Tasks, Progress).",
        variant: "destructive",
      });
      return;
    }

    try {
      // Handle image uploads here (in real app, upload to cloud storage first)
      const images = imageFiles.map((file, index) => ({
        name: file.name,
        url: URL.createObjectURL(file), // In real app, this would be the cloud storage URL
        caption: `Image ${index + 1}`
      }));

      await createProjectReport({
        projectId: selectedProject._id || selectedProject.id,
        projectCode: selectedProject.code,
        ...logForm,
        images
      });

      const reportName = `${new Date(logForm.date).toLocaleDateString()} - ${logForm.project} Project Progress Report`;
      
      toast({
        title: "Report Created",
        description: `${reportName} has been generated and posted to the client dashboard.`,
      });
      
      setShowLogForm(false);
      setLogForm({
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
      setImageFiles([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create report.",
        variant: "destructive",
      });
    }
  };

  const addGanttTask = () => {
    setGanttForm(prev => ({
      ...prev,
      tasks: [...prev.tasks, { task: '', month: '' }]
    }));
  };

  const updateGanttTask = (index: number, field: 'task' | 'month', value: string) => {
    setGanttForm(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => 
        i === index ? { ...task, [field]: value } : task
      )
    }));
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Client List */}
          <div className="flex flex-col gap-3">
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
                {/* New Client Form */}
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

                {/* Client List */}
                <div className="space-y-2">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-3 rounded-sm cursor-pointer border transition-colors ${
                        selectedClient?.id === client.id
                          ? 'bg-primary/10 border-primary'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => handleSelectClient(client)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{client?.name}</h3>
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
                          {clientProjects.length} {clientProjects.length === 1 ? 'project' : 'projects'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects List */}
          {selectedClient && (
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg rounded-sm">
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
                  {/* New Project Form */}
                  <Dialog open={showNewProjectForm} onOpenChange={setShowNewProjectForm}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Project for {selectedClient.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Project Name"
                          value={newProjectForm.name}
                          onChange={(e) => setNewProjectForm(prev => ({ ...prev, name: e.target.value }))}
                          className="rounded-sm"
                        />
                        <Input
                          placeholder="Project Code"
                          value={newProjectForm.code}
                          onChange={(e) => setNewProjectForm(prev => ({ ...prev, code: e.target.value }))}
                          className="rounded-sm"
                        />
                        <Textarea
                          placeholder="Project Description"
                          value={newProjectForm.description}
                          onChange={(e) => setNewProjectForm(prev => ({ ...prev, description: e.target.value }))}
                          className="rounded-sm"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <Input
                              type="date"
                              value={newProjectForm.startDate}
                              onChange={(e) => setNewProjectForm(prev => ({ ...prev, startDate: e.target.value }))}
                              className="rounded-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <Input
                              type="date"
                              value={newProjectForm.endDate}
                              onChange={(e) => setNewProjectForm(prev => ({ ...prev, endDate: e.target.value }))}
                              className="rounded-sm"
                            />
                          </div>
                        </div>
                        <Input
                          placeholder="Budget (optional)"
                          type="number"
                          value={newProjectForm.budget}
                          onChange={(e) => setNewProjectForm(prev => ({ ...prev, budget: e.target.value }))}
                          className="rounded-sm"
                        />
                        
                        <div className="flex space-x-2 pt-4">
                          <Button onClick={handleCreateProject} className="rounded-sm">
                            Create Project
                          </Button>
                          <Button variant="outline" onClick={() => setShowNewProjectForm(false)} className="rounded-sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Projects List */}
                  <div className="space-y-2">
                    {clientProjects.map((project) => (
                      <div
                        key={project._id}
                        className={`p-3 rounded-sm cursor-pointer border transition-colors ${
                          selectedProject?._id === project._id
                            ? 'bg-primary/10 border-primary'
                            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => handleSelectProject(project)}
                      >
                        <h3 className="font-semibold text-sm mb-1">{project.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">Code: {project.code}</p>
                        <Badge className={`text-xs ${getStatusColor(project.status)} rounded-sm`}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(project.status)}
                            <span className="capitalize">{project.status.replace('-', ' ')}</span>
                          </span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          </div>
          {/* Project Details and Communication */}
          <div className={`${selectedClient && selectedProject ? 'lg:col-span-3' : selectedClient ? 'lg:col-span-3' : 'lg:col-span-3'}`}>
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Header */}
                <Card className="border-0 shadow-lg rounded-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedProject.name}</CardTitle>
                        <p className="text-gray-600 mt-2">{selectedProject.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog open={showGanttForm} onOpenChange={setShowGanttForm}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Create Gantt
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Create Gantt Chart for {selectedProject.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                placeholder="Gantt Chart Title"
                                value={ganttForm.projectTitle}
                                onChange={(e) => setGanttForm(prev => ({ ...prev, projectTitle: e.target.value }))}
                                className="rounded-sm"
                              />
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">Project Tasks</h4>
                                  <Button onClick={addGanttTask} size="sm" variant="outline" className="rounded-sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Task
                                  </Button>
                                </div>
                                
                                {ganttForm.tasks.map((task, index) => (
                                  <div key={index} className="grid grid-cols-2 gap-3">
                                    <Input
                                      placeholder={`Task ${index + 1}`}
                                      value={task.task}
                                      onChange={(e) => updateGanttTask(index, 'task', e.target.value)}
                                      className="rounded-sm"
                                    />
                                    <Input
                                      placeholder="Completion Month"
                                      value={task.month}
                                      onChange={(e) => updateGanttTask(index, 'month', e.target.value)}
                                      className="rounded-sm"
                                    />
                                  </div>
                                ))}
                              </div>
                              
                              <div className="flex space-x-2 pt-4">
                                <Button onClick={handleCreateGanttChart} className="rounded-sm">
                                  Create Gantt Chart
                                </Button>
                                <Button variant="outline" onClick={() => setShowGanttForm(false)} className="rounded-sm">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={showLogForm} onOpenChange={setShowLogForm}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Create Report
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Create Project Report for {selectedProject.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Date *</label>
                                <Input
                                  type="date"
                                  value={logForm.date}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, date: e.target.value }))}
                                  className="rounded-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Project *</label>
                                <Input
                                  placeholder="Project Code/Name"
                                  value={logForm.project}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, project: e.target.value }))}
                                  className="rounded-sm"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Team</label>
                                <Input
                                  value={logForm.team}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, team: e.target.value }))}
                                  className="rounded-sm"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Task(s) *</label>
                                <Textarea
                                  placeholder="Describe the tasks completed..."
                                  value={logForm.tasks}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, tasks: e.target.value }))}
                                  className="rounded-sm"
                                  rows={3}
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Progress *</label>
                                <Textarea
                                  placeholder="Describe the progress made..."
                                  value={logForm.progress}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, progress: e.target.value }))}
                                  className="rounded-sm"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Challenges</label>
                                <Textarea
                                  placeholder="Any challenges encountered..."
                                  value={logForm.challenges}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, challenges: e.target.value }))}
                                  className="rounded-sm"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Action Taken</label>
                                <Textarea
                                  placeholder="Actions taken to address challenges..."
                                  value={logForm.actionTaken}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, actionTaken: e.target.value }))}
                                  className="rounded-sm"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Help Needed</label>
                                <Textarea
                                  placeholder="Any help or support needed..."
                                  value={logForm.helpNeeded}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, helpNeeded: e.target.value }))}
                                  className="rounded-sm"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Next Steps</label>
                                <Textarea
                                  placeholder="Planned next steps..."
                                  value={logForm.nextSteps}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, nextSteps: e.target.value }))}
                                  className="rounded-sm"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Feedback</label>
                                <Textarea
                                  placeholder="Client feedback or comments..."
                                  value={logForm.feedback}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, feedback: e.target.value }))}
                                  className="rounded-sm"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Conclusion</label>
                                <Textarea
                                  placeholder="Summary and conclusions..."
                                  value={logForm.conclusion}
                                  onChange={(e) => setLogForm(prev => ({ ...prev, conclusion: e.target.value }))}
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
                                      setImageFiles(Array.from(e.target.files));
                                    }
                                  }}
                                  className="rounded-sm"
                                />
                                {imageFiles.length > 0 && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    {imageFiles.length} image(s) selected
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2 pt-4">
                              <Button onClick={handleCreateLogReport} className="rounded-sm">
                                Create Report
                              </Button>
                              <Button variant="outline" onClick={() => setShowLogForm(false)} className="rounded-sm">
                                Cancel
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                </CardHeader>
                </Card>

                {/* Messages Section */}
                <Card className="border-0 shadow-lg rounded-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="max-h-96 overflow-y-auto space-y-4">
                        {messages.map((message) => (
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
                        ))}
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
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : selectedClient ? (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Select a Project</h3>
                  <p>Choose a project from the list to view details and manage communications</p>
                </div>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg rounded-sm h-[600px] flex items-center justify-center">
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
    </div>
  );
};

export default AdminDashboard;