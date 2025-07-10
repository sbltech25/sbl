import { axiosInstance } from "./axios"

// export const createClientAccount = async (signupData) => {
//   const response = await axiosInstance.post("/auth/signup", signupData)
//   return response.data
// }

// export const login = async (loginData) => {
//   const response = await axiosInstance.post("/auth/login", loginData)
//   return response.data
// }


// export const logout = async () => {
//   const response = await axiosInstance.post("/auth/logout")
//   return response.data
// }

// export const getAuthUser = async () => {
//   try {
//     const res = await axiosInstance.get("/auth/me")
//     return res.data
//   } catch (error) {
//     console.log("Error in getAuthUser:", error)
//     return null
//   }
// }




// Add response interceptor to handle errors



// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access (e.g., redirect to login)
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// Auth API
// export const login = async (credentials) => {
//   const response = await axiosInstance.post('/auth/login', credentials);
//   return response.data;
// };

// export const adminLogin = async (credentials) => {
//   const response = await axiosInstance.post('/auth/adminlogin', credentials);
//   return response.data;
// };

// export const logout = async () => {
//   const response = await axiosInstance.post('/auth/logout');
//   return response.data;
// };

// export const getAll = async () => {
//   try{
//       const res = await axiosInstance.get("/auth/getall")
//       return res.data
//   }catch(err){
//     console.log("Err", err)
//     return null
//   }
// }


// export const getAuthUser = async () => {
//   const response = await axiosInstance.get('/auth/me');
//   console.log(response)
//   return response.data;
// };

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  // Store token in localStorage upon successful login
  if (response.data.success && response.data.token) {
    localStorage.setItem('jwtToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const adminLogin = async (credentials) => {
  const response = await axiosInstance.post('/auth/adminlogin', credentials);
  // Store token in localStorage upon successful login
  if (response.data.success && response.data.token) {
    localStorage.setItem('jwtToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = async () => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
  // Optional: Call backend logout if needed
  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    console.log("Logout error:", error);
  }
  return { success: true };
};

export const getAll = async () => {
  try {
    const res = await axiosInstance.get("/auth/getall");
    return res.data;
  } catch (err) {
    console.log("Err", err);
    return null;
  }
};

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    // Update user in localStorage if needed
    if (response.data.success && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};


// User API
export const getAllClients = async () => {
  const response = await axiosInstance.get('/users/clients');
  return response.data;
};

export const updateClientStatus = async (clientId, status) => {
  const response = await axiosInstance.put(`/users/clients/${clientId}/status`, { status });
  return response.data;
};

export const getClientById = async (clientId) => {
  const response = await axiosInstance.get(`/users/clients/${clientId}`);
  return response.data;
};

export const createClientAccount = async (clientData) => {
  const response = await axiosInstance.post('/auth/signup', clientData);
  return response.data;
};

// Project API
export const createProject = async (projectData) => {
  const response = await axiosInstance.post('/projects', projectData);
  return response.data;
};

export const getClientProjects = async (clientId) => {
  const response = await axiosInstance.get(`/projects/client/${clientId}`);
  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await axiosInstance.get(`/projects/${projectId}`);
  return response.data;
};

export const updateProject = async (projectId, updates) => {
  const response = await axiosInstance.put(`/projects/${projectId}`, updates);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axiosInstance.delete(`/projects/${projectId}`);
  return response.data;
};

// Updated uploadMessageAttachment function
export const uploadMessageAttachment = async (file) => {
  try {
    // Convert file to base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });

    const response = await axiosInstance.post('/messages/upload', {
      file: base64Data,
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'document',
      name: file.name,
      mimeType: file.type
    });
    
    return response.data;
  } catch (error) {
    console.error("Attachment upload error:", error);
    return { success: false, message: error.message };
  }
};

// Keep sendMessage function the same as before
export const sendMessage = async (messageData) => {
  try {
    const response = await axiosInstance.post('/messages', {
      subject: messageData.subject,
      text: messageData.text,
      receiverId: messageData.receiverId,
      projectId: messageData.projectId,
      attachments: messageData.attachments
    });
    
    return response.data;
  } catch (error) {
    console.error("Message sending error:", error);
    return { success: false, message: error.message || "Failed to send message" };
  }
};


export const getProjectMessages = async (projectId) => {
  const response = await axiosInstance.get(`/messages/project/${projectId}`);
  return response.data;
};

export const markMessageAsRead = async (messageId) => {
  const response = await axiosInstance.put(`/messages/${messageId}/read`);
  return response.data;
};

export const getUnreadMessageCount = async () => {
  const response = await axiosInstance.get('/messages/unread/count');
  return response.data;
};

// Report API
export const createProjectReport = async (reportData) => {
  const formData = new FormData();
  Object.keys(reportData).forEach(key => {
    if (key === 'images') {
      reportData[key].forEach(file => {
        formData.append('images', file);
      });
    } else {
      formData.append(key, reportData[key]);
    }
  });

  const response = await axiosInstance.post('/reports', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const getProjectReports = async (projectId) => {
  const response = await axiosInstance.get(`/reports/project/${projectId}`);
  return response.data;
};

export const getReportById = async (reportId) => {
  const response = await axiosInstance.get(`/reports/${reportId}`);
  return response.data;
};

export const deleteReport = async (reportId) => {
  const response = await axiosInstance.delete(`/reports/${reportId}`);
  return response.data;
};

// Gantt Chart API
export const createGanttChart = async (ganttData) => {
  const response = await axiosInstance.post('/gantt-charts', ganttData);
  return response.data;
};

export const getProjectGanttCharts = async (projectId) => {
  const response = await axiosInstance.get(`/gantt-charts/project/${projectId}`);
  return response.data;
};

export const updateGanttChart = async (ganttId, updates) => {
  const response = await axiosInstance.put(`/gantt-charts/${ganttId}`, updates);
  return response.data;
};

export const deleteGanttChart = async (ganttId) => {
  const response = await axiosInstance.delete(`/gantt-charts/${ganttId}`);
  return response.data;
};

// File Upload API
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

// Update project status
export const updateProjectStatus = async (projectId, status) => {
  const response = await axiosInstance.put(`/projects/${projectId}/status`, { status });
  return response.data;
};

// Download report
export const downloadReport = async (reportId) => {
  const response = await axiosInstance.get(`/reports/${reportId}/download`);
  return response;
};

// Update task status
export const updateTaskStatus = async (ganttId, taskId, status) => {
  const response = await axiosInstance.put(
    `/gantt-charts/${ganttId}/tasks/${taskId}/status`, 
    { status }
  );
  return response.data;
};

// Get single task
export const getTask = async (ganttId, taskId) => {
  const response = await axiosInstance.get(
    `/gantt-charts/${ganttId}/tasks/${taskId}`
  );
  return response.data;
};