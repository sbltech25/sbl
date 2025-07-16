import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(location.state?.article);
  const [loading, setLoading] = useState(!location.state?.article);
  const [error, setError] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  const sanitizeContent = (html: string) => {
    return sanitizeHtml(html || '', {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'iframe']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'width', 'height', 'style', 'class'],
        iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen']
      },
      allowedStyles: {
        '*': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
          'text-align': [/^left$/, /^right$/, /^center$/],
          'font-size': [/^\d+(?:px|em|%)$/],
          'margin': [/^\d+(?:px|em|%)$/],
          'padding': [/^\d+(?:px|em|%)$/]
        }
      }
    });
  };

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        
        // If article data was passed in state
        if (location.state?.article) {
          // For NewsAPI, we already have the content in the article object
          return;
        }
        
        // Otherwise try to find in cache
        const cachedArticles = localStorage.getItem('cachedArticles');
        if (cachedArticles) {
          const parsed = JSON.parse(cachedArticles);
          const foundArticle = parsed.find((a: any) => a.id === id);
          
          if (foundArticle) {
            setArticle(foundArticle);
            return;
          }
        }
        
        throw new Error('Article not found');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id, location.state]);

  useEffect(() => {
    if (article) {
      const cachedArticles = localStorage.getItem('cachedArticles');
      if (cachedArticles) {
        const parsed = JSON.parse(cachedArticles);
        const related = parsed
          .filter((a: any) => a.id !== article.id && a.source?.name === article.source?.name)
          .slice(0, 3);
        setRelatedArticles(related);
      }
    }
  }, [article]);

  const getFallbackImage = () => {
    return 'https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => navigate('/articles')} className="mt-4">
          Back to News
        </Button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center">
        <p className="mb-4">Article not found</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Return
        </Button>
      </div>
    );
  }

  console.log(article)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="">
          <Button 
            onClick={() => navigate('/articles')} 
            variant="ghost" 
            className="text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-sm p-6">
              {/* Featured Image */}
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={article.urlToImage || getFallbackImage()}
                  alt={article.title}
                  className="w-full h-auto max-h-96 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getFallbackImage();
                  }}
                />
              </div>

              {/* Article Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.source?.name || 'News'}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h1>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeContent(article.content || article.description) }}
              />
              
              {/* Original article link */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Read original article on {article.source?.name || 'source website'}
                </a>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <Card className="border-0 rounded-lg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      More from {article.source?.name || 'News'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedArticles.map((related) => (
                      <Link 
                        key={related.id} 
                        to={`/articles/${related.id}`}
                        state={{ article: related }}
                        className="block group"
                      >
                        <div className="flex space-x-4">
                          <img 
                            src={related.urlToImage || getFallbackImage()}
                            alt={related.title}
                            className="w-20 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = getFallbackImage();
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm mb-2 line-clamp-2">
                              {related.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {new Date(related.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Newsletter CTA */}
              <Card className="border-0 hidden rounded-lg shadow-sm bg-gradient-to-br from-primary to-secondary text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                  <p className="mb-6 opacity-90">
                    Get the latest construction and engineering news
                  </p>
                  <Link to="/subscribe">
                    <Button className="bg-white text-primary hover:bg-gray-100 rounded-lg">
                      Subscribe
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