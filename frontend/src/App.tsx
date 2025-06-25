
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ScrollToTop from './components/layout/ScrollTop';

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <ScrollToTop />
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-we-work" element={<HowWeWork />} />
                <Route path="/gallery" element={<Gallery />} />                
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/s/login" element={<ClientLogin />} />
                <Route path="/s/client" element={<ClientDashboard />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
