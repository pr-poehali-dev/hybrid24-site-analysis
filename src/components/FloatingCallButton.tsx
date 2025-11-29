import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const FloatingCallButton = () => {
  return (
    <a
      href="tel:+79230166750"
      className="fixed bottom-6 right-6 z-50 animate-fade-in"
    >
      <Button
        size="lg"
        className="gradient-primary btn-glow rounded-full w-14 h-14 md:w-16 md:h-16 shadow-2xl hover:scale-110 transition-transform"
      >
        <Icon name="Phone" size={24} className="md:w-7 md:h-7" />
      </Button>
    </a>
  );
};

export default FloatingCallButton;
