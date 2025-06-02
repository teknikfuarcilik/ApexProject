import React from 'react';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
import { Layout, Calendar, ArrowUpRight } from 'lucide-react';

const RentalDashboard = (props: any) => {
  const navigate = useNavigate();
  const filteredProps = {
    ...props,
    events: props.events.filter((ev: any) => ev.type === 'kiralik'),
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Toplam Kiralama</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-800">{props.events.filter((ev: any) => ev.type === 'kiralik').length}</h3>
          </div>
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Layout className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Bu Ay</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-800">{
              props.events.filter((ev: any) => {
                if (ev.type !== 'kiralik') return false;
                const now = new Date();
                const eventDate = new Date(ev.date);
                return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
              }).length
            }</h3>
          </div>
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <Calendar className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Aktif Kiralama</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-800">{
              props.events.filter((ev: any) => ev.type === 'kiralik' && new Date(ev.date) >= new Date()).length
            }</h3>
          </div>
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-6">
        <button
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/kiralama-yeni')}
        >
          Kiralama Kaydı Ekle
        </button>
      </div>
      <Dashboard {...filteredProps} typeLabel="Kiralama" title="LED Ekran Kiralamaları" />
    </div>
  );
};

export default RentalDashboard; 