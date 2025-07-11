import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import useAuthUser from '@/hooks/useAuthUser';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const location = useLocation();
  const hiddenPaths = ['/secured/v1/admin', '/s/client/dashboard'];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }



  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'How We Work', path: '/how-we-work' },
    { name: 'Projects', path: '/projects' },
    { name: 'Equipments', path: '/equipments' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Certifications', path: '/certifications' },
    // { name: 'Blog', path: '/blogs' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className={`flex dark:bg-none items-center space-x-3 ${
          !isScrolled && "bg-white"
          }`}>
            <img 
              src="/uploads/91a86cb5-51d9-4ccb-a86e-e0d29f1d71e9.png" 
              alt={COMPANY_INFO.name}
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : isScrolled 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white bg-transparent'}`}
            >
              {theme === 'light' ? <Moon className="h-4 w-4  bg-transparent" /> : <Sun className="h-4 w-4" />}
            </Button>
            
            {isAuthenticated ? (
              <Link to="/s/client/dashboard">
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white rounded-sm"
                >
                  My Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/s/login">
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white rounded-sm"
                >
                  Client Login
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5 dark:bg-transparent" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm px-3 font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;