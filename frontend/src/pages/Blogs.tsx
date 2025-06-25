
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockBlogs = [
  {
    id: 1,
    title: "Advancing Infrastructure Development in Nigeria",
    excerpt: "Our commitment to building world-class infrastructure continues to drive Nigeria's economic growth and development.",
    content: "Full blog content here...",
    author: "Charles Daniel",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
    category: "Infrastructure",
    slug: "advancing-infrastructure-development-nigeria"
  },
  {
    id: 2,
    title: "Marine Logistics: Supporting Offshore Operations",
    excerpt: "How our 24/7 marine support services ensure seamless offshore operations for oil and gas companies.",
    content: "Full blog content here...",
    author: "Boma Charles Daniel",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
    category: "Marine Logistics",
    slug: "marine-logistics-supporting-offshore-operations"
  },
  {
    id: 3,
    title: "Sustainable Engineering Practices",
    excerpt: "Implementing environmentally conscious engineering solutions for a greener future in construction.",
    content: "Full blog content here...",
    author: "Engr. Otonye Iganibo",
    date: "2024-01-05",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    category: "Sustainability",
    slug: "sustainable-engineering-practices"
  }
];

const Blogs: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, projects, and industry trends from Southern Basin Limited
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogs.map((blog) => (
            <Card key={blog.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 rounded-sm overflow-hidden">
              <Link to={`/blog/${blog.slug}`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 group">
                    Read More 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
