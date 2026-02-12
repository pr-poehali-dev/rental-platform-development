import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [userType, setUserType] = useState<'renter' | 'owner'>('renter');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Все', icon: 'Grid3x3' },
    { id: 'tools', name: 'Инструменты', icon: 'Wrench' },
    { id: 'electronics', name: 'Техника', icon: 'Laptop' },
    { id: 'sports', name: 'Спорт', icon: 'Dumbbell' },
    { id: 'furniture', name: 'Мебель', icon: 'Armchair' },
    { id: 'camping', name: 'Туризм', icon: 'Tent' },
  ];

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

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Package" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900">Аренда</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Каталог</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Как это работает</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Помощь</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>ВЫ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 bg-gradient-to-br from-primary/5 via-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Арендуй что угодно.<br />
              <span className="text-primary">Рядом с домом.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Платформа для аренды личных вещей между людьми. Инструменты, техника, спортинвентарь — всё в одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-4">
              <div className="flex-1 relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Что вы ищете?" 
                  className="pl-12 h-14 text-lg border-gray-200 focus:border-primary"
                />
              </div>
              <Button size="lg" className="h-14 px-8 text-lg">
                Найти
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categories.slice(1).map((cat) => (
                <Button
                  key={cat.id}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <Icon name={cat.icon} size={16} className="mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Популярные товары</h2>
              <p className="text-gray-600 mt-1">Выбирайте из {filteredItems.length} доступных предложений</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select defaultValue="popular">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Популярные</SelectItem>
                  <SelectItem value="price-low">Цена: низкая</SelectItem>
                  <SelectItem value="price-high">Цена: высокая</SelectItem>
                  <SelectItem value="rating">Рейтинг</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex-shrink-0"
              >
                <Icon name={cat.icon} size={18} className="mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900 hover:bg-white">
                    {item.condition}
                  </Badge>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-3 left-3 bg-white/90 hover:bg-white"
                  >
                    <Icon name="Heart" size={18} />
                  </Button>
                </div>
                
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon name="MapPin" size={16} />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.owner}`} />
                      <AvatarFallback>{item.owner[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{item.owner}</span>
                    <span className="text-xs text-gray-400">• {item.reviews} отзывов</span>
                  </div>

                  <div className="pt-3 border-t flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{item.price} ₽</div>
                      <div className="text-sm text-gray-500">за {item.period}</div>
                    </div>
                    <Button size="sm" className="px-6">
                      Забронировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="renter" className="w-full">
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Личный кабинет</h2>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="renter" onClick={() => setUserType('renter')}>
                    <Icon name="ShoppingBag" size={18} className="mr-2" />
                    Арендатор
                  </TabsTrigger>
                  <TabsTrigger value="owner" onClick={() => setUserType('owner')}>
                    <Icon name="Package" size={18} className="mr-2" />
                    Владелец
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="renter" className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Clock" className="text-primary" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">3</div>
                      <div className="text-sm text-gray-600 mt-1">Активные аренды</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Heart" className="text-primary" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600 mt-1">Избранное</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="CheckCircle" className="text-primary" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">24</div>
                      <div className="text-sm text-gray-600 mt-1">Завершенных</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Текущие бронирования</h3>
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <img 
                            src={`https://images.unsplash.com/photo-${i === 1 ? '1504148455328' : '1526170375885'}-c376907d081c?w=100`}
                            className="w-16 h-16 object-cover rounded-lg"
                            alt=""
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{i === 1 ? 'Электродрель Bosch' : 'GoPro Hero 10'}</h4>
                            <p className="text-sm text-gray-600">15-17 февраля 2026</p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Активно
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="owner" className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Package" className="text-primary" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">8</div>
                      <div className="text-sm text-gray-600 mt-1">Мои товары</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="TrendingUp" className="text-primary" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">15 420 ₽</div>
                      <div className="text-sm text-gray-600 mt-1">Заработано</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Star" className="text-primary" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900">4.9</div>
                      <div className="text-sm text-gray-600 mt-1">Рейтинг</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Мои товары</h3>
                      <Button>
                        <Icon name="Plus" size={18} className="mr-2" />
                        Добавить товар
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <img 
                            src={`https://images.unsplash.com/photo-${i === 1 ? '1504148455328' : i === 2 ? '1526170375885' : '1551698618'}-c376907d081c?w=100`}
                            className="w-16 h-16 object-cover rounded-lg"
                            alt=""
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {i === 1 ? 'Электродрель Bosch' : i === 2 ? 'GoPro Hero 10' : 'Сноуборд Burton'}
                            </h4>
                            <p className="text-sm text-gray-600">{i === 1 ? '500' : i === 2 ? '1500' : '800'} ₽ / день</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Eye" size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Package" className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold">Аренда</span>
              </div>
              <p className="text-gray-600 text-sm">
                Платформа для удобной аренды личных вещей между людьми.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Юридическое</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Условия использования</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            © 2026 Аренда. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;