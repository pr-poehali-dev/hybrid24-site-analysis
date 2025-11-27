import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

const brands = [
  { name: 'Toyota', logo: 'https://cdn.poehali.dev/projects/06c15a5e-698d-45c4-8ef4-b26fa9657aca/files/4e08abc9-6dc7-4175-88e7-4506631ccebe.jpg' },
  { name: 'Honda', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Honda' },
  { name: 'Nissan', logo: 'https://cdn.poehali.dev/projects/06c15a5e-698d-45c4-8ef4-b26fa9657aca/files/94c95c26-2e2d-4849-929a-bbc56961a2b5.jpg' },
  { name: 'Lexus', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Lexus' },
  { name: 'Mazda', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Mazda' },
  { name: 'Mitsubishi', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Mitsubishi' },
  { name: 'Subaru', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Subaru' },
  { name: 'Suzuki', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Suzuki' },
  { name: 'Acura', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Acura' },
  { name: 'Hyundai', logo: 'https://cdn.poehali.dev/projects/06c15a5e-698d-45c4-8ef4-b26fa9657aca/files/b96818be-6317-4095-a3eb-ed039af61550.jpg' },
  { name: 'Kia', logo: 'https://cdn.poehali.dev/projects/06c15a5e-698d-45c4-8ef4-b26fa9657aca/files/97ee8ca9-4c2a-4454-81ee-3c05a54f2661.jpg' },
  { name: 'Haval', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Haval' },
  { name: 'Geely', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Geely' },
  { name: 'Changan', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Changan' },
  { name: 'Belgee', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Belgee' },
  { name: 'Lifan', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Lifan' },
  { name: 'Jetour', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Jetour' },
  { name: 'Tank', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Tank' },
  { name: 'Exeed', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Exeed' },
  { name: 'Omoda', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Omoda' },
  { name: 'GAC', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=GAC' },
  { name: 'Li AUTO', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Li+AUTO' },
  { name: 'JAC', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=JAC' },
  { name: 'Voyah', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Voyah' },
  { name: 'Zeekr', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Zeekr' },
  { name: 'Hongqi', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Hongqi' },
  { name: 'FAW', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=FAW' },
  { name: 'Dongfeng', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Dongfeng' },
  { name: 'Jaecoo', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Jaecoo' },
  { name: 'Bestune', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Bestune' },
  { name: 'Chery', logo: 'https://via.placeholder.com/150x150/ffffff/666666?text=Chery' }
];

interface ServicesSectionProps {
  setIsBookingOpen: (open: boolean) => void;
}

const ServicesSection = ({ setIsBookingOpen }: ServicesSectionProps) => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

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

  return (
    <>
      <section id="services" className="py-12 md:py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-base md:text-lg">Полный спектр услуг для вашего автомобиля</p>
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

      <section id="calculator" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Калькулятор стоимости</h2>
              <p className="text-muted-foreground text-base md:text-lg">Рассчитайте примерную стоимость услуг</p>
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
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{service.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          <div className="flex gap-3 text-sm">
                            <span className="text-primary font-semibold">{service.price}</span>
                            <span className="text-muted-foreground flex items-center">
                              <Icon name="Clock" size={14} className="mr-1" />
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
                  <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 md:p-6 rounded-lg border border-primary/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs md:text-sm text-muted-foreground mb-1">Выбрано услуг: {selectedServices.length}</div>
                        <div className="text-2xl md:text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                          {calculateTotal().toLocaleString()} ₽
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground mt-1">Предварительная стоимость</div>
                      </div>
                      <Button size="lg" className="gradient-primary btn-glow w-full md:w-auto" onClick={() => setIsBookingOpen(true)}>
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

      <section id="brands" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Бренды, с которыми мы работаем</h2>
            <p className="text-muted-foreground text-base md:text-lg">Обслуживаем все популярные марки автомобилей</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {brands.map((brand, index) => (
              <Link
                key={index}
                to={`/brand/${brand.name.toLowerCase()}`}
              >
                <Card
                  className="hover-scale cursor-pointer text-center p-4 md:p-6 lg:p-8 animate-fade-in bg-white"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img src={brand.logo} alt={brand.name} className="w-full h-12 sm:h-16 md:h-20 lg:h-24 object-contain mb-2" />
                  <p className="text-sm font-medium mt-2">{brand.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
