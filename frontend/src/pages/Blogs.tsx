import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const NEWS_API_KEY = '2cabe67875f8463583df899759a3c9ce'; // Replace with your actual key

const fetchConstructionNews = async () => {
  try {
    // Search for construction/engineering related articles
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=construction OR engineering OR Mechanical&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

const Blogs: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to load from cache first
        const cached = localStorage.getItem('cachedArticles');
        if (cached) {
          setArticles(JSON.parse(cached));
        }

        const newsArticles = await fetchConstructionNews();
        
        // Process articles
        const processedArticles = newsArticles
          .filter(article => article.title && article.url)
          .map(article => ({
            ...article,
            id: article.url.replace(/[^a-zA-Z0-9]/g, '-'),
            date: new Date(article.publishedAt).toLocaleDateString()
          }));
        
        setArticles(processedArticles);
        localStorage.setItem('cachedArticles', JSON.stringify(processedArticles));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const getFallbackImage = (index: number) => {
    const fallbacks = [
      'https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    return fallbacks[index % fallbacks.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
        <span className="ml-4">Loading articles...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">Error loading articles: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">No articles found.</p>
          <p className="text-gray-600 mb-4">We're having trouble loading news.</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-20 mb-16 bg-gradient-to-br from-secondary to-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
       
        <div className="container mx-auto px-4 relative text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Articles</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Latest updates from industry publications worldwide
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 rounded-lg overflow-hidden h-full flex flex-col">
              <Link 
                to={`/articles/${article.id}`} 
                state={{ article }}
                className="flex flex-col h-full"
              >
                <div className="relative overflow-hidden flex-shrink-0 h-48">
                  <img 
                    src={article.urlToImage || getFallbackImage(index)}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getFallbackImage(index);
                    }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.source?.name || 'News'}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2 flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description || 'Read more about this story...'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 mt-auto">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 group mt-auto self-start">
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