import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const services = [
  {
    id: 1,
    title: 'Техническое обслуживание',
    description: 'Комплексная проверка и обслуживание автомобиля',
    price: 'от 3 500 ₽',
    duration: '2 часа',
    icon: 'Wrench'
  },
  {
    id: 2,
    title: 'Диагностика двигателя',
    description: 'Компьютерная диагностика и выявление неисправностей',
    price: 'от 1 500 ₽',
    duration: '1 час',
    icon: 'Settings'
  },
  {
    id: 3,
    title: 'Замена масла',
    description: 'Замена моторного масла и масляного фильтра',
    price: 'от 1 200 ₽',
    duration: '30 мин',
    icon: 'Droplet'
  },
  {
    id: 4,
    title: 'Шиномонтаж',
    description: 'Сезонная замена шин, балансировка',
    price: 'от 2 000 ₽',
    duration: '1 час',
    icon: 'Disc'
  },
  {
    id: 5,
    title: 'Ремонт ходовой',
    description: 'Диагностика и ремонт подвески автомобиля',
    price: 'от 5 000 ₽',
    duration: '3 часа',
    icon: 'Construction'
  },
  {
    id: 6,
    title: 'Кузовной ремонт',
    description: 'Восстановление кузова после ДТП',
    price: 'от 10 000 ₽',
    duration: 'от 1 дня',
    icon: 'Car'
  }
];

const Index = () => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const toggleService = (id: number) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const basePrices: { [key: number]: number } = {
      1: 3500,
      2: 1500,
      3: 1200,
      4: 2000,
      5: 5000,
      6: 10000
    };
    return selectedServices.reduce((sum, id) => sum + basePrices[id], 0);
  };

  const handleBooking = () => {
    if (!date || !time || !name || !phone || selectedServices.length === 0) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    alert(`Заявка отправлена! Мы свяжемся с вами в ближайшее время.\n\nДата: ${format(date, 'dd MMMM yyyy', { locale: ru })}\nВремя: ${time}\nУслуги: ${selectedServices.length}\nСумма: ${calculateTotal()} ₽`);
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="text-primary" size={32} />
            <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">AutoService</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#calculator" className="hover:text-primary transition-colors">Калькулятор</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary hover:opacity-90 transition-opacity">
                Записаться
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Онлайн-запись</DialogTitle>
                <DialogDescription>Выберите услуги, дату и время визита</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Выберите услуги</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {services.map(service => (
                      <Button
                        key={service.id}
                        variant={selectedServices.includes(service.id) ? 'default' : 'outline'}
                        className="justify-start h-auto py-3"
                        onClick={() => toggleService(service.id)}
                      >
                        <Icon name={service.icon as any} size={20} className="mr-2" />
                        <div className="text-left">
                          <div className="font-semibold text-sm">{service.title}</div>
                          <div className="text-xs opacity-70">{service.price}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Дата визита</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start mt-2">
                          <Icon name="Calendar" className="mr-2" size={16} />
                          {date ? format(date, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          locale={ru}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Время</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Ваше имя</Label>
                  <Input
                    placeholder="Иван Иванов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Телефон</Label>
                  <Input
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Комментарий (необязательно)</Label>
                  <Textarea
                    placeholder="Опишите проблему или особенности автомобиля"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {selectedServices.length > 0 && (
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Предварительная стоимость:</span>
                      <span className="text-2xl font-bold text-primary">{calculateTotal().toLocaleString()} ₽</span>
                    </div>
                  </div>
                )}

                <Button onClick={handleBooking} className="w-full gradient-primary">
                  Отправить заявку
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 animate-fade-in">
          <div className="max-w-3xl">
            <Badge className="mb-4 gradient-accent">Быстро • Качественно • Надёжно</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Профессиональный
              <br />
              <span className="gradient-primary bg-clip-text text-transparent">автосервис</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Техническое обслуживание и ремонт автомобилей любой сложности. 
              Опытные мастера, современное оборудование, гарантия качества.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gradient-primary hover:opacity-90 text-lg" onClick={() => setIsBookingOpen(true)}>
                Записаться онлайн
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                <Icon name="Phone" className="mr-2" size={20} />
                +7 (495) 123-45-67
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg">Полный спектр услуг для вашего автомобиля</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="hover-scale cursor-pointer hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={24} className="text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {service.duration}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsBookingOpen(true)}>
                      Записаться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Калькулятор стоимости</h2>
              <p className="text-muted-foreground text-lg">Рассчитайте примерную стоимость услуг</p>
            </div>
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Выберите необходимые услуги</CardTitle>
                <CardDescription>Отметьте галочками нужные позиции</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(service => (
                    <div
                      key={service.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedServices.includes(service.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name={service.icon as any} size={20} className="text-primary" />
                            <span className="font-semibold">{service.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-primary">{service.price}</span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Icon name="Clock" size={12} className="mr-1" />
                              {service.duration}
                            </span>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          selectedServices.includes(service.id)
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`}>
                          {selectedServices.includes(service.id) && (
                            <Icon name="Check" size={16} className="text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedServices.length > 0 && (
                  <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-lg border border-primary/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Выбрано услуг: {selectedServices.length}</div>
                        <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                          {calculateTotal().toLocaleString()} ₽
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">Предварительная стоимость</div>
                      </div>
                      <Button size="lg" className="gradient-primary" onClick={() => setIsBookingOpen(true)}>
                        Записаться на услуги
                        <Icon name="ArrowRight" className="ml-2" size={20} />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedServices.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Calculator" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Выберите услуги для расчёта стоимости</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <CardTitle>Телефон</CardTitle>
                  <CardDescription className="text-lg">+7 (495) 123-45-67</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <CardTitle>Адрес</CardTitle>
                  <CardDescription className="text-lg">Москва, ул. Автомобильная, 15</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon name="Clock" size={24} className="text-white" />
                  </div>
                  <CardTitle>Режим работы</CardTitle>
                  <CardDescription className="text-lg">Пн-Вс: 9:00 - 21:00</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Index;
