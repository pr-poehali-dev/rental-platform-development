import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface User {
  id: number;
  email: string;
  full_name: string;
  user_type: string;
}

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const items = [
    {
      id: 1,
      title: 'Электродрель Bosch',
      category: 'tools',
      price: 500,
      period: 'день',
      location: 'Москва, Арбат',
      rating: 4.8,
      reviews: 23,
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
      owner: 'Иван С.',
      ownerRating: 4.9,
      ownerReviews: 156,
      condition: 'Отличное',
      description: 'Профессиональная электродрель Bosch мощностью 800W. Идеально подходит для домашнего ремонта и строительных работ. В комплекте набор свёрл и кейс для хранения.',
      features: ['Мощность 800W', 'Регулировка скорости', 'Реверс', 'Кейс в комплекте', 'Набор свёрл'],
      rules: ['Не использовать во влажной среде', 'Вернуть в чистом виде', 'Залог 2000 ₽'],
    },
    {
      id: 2,
      title: 'GoPro Hero 10',
      category: 'electronics',
      price: 1500,
      period: 'день',
      location: 'Москва, Тверская',
      rating: 5.0,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
      owner: 'Анна К.',
      ownerRating: 5.0,
      ownerReviews: 89,
      condition: 'Как новое',
      description: 'Экшн-камера GoPro Hero 10 с 5K видео. Отлично подходит для съёмки спорта, путешествий и активного отдыха. В комплекте водонепроницаемый бокс и крепления.',
      features: ['5K видео 60fps', 'Водонепроницаемый бокс', 'Стабилизация HyperSmooth', 'Крепления в комплекте', 'Карта памяти 128GB'],
      rules: ['Залог 15000 ₽', 'Страховка обязательна', 'Вернуть в оригинальной упаковке'],
    },
  ];

  const item = items.find(i => i.id === Number(id)) || items[0];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_data');
  };

  const calculateDays = () => {
    if (!dateRange.from || !dateRange.to) return 0;
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const totalPrice = calculateDays() * item.price;

  const handleBooking = async () => {
    const token = localStorage.getItem('session_token');
    
    if (!token) {
      alert('Пожалуйста, войдите в систему');
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      alert('Выберите даты бронирования');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/9129fc38-44a6-41c3-a36b-ec8a54dae1a6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          item_id: Number(id),
          start_date: format(dateRange.from, 'yyyy-MM-dd'),
          end_date: format(dateRange.to, 'yyyy-MM-dd')
        })
      });

      if (response.ok) {
        alert('Бронирование успешно создано!');
        navigate('/profile');
      } else {
        const error = await response.json();
        alert(error.error || 'Ошибка при бронировании');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Не удалось создать бронирование');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header 
        user={user}
        onLoginClick={() => {}}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к каталогу
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-[400px] object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-white text-gray-900 hover:bg-white">
                {item.condition}
              </Badge>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{item.rating}</span>
                      <span className="text-gray-500">({item.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="MapPin" size={18} />
                    <span>{item.location}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-3">Описание</h2>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-3">Характеристики</h2>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <Icon name="Check" size={18} className="text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-3">Правила аренды</h2>
                  <ul className="space-y-2">
                    {item.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <Icon name="Info" size={18} className="text-blue-500 mt-0.5" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-lg">{item.owner[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{item.owner}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span>{item.ownerRating}</span>
                        <span>({item.ownerReviews} отзывов)</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    Написать
                    <Icon name="MessageCircle" size={18} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-primary">{item.price} ₽</span>
                    <span className="text-gray-500">/ {item.period}</span>
                  </div>
                  <p className="text-sm text-gray-600">+ залог при получении</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Выберите даты</h3>
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                    disabled={(date) => date < new Date()}
                    locale={ru}
                    className="rounded-md border"
                  />
                </div>

                {dateRange.from && dateRange.to && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Период</span>
                      <span className="font-medium">
                        {format(dateRange.from, 'd MMM', { locale: ru })} - {format(dateRange.to, 'd MMM', { locale: ru })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Дней</span>
                      <span className="font-medium">{calculateDays()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-semibold">Итого</span>
                      <span className="font-bold text-primary text-xl">{totalPrice} ₽</span>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full h-12 text-lg"
                  disabled={!dateRange.from || !dateRange.to || loading}
                  onClick={handleBooking}
                >
                  {loading ? 'Бронирование...' : 'Забронировать'}
                  <Icon name="Calendar" size={20} className="ml-2" />
                </Button>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={16} className="text-primary" />
                    <span>Безопасная сделка</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="RefreshCw" size={16} className="text-primary" />
                    <span>Бесплатная отмена за 24 часа</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Проверенный владелец</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemDetail;