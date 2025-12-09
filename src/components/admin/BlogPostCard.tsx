import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: number) => void;
}

const BlogPostCard = ({ post, onEdit, onDelete }: BlogPostCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={post.icon as any} size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">{post.category}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-muted-foreground mb-2">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <Button size="sm" variant="outline" onClick={() => onEdit(post)}>
              <Icon name="Edit" size={16} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(post.id)}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
