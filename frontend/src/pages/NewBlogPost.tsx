import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Blog categories based on company services
const blogCategories = [
  'Civil Engineering',
  'Design & Planning',
  'Marine & Logistics',
  'Mechanical Engineering',
  'Oil & Gas Services',
  'Infrastructure',
  'Project Management',
  'Sustainability',
  'Technology',
  'Safety',
  'Industry News'
];

const NewBlogPost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    status: 'draft' as 'published' | 'draft',
    visibility: 'visible' as 'visible' | 'hidden'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would create the blog post via API
    toast({
      title: "Blog Post Created",
      description: "The new blog post has been successfully created.",
    });
    
    navigate('/secured/v1/admin/blog-management');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to Cloudinary
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
      
      toast({
        title: "Image Uploaded",
        description: "Banner image has been uploaded successfully.",
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/secured/v1/admin/blog-management">
            <Button variant="ghost" className="text-primary hover:text-primary/80 mr-4 rounded-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog Management
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-secondary mb-2">Create New Blog Post</h1>
            <p className="text-gray-600">Fill in the details to create a new blog post</p>
          </div>
        </div>

        <Card className="border-0 rounded-sm shadow-lg">
          <CardHeader>
            <CardTitle>Blog Post Details</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog post title"
                    required
                    className="rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author *</label>
                  <Input
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    required
                    className="rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a category</option>
                    {blogCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Visibility</label>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>

              {/* Banner Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Banner Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center">
                  {formData.image ? (
                    <div className="space-y-4">
                      <img 
                        src={formData.image} 
                        alt="Banner preview" 
                        className="w-full h-48 object-cover rounded-sm mx-auto"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="rounded-sm"
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" className="rounded-sm">
                            Upload Banner Image
                          </Button>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">Upload a banner image for your blog post</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <Textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Write a brief excerpt for the blog post..."
                  rows={3}
                  required
                  className="rounded-sm"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write the full blog post content here..."
                  rows={15}
                  required
                  className="rounded-sm"
                />
                <p className="text-sm text-gray-500 mt-2">
                  You can use HTML tags for formatting (h2, h3, p, strong, em, etc.)
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link to="/secured/v1/admin/blog-management">
                  <Button type="button" variant="outline" className="rounded-sm">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-sm">
                  Create Blog Post
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewBlogPost;
