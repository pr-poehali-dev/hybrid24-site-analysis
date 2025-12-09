import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { BlogPost, BlogSection, BlogFormData } from '@/types/blog';

interface BlogPostFormProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  editingPost: BlogPost | null;
  formData: BlogFormData;
  setFormData: (data: BlogFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
  addSection: () => void;
  updateSection: (index: number, field: keyof BlogSection, value: any) => void;
  removeSection: (index: number) => void;
}

const BlogPostForm = ({
  dialogOpen,
  setDialogOpen,
  editingPost,
  formData,
  setFormData,
  handleSubmit,
  resetForm,
  addSection,
  updateSection,
  removeSection
}: BlogPostFormProps) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => {
      setDialogOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" className="mr-2" size={18} />
          Добавить статью
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPost ? 'Редактировать статью' : 'Новая статья'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Заголовок</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Краткое описание</Label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Категория</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Советы, Диагностика..."
                required
              />
            </div>
            <div>
              <Label>Иконка</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="FileText, Snowflake..."
              />
            </div>
          </div>
          <div>
            <Label>URL изображения</Label>
            <Input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Дата</Label>
              <Input
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="10 декабря 2025"
                required
              />
            </div>
            <div>
              <Label>Время чтения</Label>
              <Input
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="5 мин"
                required
              />
            </div>
          </div>
          <div>
            <Label>Введение</Label>
            <Textarea
              value={formData.intro}
              onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Разделы статьи</Label>
              <Button type="button" size="sm" onClick={addSection}>
                <Icon name="Plus" className="mr-1" size={14} />
                Добавить раздел
              </Button>
            </div>
            {formData.sections.map((section, index) => (
              <Card key={index} className="p-4 mb-3">
                <div className="flex justify-between items-start mb-3">
                  <Label>Раздел {index + 1}</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeSection(index)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
                <Input
                  placeholder="Заголовок раздела"
                  value={section.title}
                  onChange={(e) => updateSection(index, 'title', e.target.value)}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Текст раздела"
                  value={section.text}
                  onChange={(e) => updateSection(index, 'text', e.target.value)}
                  rows={2}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Список пунктов (каждый с новой строки)"
                  value={section.list?.join('\n') || ''}
                  onChange={(e) => updateSection(
                    index,
                    'list',
                    e.target.value.split('\n').filter(item => item.trim())
                  )}
                  rows={3}
                />
              </Card>
            ))}
          </div>

          <div>
            <Label>Заключение</Label>
            <Textarea
              value={formData.conclusion}
              onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              {editingPost ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostForm;
