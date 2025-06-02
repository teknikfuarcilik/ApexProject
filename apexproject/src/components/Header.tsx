import React from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="APEXLS LED TURKEY" className="h-16 w-auto" />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">Ana Sayfa</Link>
          <button
            className="ml-2 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/kiralama')}
          >
            Kiralama
          </button>
          <button
            className="ml-2 px-4 py-2 rounded-md bg-yellow-400 text-gray-900 font-medium hover:bg-yellow-500 transition-colors"
            onClick={() => navigate('/satis')}
          >
            Satın Alma
          </button>
          <Link to="/raporlar" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">Raporlar</Link>
          <div className="relative group">
            <button className="flex items-center text-gray-800 hover:text-blue-600 font-medium transition-colors">
              Daha Fazla <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
              <div className="py-1">
                <Link to="/ayarlar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Ayarlar</Link>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <Link to="/" className="block text-gray-800 hover:text-blue-600 font-medium py-2">Ana Sayfa</Link>
          <Link to="/yeni-kayit" className="block text-gray-800 hover:text-blue-600 font-medium py-2">Yeni Kayıt</Link>
          <Link to="/raporlar" className="block text-gray-800 hover:text-blue-600 font-medium py-2">Raporlar</Link>
          <Link to="/ayarlar" className="block text-gray-800 hover:text-blue-600 font-medium py-2">Ayarlar</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;