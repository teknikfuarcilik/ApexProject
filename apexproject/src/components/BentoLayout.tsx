import React from 'react';
import { Calendar, TrendingUp, PieChart, Maximize2, Layout, Users } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description?: string;
  icon: React.ElementType;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  children?: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  size = 'small',
  color = 'from-blue-500 to-blue-700',
  children 
}) => {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-2',
    large: 'col-span-2 row-span-2'
  };

  return (
    <div 
      className={`${sizeClasses[size]} bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 group`}
    >
      <div className="h-full p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
          </div>
          <div className={`p-3 rounded-full bg-gradient-to-br ${color} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

const BentoLayout: React.FC = () => {
  // Mock data for charts
  const monthlyStats = [
    { month: 'Oca', value: 12 },
    { month: 'Şub', value: 19 },
    { month: 'Mar', value: 15 },
    { month: 'Nis', value: 22 },
    { month: 'May', value: 28 },
    { month: 'Haz', value: 25 },
  ];

  // Distribution of event types
  const eventTypes = [
    { type: 'Konser', percentage: 35 },
    { type: 'Kurumsal', percentage: 25 },
    { type: 'Konferans', percentage: 20 },
    { type: 'Diğer', percentage: 20 },
  ];

  // Upcoming events
  const upcomingEvents = [
    { id: 1, name: 'Teknoloji Zirvesi 2025', date: '2025-05-20', customer: 'GlobalTech A.Ş.' },
    { id: 2, name: 'Yaz Müzik Festivali', date: '2025-06-15', customer: 'EventWave' },
    { id: 3, name: 'Ürün Lansmanı', date: '2025-05-28', customer: 'Innovate Corp' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analiz Özeti</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Monthly Rentals Card */}
        <BentoCard 
          title="Aylık Kiralamalar" 
          description="Son 6 ay" 
          icon={TrendingUp} 
          size="medium"
          color="from-blue-500 to-blue-700"
        >
          <div className="h-full flex items-end pt-4">
            <div className="w-full flex items-end justify-between h-32">
              {monthlyStats.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-8">
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-1000 group-hover:bg-blue-600"
                      style={{ 
                        height: `${(item.value / Math.max(...monthlyStats.map(s => s.value))) * 100}%`,
                        animation: `grow 1s ease-out ${index * 0.1}s` 
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
        
        {/* Event Type Distribution */}
        <BentoCard 
          title="Etkinlik Türleri" 
          description="Kategoriye göre dağılım" 
          icon={PieChart}
          size="medium"
          color="from-purple-500 to-purple-700"
        >
          <div className="flex flex-col h-full justify-center space-y-4 pt-2">
            {eventTypes.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.type}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${item.percentage}%`,
                      animation: `grow-width 1.5s ease-out ${index * 0.2}s` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
        
        {/* Screen Sizes */}
        <BentoCard 
          title="Ekran Envanteri" 
          description="Mevcut boyutlar" 
          icon={Maximize2}
          color="from-green-500 to-green-700"
        >
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">4 x 3 m</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">6 x 4 m</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">8 x 5 m</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">10 x 6 m</span>
          </div>
        </BentoCard>
        
        {/* Stage Sizes */}
        <BentoCard 
          title="Sahne Konfigürasyonları" 
          icon={Layout}
          color="from-orange-500 to-orange-700"
        >
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">12 x 8 m</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">16 x 10 m</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">20 x 15 m</span>
          </div>
        </BentoCard>
        
        {/* Upcoming Events */}
        <BentoCard 
          title="Yaklaşan Etkinlikler" 
          icon={Calendar}
          size="large"
          color="from-indigo-500 to-indigo-700"
        >
          <div className="space-y-4 mt-2">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start p-3 bg-indigo-50 rounded-lg">
                <div className="mr-4 bg-white p-2 rounded-md text-center min-w-14">
                  <span className="block text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString('tr-TR', { month: 'short' })}
                  </span>
                  <span className="block text-lg font-bold text-indigo-700">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{event.name}</h4>
                  <p className="text-sm text-gray-500">{event.customer}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 mt-2 text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors text-center">
              Tüm Etkinlikleri Görüntüle
            </button>
          </div>
        </BentoCard>
        
        {/* Customer Stats */}
        <BentoCard 
          title="Müşteri İstatistikleri" 
          icon={Users}
          color="from-cyan-500 to-cyan-700"
        >
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-cyan-50 p-3 rounded-lg text-center">
              <span className="block text-2xl font-bold text-cyan-700">42</span>
              <span className="text-sm text-gray-500">Tekrar Eden Müşteri</span>
            </div>
            <div className="bg-cyan-50 p-3 rounded-lg text-center">
              <span className="block text-2xl font-bold text-cyan-700">18</span>
              <span className="text-sm text-gray-500">Bu Ay Yeni</span>
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  );
};

export default BentoLayout;