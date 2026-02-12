import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Item {
  id: number;
  title: string;
  category: string;
  price: number;
  period: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  owner: string;
  condition: string;
}

interface ItemsGridProps {
  categories: Category[];
  items: Item[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  userType: 'renter' | 'owner';
  onUserTypeChange: (type: 'renter' | 'owner') => void;
}

const ItemsGrid = ({ 
  categories, 
  items, 
  selectedCategory, 
  onCategoryChange,
  userType,
  onUserTypeChange
}: ItemsGridProps) => {
  const navigate = useNavigate();
  
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Tabs value={userType} onValueChange={(v) => onUserTypeChange(v as 'renter' | 'owner')} className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Популярные предложения</h2>
              <p className="text-gray-600">Лучшие вещи в вашем районе</p>
            </div>
            
            <TabsList className="grid w-full sm:w-auto grid-cols-2">
              <TabsTrigger value="renter" className="gap-2">
                <Icon name="Search" size={16} />
                Арендовать
              </TabsTrigger>
              <TabsTrigger value="owner" className="gap-2">
                <Icon name="PlusCircle" size={16} />
                Сдать в аренду
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="renter" className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(cat.id)}
                  className="whitespace-nowrap"
                >
                  <Icon name={cat.icon} size={16} className="mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => navigate(`/item/${item.id}`)}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 right-3 bg-white text-gray-900 hover:bg-white">
                      {item.condition}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{item.title}</h3>
                      <div className="flex items-center gap-1 text-sm">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-gray-500">({item.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="MapPin" size={16} />
                      <span>{item.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{item.owner[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{item.owner}</span>
                    </div>

                    <div className="flex items-baseline gap-1 pt-2">
                      <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                      <span className="text-gray-500">/ {item.period}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button className="flex-1" onClick={(e) => { e.stopPropagation(); navigate(`/item/${item.id}`); }}>
                      Забронировать
                    </Button>
                    <Button variant="outline" size="icon" onClick={(e) => e.stopPropagation()}>
                      <Icon name="Heart" size={18} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="owner" className="space-y-6">
            <Card className="border-dashed border-2 p-12 text-center hover:border-primary transition-colors">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Upload" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Разместите своё объявление</h3>
                <p className="text-gray-600">
                  Зарабатывайте на вещах, которые простаивают. Это просто и безопасно!
                </p>
                <Button size="lg" className="mt-4" onClick={() => navigate('/create-listing')}>
                  <Icon name="PlusCircle" size={20} className="mr-2" />
                  Добавить объявление
                </Button>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              {[
                { icon: 'Shield', title: 'Безопасность', desc: 'Проверенные арендаторы и страховка' },
                { icon: 'Banknote', title: 'Доход', desc: 'Зарабатывайте до 50 000 ₽ в месяц' },
                { icon: 'Clock', title: 'Гибкость', desc: 'Вы сами выбираете условия аренды' },
              ].map((feature, i) => (
                <Card key={i} className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={feature.icon} className="text-primary" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ItemsGrid;