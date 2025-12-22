import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { CommunityPosts, ProductReviews } from '@/entities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { MessageCircle, ThumbsUp, CheckCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CommunityForumPage() {
  const [posts, setPosts] = useState<CommunityPosts[]>([]);
  const [reviews, setReviews] = useState<ProductReviews[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<CommunityPosts[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'discussions' | 'reviews'>('discussions');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, reviewsRes] = await Promise.all([
          BaseCrudService.getAll<CommunityPosts>('communityposts'),
          BaseCrudService.getAll<ProductReviews>('productreviews'),
        ]);
        setPosts(postsRes.items.sort((a, b) => {
          const dateA = new Date(a.createdDate || 0).getTime();
          const dateB = new Date(b.createdDate || 0).getTime();
          return dateB - dateA;
        }));
        setReviews(reviewsRes.items.sort((a, b) => {
          const dateA = new Date(a.creationDate || 0).getTime();
          const dateB = new Date(b.creationDate || 0).getTime();
          return dateB - dateA;
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < (rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Community Forum
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Join our community of organic food enthusiasts. Share experiences, ask questions, and read reviews from fellow ARAMBA customers.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-[100rem] mx-auto px-6 py-8">
        <div className="flex gap-4 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'discussions'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-primary'
            }`}
          >
            Discussions ({filteredPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-primary'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div>
            {/* Search & Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3"
                />
              </div>

              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Posts List */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card key={post._id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4">
                      {/* Post Image */}
                      {post.postImage && (
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                          <Image
                            src={post.postImage}
                            alt={post.title || 'Post'}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Post Content */}
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-heading font-bold text-primary">
                            {post.title}
                          </h3>
                          {post.isResolved && (
                            <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Resolved
                            </Badge>
                          )}
                        </div>

                        {post.category && (
                          <Badge variant="secondary" className="mb-2">
                            {post.category}
                          </Badge>
                        )}

                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{post.content}</p>

                        {/* Engagement */}
                        <div className="flex gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes || 0} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.replies || 0} replies</span>
                          </div>
                          {post.createdDate && (
                            <span>
                              {new Date(post.createdDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No discussions found.</p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review._id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-heading font-bold text-primary">
                          {review.reviewTitle}
                        </h3>
                        <p className="text-sm text-gray-600">Product ID: {review.productId}</p>
                      </div>
                      {renderStars(review.rating)}
                    </div>

                    <p className="text-gray-700 mb-3">{review.comment}</p>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>By: {review.userId || 'Anonymous'}</span>
                      {review.creationDate && (
                        <span>{new Date(review.creationDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No reviews yet.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/10 py-12 px-6 mt-12">
        <div className="max-w-[100rem] mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Join the Conversation
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Have a question? Want to share your experience? Join our community forum and connect with other organic food enthusiasts.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
            Start a Discussion
          </Button>
        </div>
      </section>
    </div>
  );
}
