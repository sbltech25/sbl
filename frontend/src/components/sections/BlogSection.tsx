
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

// Mock blog data - this will be replaced with actual API data
const featuredBlogs = [
  {
    id: 1,
    title: "Advancing Infrastructure Development in Nigeria",
    excerpt: "Our commitment to building world-class infrastructure continues to drive Nigeria's economic growth.",
    author: "Charles Daniel",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop",
    category: "Infrastructure",
    slug: "advancing-infrastructure-development-nigeria"
  },
  {
    id: 2,
    title: "Marine Logistics: Supporting Offshore Operations",
    excerpt: "How our 24/7 marine support services ensure seamless offshore operations.",
    author: "Boma Charles Daniel",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=300&fit=crop",
    category: "Marine Logistics",
    slug: "marine-logistics-supporting-offshore-operations"
  },
  {
    id: 3,
    title: "Sustainable Engineering Practices",
    excerpt: "Implementing environmentally conscious engineering solutions for a greener future.",
    author: "Engr. Otonye Iganibo",
    date: "2024-01-05",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop",
    category: "Sustainability",
    slug: "sustainable-engineering-practices"
  },
  {
    id: 4,
    title: "Oil & Gas Industry Innovations",
    excerpt: "Latest technological advances transforming the oil and gas sector in Nigeria.",
    author: "Andy Ojokoh",
    date: "2024-01-01",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop",
    category: "Oil & Gas",
    slug: "oil-gas-industry-innovations"
  },
  {
    id: 5,
    title: "Project Management Excellence",
    excerpt: "Best practices in managing large-scale construction and engineering projects.",
    author: "Jerry Akpan",
    date: "2023-12-28",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=300&fit=crop",
    category: "Project Management",
    slug: "project-management-excellence"
  },
  {
    id: 6,
    title: "Future of Construction Technology",
    excerpt: "Exploring emerging technologies that are reshaping the construction industry.",
    author: "Victor Chukwuma",
    date: "2023-12-25",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=300&fit=crop",
    category: "Technology",
    slug: "future-construction-technology"
  }
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest articles, project updates, and industry insights
          </p>
        </div>

        {/* Blog Grid - 2 rows, 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBlogs.slice(0, 6).map((blog) => (
            <Card key={blog.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 rounded-sm overflow-hidden bg-white">
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
                  <CardTitle className="text-lg font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 text-sm group">
                    Read More 
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className="text-center">
          <Link to="/blogs">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8 py-4 transform hover:scale-105 transition-all duration-300">
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;