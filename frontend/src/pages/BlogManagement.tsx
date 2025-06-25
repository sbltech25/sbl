import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  status: 'published' | 'draft';
  visibility: 'visible' | 'hidden';
  slug: string;
}

// Mock blog data
const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Advancing Infrastructure Development in Nigeria",
    excerpt: "Our commitment to building world-class infrastructure continues to drive Nigeria's economic growth and development.",
    author: "Charles Daniel",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
    category: "Infrastructure",
    status: "published",
    visibility: "visible",
    slug: "advancing-infrastructure-development-nigeria"
  },
  {
    id: 2,
    title: "Marine Logistics: Supporting Offshore Operations",
    excerpt: "How our 24/7 marine support services ensure seamless offshore operations for oil and gas companies.",
    author: "Boma Charles Daniel",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
    category: "Marine Logistics",
    status: "published",
    visibility: "visible",
    slug: "marine-logistics-supporting-offshore-operations"
  }
];

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    toast({
      title: "Blog Deleted",
      description: "The blog post has been successfully deleted.",
    });
  };

  const toggleVisibility = (id: number) => {
    setBlogs(blogs.map(blog => 
      blog.id === id 
        ? { ...blog, visibility: blog.visibility === 'visible' ? 'hidden' : 'visible' }
        : blog
    ));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary mb-2">Blog Management</h1>
            <p className="text-gray-600">Create, edit, and manage your blog posts</p>
          </div>
          <Link to="/secured/v1/admin/blog-management/new">
            <Button className="bg-primary hover:bg-primary/90 rounded-sm">
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </Link>
        </div>

        <Card className="border-0 rounded-sm shadow-lg">
          <CardHeader>
            <CardTitle>All Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>{new Date(blog.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        blog.visibility === 'visible' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {blog.visibility}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleVisibility(blog.id)}
                          className="rounded-sm"
                        >
                          {blog.visibility === 'visible' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Link to={`/secured/v1/admin/blog-management/${blog.id}/edit`}>
                          <Button size="sm" variant="outline" className="rounded-sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 rounded-sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-sm">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the blog post.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(blog.id)}
                                className="bg-red-600 hover:bg-red-700 rounded-sm"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogManagement;
