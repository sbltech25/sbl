import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Chatbot from './components/chatbot/Chatbot';
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import HowWeWork from "./pages/HowWeWork";
import BlogPost from "./pages/BlogPost";
import Blogs from "./pages/Blogs";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BlogManagement from "./pages/BlogManagement";
import NewBlogPost from "./pages/NewBlogPost";
import EditBlogPost from "./pages/EditBlogPost";
import NotFound from "./pages/NotFound";
import Certification from "./pages/Certification";
import ScrollToTop from './components/layout/ScrollTop';
import PageLoader from './components/layout/PageLoader.js';
import useAuthUser from './hooks/useAuthUser';

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  console.log(authUser)

  if (isLoading) return <PageLoader />;

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="h-screen">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <ScrollToTop />
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-we-work" element={<HowWeWork />} />
              <Route path="/projects-and-equipments/" element={<Gallery />} />                
              <Route path="/certifications" element={<Certification />} />                
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/s/login" 
                element={isAuthenticated ? <Navigate to="/s/client/dashboard" /> : <ClientLogin />} 
              />
              <Route 
                path="/s/client/dashboard" 
                element={isAuthenticated ? <ClientDashboard /> : <Navigate to="/s/login" />} 
              />
              <Route path="/secured/v1/login" element={<AdminLogin />} />
              <Route path="/secured/v1/admin" element={<AdminDashboard />} />                
              <Route path="/secured/v1/admin/blog-management" element={<BlogManagement />} />
              <Route path="/secured/v1/admin/blog-management/new" element={<NewBlogPost />} />
              <Route path="/secured/v1/admin/blog-management/:id/edit" element={<EditBlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default App;