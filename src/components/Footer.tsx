import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="text-primary" size={24} />
            <span className="font-bold gradient-primary bg-clip-text text-transparent">AutoService</span>
          </div>
          <p className="text-muted-foreground text-sm">© 2025 Все права защищены</p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Youtube" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
