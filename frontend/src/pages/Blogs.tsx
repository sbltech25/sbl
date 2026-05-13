import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NEWS_API_KEY = '2cabe67875f8463583df899759a3c9ce'; // Replace with your key

const Blogs: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check cache first
        const cached = localStorage.getItem('cachedArticles');
        if (cached) {
          setArticles(JSON.parse(cached));
          return;
        }

        const response = await fetch(
          `https://newsapi.org/v2/everything?q=constructionORengineering&sortBy=publishedAt&language=en&pageSize=50&apiKey=${NEWS_API_KEY}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch articles');
        
        const data = await response.json();
        const processed = data.articles.map((a: any) => ({
          ...a,
          id: a.url.replace(/[^a-zA-Z0-9]/g, '-'),
          date: new Date(a.publishedAt).toLocaleDateString()
        }));
        
        setArticles(processed);
        localStorage.setItem('cachedArticles', JSON.stringify(processed));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getFallbackImage = (index: number) => {
    const fallbacks = [
      'https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    return fallbacks[index % fallbacks.length];
  };

  const handleArticleClick = (article: any) => {
    // Store article in session storage as fallback
    sessionStorage.setItem('currentArticle', JSON.stringify(article));
    navigate(`/articles/${article.id}`);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (articles.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={article.id} className="group hover:shadow-xl transition-all h-full flex flex-col">
              <div className="flex flex-col h-full" onClick={() => handleArticleClick(article)}>
                <ArticleImage article={article} index={index} getFallbackImage={getFallbackImage} />
                <CardHeader className="pb-2 flex-grow">
                  <CardTitle className="text-xl font-bold line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col">
                  <ArticleExcerpt article={article} />
                  <ArticleFooter article={article} />
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-components for better organization
const LoadingScreen = () => (
  <div className="min-h-screen pt-20 flex items-center justify-center">
    <Loader2 className="animate-spin h-12 w-12 text-primary" />
    <span className="ml-4">Loading articles...</span>
  </div>
);

const ErrorScreen = ({ error }: { error: string }) => (
  <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
    <p className="text-red-500 mb-4">Error: {error}</p>
    <Button onClick={() => window.location.reload()}>Retry</Button>
  </div>
);

const EmptyState = () => (
  <div className="min-h-screen pt-20 flex items-center justify-center">
    <div className="text-center">
      <p className="mb-4">No articles found.</p>
      <Button onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  </div>
);

const Header = () => (
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
        Latest updates from industry publications
      </p>
    </div>
  </section>
);

const ArticleImage = ({ article, index, getFallbackImage }: any) => (
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
        {article.source?.name || 'Articles'}
      </span>
    </div>
  </div>
);

const ArticleExcerpt = ({ article }: any) => (
  <p className="text-gray-600 mb-4 line-clamp-3">
    {article.description?.replace(/<[^>]*>/g, '') || 'Read more about this story...'}
  </p>
);

const ArticleFooter = ({ article }: any) => (
  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 mt-auto">
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        <Calendar className="h-4 w-4" />
        <span>{article.date}</span>
      </div>
    </div>
    <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 group">
      Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

export default Blogs;