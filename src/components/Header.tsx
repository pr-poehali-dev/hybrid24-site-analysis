import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
}

const Header = ({ isBookingOpen, setIsBookingOpen }: HeaderProps) => {
  return (
    <header className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Zap" className="text-primary" size={32} />
          <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">AutoService</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
          <a href="#promotions" className="hover:text-primary transition-colors">Акции</a>
          <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
          <a href="#blog" className="hover:text-primary transition-colors">Блог</a>
        </nav>
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary btn-glow">
              Записаться
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
