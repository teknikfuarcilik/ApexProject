import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, ShoppingCart, BarChart2, Boxes, Settings } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      <div
        className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate('/kiralama')}
      >
        <Layout className="h-16 w-16 text-white mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Kiralama Kayıtları</h2>
        <p className="text-white opacity-80">LED ekran kiralama işlemlerinizi yönetin</p>
      </div>
      <div
        className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate('/satis')}
      >
        <ShoppingCart className="h-16 w-16 text-white mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Satın Alma Kayıtları</h2>
        <p className="text-white opacity-80">LED ekran satış işlemlerinizi yönetin</p>
      </div>
      <div
        className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate('/raporlar')}
      >
        <BarChart2 className="h-16 w-16 text-white mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Raporlar</h2>
        <p className="text-white opacity-80">Kiralama ve satış verilerinizden raporlar alın</p>
      </div>
      <div
        className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate('/stoklar')}
      >
        <Boxes className="h-16 w-16 text-white mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Stoklarımız</h2>
        <p className="text-white opacity-80">LED ekran stok durumunu görüntüleyin</p>
      </div>
      <div
        className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate('/teklif')}
      >
        <ShoppingCart className="h-16 w-16 text-white mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Teklif Oluştur</h2>
        <p className="text-white opacity-80">Satış teklifi oluşturun ve PDF çıktısı alın</p>
      </div>
      <div
        className="bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate('/ayarlar')}
      >
        <Settings className="h-16 w-16 text-white mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Ayarlar</h2>
        <p className="text-white opacity-80">Sistem ayarlarını yönetin</p>
      </div>
    </div>
  );
};

export default Home; 