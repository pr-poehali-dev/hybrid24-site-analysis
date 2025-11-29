import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface PromotionTimerProps {
  validUntil: string;
}

const PromotionTimer = ({ validUntil }: PromotionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (validUntil === 'Постоянно') return;

    const calculateTimeLeft = () => {
      const endDate = new Date(validUntil).getTime();
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [validUntil]);

  if (validUntil === 'Постоянно') {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon name="Clock" size={16} />
        <span>Действует: {validUntil}</span>
      </div>
    );
  }

  const isExpiringSoon = timeLeft.days <= 7;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon name="Clock" size={16} />
        <span>До окончания:</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className={`text-center p-2 rounded-lg ${isExpiringSoon ? 'bg-red-50 dark:bg-red-950' : 'bg-muted'}`}>
          <div className={`text-xl font-bold ${isExpiringSoon ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
            {timeLeft.days}
          </div>
          <div className="text-xs text-muted-foreground">дн</div>
        </div>
        <div className={`text-center p-2 rounded-lg ${isExpiringSoon ? 'bg-red-50 dark:bg-red-950' : 'bg-muted'}`}>
          <div className={`text-xl font-bold ${isExpiringSoon ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
            {timeLeft.hours}
          </div>
          <div className="text-xs text-muted-foreground">час</div>
        </div>
        <div className={`text-center p-2 rounded-lg ${isExpiringSoon ? 'bg-red-50 dark:bg-red-950' : 'bg-muted'}`}>
          <div className={`text-xl font-bold ${isExpiringSoon ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
            {timeLeft.minutes}
          </div>
          <div className="text-xs text-muted-foreground">мин</div>
        </div>
        <div className={`text-center p-2 rounded-lg ${isExpiringSoon ? 'bg-red-50 dark:bg-red-950' : 'bg-muted'}`}>
          <div className={`text-xl font-bold ${isExpiringSoon ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
            {timeLeft.seconds}
          </div>
          <div className="text-xs text-muted-foreground">сек</div>
        </div>
      </div>
      {isExpiringSoon && (
        <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
          <Icon name="AlertTriangle" size={14} />
          <span>Акция скоро закончится!</span>
        </div>
      )}
    </div>
  );
};

export default PromotionTimer;
