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
import { LogOut, Users, Plus, Mail, CheckCircle, Clock, AlertCircle, FileText, MessageSquare, Send, Calendar, BarChart3, Download, Paperclip, Eye, XIcon, ArrowRight, Loader2 } from 'lucide-react';
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
  uploadMessageAttachment
} from "../lib/api";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reports, setReports] = useState([]);
  const [ganttCharts, setGanttCharts] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
    const [subjectSuffix, setSubjectSuffix] = useState("");
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();
    const subjectPrefix = "Subject: ";

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

  useEffect(() => {
    if (selectedProject) {
      const loadProjectData = async () => {
        try {
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
        }
      };
      loadProjectData();
    }
  }, [selectedProject]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      const maxSize = 50 * 1024 * 1024;

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

    const newPreviewUrls = validFiles
      .filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'))
      .map(file => URL.createObjectURL(file));

    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    const removedFile = newAttachments.splice(index, 1)[0];

    if (removedFile.type.startsWith('image/') || removedFile.type.startsWith('video/')) {
      const urlIndex = previewUrls.findIndex(url => url.includes(removedFile.name.split('.')[0]));
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

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedProject) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
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

      const response = await sendMessage({
        subject:  subjectPrefix + subjectSuffix,
        text: newMessage,
        receiverId: selectedProject.clientId._id,
        projectId: selectedProject._id,
        attachments: successfulUploads
      });

      if (!response.success) {
        throw new Error(response.message || 'Failed to send message');
      }

      const { data } = await getProjectMessages(selectedProject._id);
      setMessages(data);
      setNewMessage('');
      setAttachments([]);
      setPreviewUrls([]);
      previewUrls.forEach(url => URL.revokeObjectURL(url));

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                      onClick={() => setSelectedProject(project)}
                    >
                      <h3 className="font-semibold text-sm mb-1">{project.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Code: {project.code}</p>
                      <div className="flex justify-between items-center">
                        <Badge className={`hidden text-xs ${getStatusColor(project.status)} rounded-sm`}>
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

          <div className="lg:col-span-3">
            {selectedProject ? (
              <div className="space-y-6">
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

                <Card className="border-0 shadow-lg rounded-sm dark:border dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Communication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                        <div ref={messagesEndRef} />
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
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex w-full items-center p-2 justify-between">
                                  <p className="font-medium flex items-center">
                                    {message.senderId._id === authUser._id ? 'You' : message.senderId.name}
                                    <ArrowRight className="h-4 w-4 mx-2 text-gray-500" />
                                    {message.senderId._id !== authUser._id ? 'You' : "Southern Basin Ltd."}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDateTime(message.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <div className="mb-4">
                                <p className="font-semibold text-lg">{message.subject}</p>
                              </div>
                              <div className="whitespace-pre-line mb-4 border-t pt-4 dark:border-gray-700">
                                {message.text}
                              </div>
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
                            className="rounded-sm bg-gray-100 dark:bg-gray-800"
                          />
                          <Textarea
                            placeholder="Type your message..."
                            className="rounded-sm"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={5}
                          />

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
                              disabled={!newMessage.trim() || isLoading}
                              className="bg-primary hover:bg-primary/90 rounded-sm"
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Send className="h-4 w-4 mr-2" />
                              )}
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
    </div>
  );
};

export default ClientDashboard;