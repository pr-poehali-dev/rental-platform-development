import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ItemsGrid from '@/components/ItemsGrid';
import Footer from '@/components/Footer';
import AuthDialog from '@/components/AuthDialog';

interface User {
  id: number;
  email: string;
  full_name: string;
  user_type: string;
}

interface Item {
  id: number;
  title: string;
  category_id: string;
  price: number;
  period: string;
  location: string;
  rating: number;
  reviews_count: number;
  image_url: string;
  owner: string;
  condition: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [userType, setUserType] = useState<'renter' | 'owner'>('renter');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    const userData = localStorage.getItem('user_data');
    if (token && userData) {
      setSessionToken(token);
      setUser(JSON.parse(userData));
    }
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/916b95b6-3d7c-485f-996b-df65abfbe772');
      if (response.ok) {
        const data = await response.json();
        const formattedItems = data.map((item: Record<string, unknown>) => ({
          id: item.id,
          title: item.title,
          category: item.category_id,
          price: item.price,
          period: item.period,
          location: item.location || 'Москва',
          rating: parseFloat(item.rating) || 0,
          reviews: item.reviews_count || 0,
          image: item.image_url || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
          owner: item.owner,
          condition: item.condition || 'Хорошее'
        }));
        setItems(formattedItems);
      }
    } catch (error) {
      console.error('Failed to load items:', error);
      setItems(mockItems);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (userData: User, token: string) => {
    setUser(userData);
    setSessionToken(token);
    localStorage.setItem('session_token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setSessionToken(null);
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_data');
  };

  const categories = [
    { id: 'all', name: 'Все', icon: 'Grid3x3' },
    { id: 'tools', name: 'Инструменты', icon: 'Wrench' },
    { id: 'electronics', name: 'Техника', icon: 'Laptop' },
    { id: 'sports', name: 'Спорт', icon: 'Dumbbell' },
    { id: 'furniture', name: 'Мебель', icon: 'Armchair' },
    { id: 'camping', name: 'Туризм', icon: 'Tent' },
  ];

  const mockItems = [
    {
      id: 1,
      title: 'Электродрель Bosch',
      category: 'tools',
      price: 500,
      period: 'день',
      location: 'Москва, Арбат',
      rating: 4.8,
      reviews: 23,
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
      owner: 'Иван С.',
      condition: 'Отличное',
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
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
      owner: 'Анна К.',
      condition: 'Как новое',
    },
    {
      id: 3,
      title: 'Сноуборд Burton',
      category: 'sports',
      price: 800,
      period: 'день',
      location: 'Москва, Сокол',
      rating: 4.9,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      owner: 'Максим Р.',
      condition: 'Хорошее',
    },
    {
      id: 4,
      title: 'Палатка 4-местная',
      category: 'camping',
      price: 600,
      period: 'день',
      location: 'Москва, Строгино',
      rating: 4.7,
      reviews: 31,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
      owner: 'Дмитрий В.',
      condition: 'Отличное',
    },
    {
      id: 5,
      title: 'MacBook Pro 14"',
      category: 'electronics',
      price: 2000,
      period: 'день',
      location: 'Москва, Китай-город',
      rating: 4.9,
      reviews: 12,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      owner: 'Ольга М.',
      condition: 'Как новое',
    },
    {
      id: 6,
      title: 'Велосипед горный',
      category: 'sports',
      price: 700,
      period: 'день',
      location: 'Москва, Парк культуры',
      rating: 4.6,
      reviews: 27,
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400',
      owner: 'Сергей Л.',
      condition: 'Хорошее',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header 
        user={user}
        onLoginClick={() => setAuthDialogOpen(true)}
        onLogout={handleLogout}
      />

      <HeroSection 
        categories={categories}
        onCategoryClick={setSelectedCategory}
      />

      {loading ? (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">Загрузка объявлений...</p>
        </div>
      ) : (
        <ItemsGrid 
          categories={categories}
          items={items}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          userType={userType}
          onUserTypeChange={setUserType}
        />
      )}

      <Footer />

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;