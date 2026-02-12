import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  rating?: number;
  reviews_count?: number;
}

interface Booking {
  id: number;
  title: string;
  image_url: string;
  location: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  owner_name: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    const userData = localStorage.getItem('user_data');
    
    if (!token || !userData) {
      navigate('/');
      return;
    }

    setUser(JSON.parse(userData));
    loadBookings(token);
  }, [navigate]);

  const loadBookings = async (token: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/9129fc38-44a6-41c3-a36b-ec8a54dae1a6', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_data');
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
      pending: { label: 'Ожидает', variant: 'secondary' },
      confirmed: { label: 'Подтверждено', variant: 'default' },
      active: { label: 'Активно', variant: 'default' },
      completed: { label: 'Завершено', variant: 'outline' },
      cancelled: { label: 'Отменено', variant: 'destructive' }
    };
    
    const s = statusMap[status] || statusMap.pending;
    return <Badge variant={s.variant}>{s.label}</Badge>;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header 
        user={user}
        onLoginClick={() => {}}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                <AvatarFallback className="text-3xl">{user.full_name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.full_name}</h1>
                <p className="text-gray-600 mb-3">{user.email}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{user.rating?.toFixed(1) || '0.0'}</span>
                    <span className="text-gray-500">({user.reviews_count || 0} отзывов)</span>
                  </div>
                  <Badge>{user.user_type === 'renter' ? 'Арендатор' : user.user_type === 'owner' ? 'Владелец' : 'Арендатор и Владелец'}</Badge>
                </div>
              </div>

              <Button variant="outline" onClick={() => navigate('/')}>
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="bookings">
              <Icon name="Calendar" size={16} className="mr-2" />
              Бронирования
            </TabsTrigger>
            <TabsTrigger value="myitems">
              <Icon name="Package" size={16} className="mr-2" />
              Мои товары
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Icon name="Heart" size={16} className="mr-2" />
              Избранное
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Мои бронирования</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Загрузка...</div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="Calendar" size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-4">У вас пока нет бронирований</p>
                    <Button onClick={() => navigate('/')}>
                      Перейти к каталогу
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden">
                        <div className="flex gap-4 p-4">
                          <img 
                            src={booking.image_url || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200'}
                            alt={booking.title}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg">{booking.title}</h3>
                              {getStatusBadge(booking.status)}
                            </div>
                            
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Icon name="MapPin" size={16} />
                                <span>{booking.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon name="Calendar" size={16} />
                                <span>
                                  {format(new Date(booking.start_date), 'd MMM', { locale: ru })} - {format(new Date(booking.end_date), 'd MMM yyyy', { locale: ru })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon name="User" size={16} />
                                <span>Владелец: {booking.owner_name}</span>
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-2xl font-bold text-primary">{booking.total_price} ₽</span>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Icon name="MessageCircle" size={16} className="mr-2" />
                                  Написать
                                </Button>
                                <Button variant="outline" size="sm">
                                  Подробнее
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="myitems" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Мои объявления</CardTitle>
                  <Button onClick={() => navigate('/create-listing')}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить объявление
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="Package" size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 mb-4">У вас пока нет объявлений</p>
                  <Button onClick={() => navigate('/create-listing')}>
                    <Icon name="PlusCircle" size={18} className="mr-2" />
                    Создать первое объявление
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Избранное</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="Heart" size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 mb-4">Вы пока ничего не добавили в избранное</p>
                  <Button onClick={() => navigate('/')}>
                    Перейти к каталогу
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
