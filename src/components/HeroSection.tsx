import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface HeroSectionProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

const HeroSection = ({ categories, onCategoryClick }: HeroSectionProps) => {
  return (
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
                onClick={() => onCategoryClick(cat.id)}
              >
                <Icon name={cat.icon} size={16} className="mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
