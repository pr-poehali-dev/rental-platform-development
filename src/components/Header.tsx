import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  email: string;
  full_name: string;
  user_type: string;
}

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header = ({ user, onLoginClick, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
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
            {user ? (
              <>
                <Button variant="ghost" size="icon">
                  <Icon name="Heart" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Bell" size={20} />
                </Button>
                <div className="flex items-center gap-2">
                  <Avatar className="cursor-pointer" onClick={() => navigate('/profile')}>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                    <AvatarFallback>{user.full_name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium cursor-pointer hover:text-primary" onClick={() => navigate('/profile')}>{user.full_name}</div>
                    <button onClick={onLogout} className="text-xs text-gray-500 hover:text-primary">
                      Выйти
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Button onClick={onLoginClick}>
                <Icon name="User" size={18} className="mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;