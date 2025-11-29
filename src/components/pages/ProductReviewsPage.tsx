import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { ProductReviews, Products } from '@/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';

export default function ProductReviewsPage() {
  const { productId } = useParams();
  const { memberId, isAuthenticated } = useAuthStore();
  const [product, setProduct] = useState<Products | null>(null);
  const [reviews, setReviews] = useState<ProductReviews[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (productId) {
          const productData = await BaseCrudService.getById<Products>('products', productId);
          setProduct(productData);

          const { items } = await BaseCrudService.getAll<ProductReviews>('productreviews');
          const productReviews = items.filter(r => r.productId === productId);
          setReviews(productReviews);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !memberId) {
      alert('Please sign in to submit a review');
      return;
    }

    setSubmitting(true);
    try {
      const newReview: ProductReviews = {
        _id: crypto.randomUUID(),
        productId,
        userId: memberId,
        rating: formData.rating,
        reviewTitle: formData.title,
        comment: formData.comment,
        creationDate: new Date(),
      };

      await BaseCrudService.create('productreviews', newReview);
      setReviews([newReview, ...reviews]);
      setFormData({ rating: 5, title: '', comment: '' });
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        {product && (
          <>
            <h1 className="text-3xl font-heading font-semibold text-primary mb-2">{product.name}</h1>
            <p className="text-secondary font-paragraph mb-8">Reviews & Ratings</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-semibold text-primary">Customer Reviews</h2>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(Number(averageRating))
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-heading font-bold text-primary">{averageRating}</span>
                  </div>
                  <p className="text-sm text-secondary font-paragraph">({reviews.length} reviews)</p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <p className="text-center text-secondary font-paragraph">No reviews yet. Be the first to review!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="border-primary/20">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-heading font-semibold text-primary">{review.reviewTitle}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < (review.rating || 0)
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-secondary font-paragraph">
                                  {review.rating} out of 5
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-secondary font-paragraph mb-2">{review.comment}</p>
                          <p className="text-xs text-secondary/60 font-paragraph">
                            {review.creationDate
                              ? new Date(review.creationDate).toLocaleDateString()
                              : 'Recently'}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Review Form */}
          <div>
            <Card className="border-primary/20 sticky top-20">
              <CardHeader>
                <CardTitle className="text-primary">Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                {!isAuthenticated ? (
                  <div className="text-center py-6">
                    <p className="text-secondary font-paragraph mb-4">Sign in to write a review</p>
                    <Button className="w-full bg-primary hover:bg-primary/90">Sign In</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-heading text-primary mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating })}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 cursor-pointer transition-colors ${
                                rating <= formData.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 hover:text-yellow-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-heading text-primary mb-2">Review Title</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Summarize your experience"
                        className="border-primary/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-heading text-primary mb-2">Your Review</label>
                      <Textarea
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        placeholder="Share your detailed thoughts..."
                        className="border-primary/20 min-h-24"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-secondary hover:bg-secondary/90"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
