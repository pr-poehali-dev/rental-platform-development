import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t bg-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Package" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold">Аренда</span>
            </div>
            <p className="text-sm text-gray-600">
              Платформа для аренды личных вещей между людьми
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
  );
};

export default Footer;
