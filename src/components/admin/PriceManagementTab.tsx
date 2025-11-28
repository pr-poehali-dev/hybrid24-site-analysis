import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Brand, Service, Price } from './types';

interface PriceManagementTabProps {
  prices: Price[];
  brands: Brand[];
  services: Service[];
  onRefresh: () => void;
}

const PriceManagementTab = ({ prices, brands, services, onRefresh }: PriceManagementTabProps) => {
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<Price | null>(null);
  const [priceForm, setPriceForm] = useState({ service_id: '', brand_id: '', base_price: '' });

  const openPriceModal = (price?: Price) => {
    if (price) {
      setEditingPrice(price);
      setPriceForm({
        service_id: price.service_id.toString(),
        brand_id: price.brand_id.toString(),
        base_price: price.base_price.toString(),
      });
    } else {
      setEditingPrice(null);
      setPriceForm({ service_id: '', brand_id: '', base_price: '' });
    }
    setPriceModalOpen(true);
  };

  const savePrice = async () => {
    try {
      const method = editingPrice ? 'PUT' : 'POST';
      const body = editingPrice
        ? { id: editingPrice.id, base_price: parseFloat(priceForm.base_price) }
        : {
            service_id: parseInt(priceForm.service_id),
            brand_id: parseInt(priceForm.brand_id),
            base_price: parseFloat(priceForm.base_price),
          };

      const response = await fetch('https://functions.poehali.dev/238c471e-a087-4373-8dcf-cec9258e7a04', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setPriceModalOpen(false);
        onRefresh();
      } else {
        alert(data.error || 'Ошибка при сохранении цены');
      }
    } catch (error) {
      console.error('Error saving price:', error);
      alert('Ошибка при сохранении цены');
    }
  };

  const deletePrice = async (id: number) => {
    if (!confirm('Удалить эту цену?')) return;
    
    try {
      const response = await fetch('https://functions.poehali.dev/238c471e-a087-4373-8dcf-cec9258e7a04', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        onRefresh();
      } else {
        alert(data.error || 'Ошибка при удалении цены');
      }
    } catch (error) {
      console.error('Error deleting price:', error);
      alert('Ошибка при удалении цены');
    }
  };

  return (
    <>
      <TabsContent value="prices" className="space-y-4">
        <Button onClick={() => openPriceModal()} className="gradient-primary">
          <Icon name="Plus" className="mr-2" size={18} />
          Добавить цену
        </Button>

        <div className="space-y-2">
          {prices.map((price) => (
            <Card key={price.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold">{price.brand_name}</div>
                    <div className="text-sm text-muted-foreground">{price.service_title}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary">
                      {price.base_price.toLocaleString()} {price.currency}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openPriceModal(price)}>
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deletePrice(price.id)}>
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <Dialog open={priceModalOpen} onOpenChange={setPriceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPrice ? 'Редактировать цену' : 'Добавить цену'}</DialogTitle>
            <DialogDescription>Укажите цену услуги для бренда</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!editingPrice && (
              <>
                <div className="space-y-2">
                  <Label>Бренд *</Label>
                  <Select value={priceForm.brand_id} onValueChange={(value) => setPriceForm({ ...priceForm, brand_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите бренд" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Услуга *</Label>
                  <Select value={priceForm.service_id} onValueChange={(value) => setPriceForm({ ...priceForm, service_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label>Базовая цена *</Label>
              <Input
                type="number"
                value={priceForm.base_price}
                onChange={(e) => setPriceForm({ ...priceForm, base_price: e.target.value })}
                placeholder="5000"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setPriceModalOpen(false)}>
                Отмена
              </Button>
              <Button onClick={savePrice} className="gradient-primary">
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PriceManagementTab;
