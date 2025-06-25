import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';

// Mock blog data - this will be replaced with actual API data
const mockBlog = {
  id: 1,
  title: "Advancing Infrastructure Development in Nigeria",
  content: `
    <p class="mb-6">Nigeria's infrastructure development has been at the forefront of our national discourse for decades. As an indigenous engineering company with over 12 years of experience, Southern Basin Construction Limited has witnessed firsthand the evolution of Nigeria's construction landscape and the critical role infrastructure plays in economic growth.</p>
    
    <h2 class="text-2xl font-bold text-secondary mb-4">The Current State of Nigerian Infrastructure</h2>
    <p class="mb-6">The infrastructure deficit in Nigeria is well-documented, with estimates suggesting that the country needs to invest over $100 billion annually for the next 30 years to close the gap. This presents both challenges and opportunities for indigenous companies like ours.</p>
    
    <h2 class="text-2xl font-bold text-secondary mb-4">Our Approach to Sustainable Development</h2>
    <p class="mb-6">At Southern Basin Construction Limited, we believe in a holistic approach to infrastructure development that considers not just the immediate needs but also long-term sustainability and environmental impact. Our projects are designed with future generations in mind.</p>
    
    <h2 class="text-2xl font-bold text-secondary mb-4">Key Projects and Impact</h2>
    <p class="mb-6">Over the years, we have completed numerous projects ranging from road construction to pipeline engineering. Each project has contributed to improving the quality of life for Nigerians and supporting economic development in various communities.</p>
  `,
  author: "Charles Daniel",
  date: "2024-01-15",
  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop",
  category: "Infrastructure",
  slug: "advancing-infrastructure-development-nigeria"
};

const relatedBlogs = [
  {
    id: 2,
    title: "Marine Logistics: Supporting Offshore Operations",
    excerpt: "How our 24/7 marine support services ensure seamless offshore operations.",
    author: "Boma Charles Daniel",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop",
    category: "Marine Logistics",
    slug: "marine-logistics-supporting-offshore-operations"
  },
  {
    id: 3,
    title: "Sustainable Engineering Practices",
    excerpt: "Implementing environmentally conscious engineering solutions for a greener future.",
    author: "Engr. Otonye Iganibo",
    date: "2024-01-05",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
    category: "Sustainability",
    slug: "sustainable-engineering-practices"
  }
];

const BlogPost: React.FC = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/blogs">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article>
              {/* Featured Image */}
              <div className="mb-8">
                <img 
                  src={mockBlog.image} 
                  alt={mockBlog.title}
                  className="w-full h-96 object-cover rounded-sm shadow-lg"
                />
              </div>

              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {mockBlog.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{mockBlog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(mockBlog.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                  {mockBlog.title}
                </h1>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: mockBlog.content }}
              />
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-0 rounded-sm shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-secondary">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {relatedBlogs.map((blog) => (
                    <Link key={blog.id} to={`/blog/${blog.slug}`} className="block group">
                      <div className="flex space-x-4">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-20 h-20 object-cover rounded-sm group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors text-sm mb-2 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-xs text-gray-500 mb-2">{blog.author}</p>
                          <p className="text-xs text-gray-500">{new Date(blog.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* CTA Section */}
              <Card className="border-0 rounded-sm shadow-lg bg-gradient-to-br from-primary to-secondary text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">Ready to Start Your Project?</h3>
                  <p className="mb-6 opacity-90">Let us help you bring your construction and engineering vision to life.</p>
                  <Link to="/contact">
                    <Button className="bg-white text-primary hover:bg-gray-100 rounded-sm">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
