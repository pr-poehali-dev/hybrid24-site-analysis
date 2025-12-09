import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import BookingDialog from '@/components/BookingDialog';
import Footer from '@/components/Footer';
import FloatingCallButton from '@/components/FloatingCallButton';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  icon: string;
  image: string;
  date: string;
  readTime: string;
}

const BlogPage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/e92433da-3db2-4e99-b9d6-a4596b987e6a');
        const data = await response.json();
        
        if (response.ok && data.posts && data.posts.length > 0) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = ['Все', ...Array.from(new Set(posts.map(post => post.category)))];
  
  const filteredPosts = posts
    .filter(post => selectedCategory === 'Все' || post.category === selectedCategory)
    .filter(post => 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen">
      <Header isBookingOpen={isBookingOpen} setIsBookingOpen={setIsBookingOpen} />
      
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <BookingDialog setIsBookingOpen={setIsBookingOpen} />
      </Dialog>

      <section className="py-12 md:py-20 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <Badge className="mb-4 gradient-accent text-sm">Полезные материалы</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Блог АвтоТехЦентра</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Статьи и советы по обслуживанию и ремонту автомобилей
            </p>
          </div>

          {!loading && posts.length > 0 && (
            <>
              <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Поиск статей по названию или содержанию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'gradient-primary' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </>
          )}

          {loading ? (
            <div className="text-center py-20">
              <Icon name="Loader" className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-muted-foreground">Загрузка статей...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="FileText" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <h3 className="text-2xl font-bold mb-2">Статей пока нет</h3>
              <p className="text-muted-foreground mb-6">Скоро здесь появятся полезные материалы</p>
              <Button className="gradient-primary btn-glow" onClick={() => setIsBookingOpen(true)}>
                Записаться на обслуживание
              </Button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="Search" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <h3 className="text-2xl font-bold mb-2">
                {searchQuery ? 'Ничего не найдено' : 'Статей в этой категории нет'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Попробуйте выбрать другую категорию'}
              </p>
              {(searchQuery || selectedCategory !== 'Все') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Все');
                  }}
                >
                  Сбросить фильтры
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredPosts.map((post, index) => (
                  <Link to={`/blog/${post.id}`} key={post.id}>
                    <Card
                      className="hover-scale cursor-pointer animate-fade-in h-full"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div 
                        className="h-48 bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: `url(${post.image})` }}
                      >
                        <div className="h-full bg-gradient-to-b from-transparent to-black/60 rounded-t-lg flex items-end p-4">
                          <Badge className="gradient-accent">{post.category}</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name={post.icon as any} size={20} className="text-primary" />
                          <span className="text-sm text-muted-foreground">{post.date}</span>
                        </div>
                        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-primary">
                            <span>Читать</span>
                            <Icon name="ArrowRight" size={14} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-16 text-center animate-fade-in">
                <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl">Нужна консультация?</CardTitle>
                    <CardDescription className="text-base">
                      Запишитесь на диагностику или обслуживание — наши мастера ответят на все ваши вопросы
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="gradient-primary btn-glow" size="lg" onClick={() => setIsBookingOpen(true)}>
                      <Icon name="Calendar" className="mr-2" size={20} />
                      Записаться на обслуживание
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default BlogPage;