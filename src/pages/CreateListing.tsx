import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface User {
  id: number;
  email: string;
  full_name: string;
  user_type: string;
}

const CreateListing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    period: 'день',
    location: '',
    condition: 'Отличное',
    image_url: '',
    features: '',
    rules: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    const userData = localStorage.getItem('user_data');
    
    if (!token || !userData) {
      navigate('/');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_data');
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('session_token');
      
      const response = await fetch('https://functions.poehali.dev/916b95b6-3d7c-485f-996b-df65abfbe772', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          features: formData.features.split('\n').filter(f => f.trim()),
          rules: formData.rules.split('\n').filter(r => r.trim())
        })
      });

      if (response.ok) {
        navigate('/profile');
      } else {
        alert('Ошибка при создании объявления');
      }
    } catch (error) {
      console.error('Failed to create listing:', error);
      alert('Не удалось создать объявление');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header 
        user={user}
        onLoginClick={() => {}}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/profile')}
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к профилю
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Создать объявление</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Название *</Label>
                <Input 
                  id="title"
                  placeholder="Например: Электродрель Bosch"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea 
                  id="description"
                  placeholder="Подробное описание вашего товара"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Категория *</Label>
                  <Select value={formData.category_id} onValueChange={(v) => setFormData({...formData, category_id: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tools">Инструменты</SelectItem>
                      <SelectItem value="electronics">Техника</SelectItem>
                      <SelectItem value="sports">Спорт</SelectItem>
                      <SelectItem value="furniture">Мебель</SelectItem>
                      <SelectItem value="camping">Туризм</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">Состояние</Label>
                  <Select value={formData.condition} onValueChange={(v) => setFormData({...formData, condition: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Как новое">Как новое</SelectItem>
                      <SelectItem value="Отличное">Отличное</SelectItem>
                      <SelectItem value="Хорошее">Хорошее</SelectItem>
                      <SelectItem value="Удовлетворительное">Удовлетворительное</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Цена *</Label>
                  <Input 
                    id="price"
                    type="number"
                    placeholder="500"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="period">Период</Label>
                  <Select value={formData.period} onValueChange={(v) => setFormData({...formData, period: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="час">час</SelectItem>
                      <SelectItem value="день">день</SelectItem>
                      <SelectItem value="неделя">неделя</SelectItem>
                      <SelectItem value="месяц">месяц</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Местоположение</Label>
                <Input 
                  id="location"
                  placeholder="Москва, Арбат"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="image_url">Ссылка на изображение</Label>
                <Input 
                  id="image_url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="features">Характеристики (каждая с новой строки)</Label>
                <Textarea 
                  id="features"
                  placeholder="Мощность 800W&#10;Регулировка скорости&#10;Реверс"
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="rules">Правила аренды (каждое с новой строки)</Label>
                <Textarea 
                  id="rules"
                  placeholder="Залог 2000 ₽&#10;Вернуть в чистом виде&#10;Не использовать во влажной среде"
                  value={formData.rules}
                  onChange={(e) => setFormData({...formData, rules: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Создание...' : 'Создать объявление'}
                  <Icon name="Check" size={18} className="ml-2" />
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/profile')}>
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default CreateListing;
