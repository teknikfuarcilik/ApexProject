import React, { useState } from 'react';
import { Calendar, Layout, Search, Filter, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  events: any[];
  setEvents: (events: any[]) => void;
  typeLabel?: string;
  title?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ events, setEvents, typeLabel, title }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);
  const navigate = useNavigate();

  // Etkinlik türü Türkçe karşılıkları
  const eventTypeLabels: Record<string, string> = {
    concert: 'Konser',
    conference: 'Konferans',
    corporate: 'Kurumsal Etkinlik',
    wedding: 'Düğün',
    festival: 'Festival',
    sports: 'Spor Etkinliği',
    fair: 'Fuar',
    launch: 'Ürün Lansmanı',
    meeting: 'Toplantı',
    seminar: 'Seminer',
    exhibition: 'Sergi',
    theatre: 'Tiyatro',
    cinema: 'Sinema Gösterimi',
    education: 'Eğitim',
    other: 'Diğer',
  };

  // Ekran türü Türkçe karşılıkları
  const screenTypeLabels: Record<string, string> = {
    indoor: 'İç Mekan',
    outdoor: 'Dış Mekan',
    floor: 'Floor',
  };

  // Filter events based on status and search query
  const filteredEvents = events.filter(event => {
    const statusLabel = getEventStatusLabel(event).label;
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'upcoming' && statusLabel === 'Yaklaşan') ||
      (activeFilter === 'completed' && statusLabel === 'Tamamlandı');
    const matchesSearch = event.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // İstatistikler dinamik hesaplanıyor
  const now = new Date();
  const totalCount = filteredEvents.length;
  const thisMonthCount = filteredEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  }).length;
  const activeCount = filteredEvents.filter(event => event.status === 'upcoming').length;

  const statsData = [
    { label: 'Toplam Kiralama', value: totalCount, icon: Layout, color: 'bg-blue-100 text-blue-600' },
    { label: 'Bu Ay', value: thisMonthCount, icon: Calendar, color: 'bg-purple-100 text-purple-600' },
    { label: 'Aktif Kiralama', value: activeCount, icon: ArrowUpRight, color: 'bg-green-100 text-green-600' }
  ];

  // Kayıt için dinamik durum etiketi
  function getEventStatusLabel(event: any) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDate = new Date(event.date + 'T' + (event.time || '00:00'));
    const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (eventDate < today) {
      return { label: 'Tamamlandı', color: 'bg-gray-100 text-gray-800' };
    } else if (diffDays <= 10 && diffDays >= 0) {
      return { label: 'Yaklaşan', color: 'bg-green-100 text-green-800' };
    } else {
      return { label: 'Planlandı', color: 'bg-blue-100 text-blue-800' };
    }
  }

  return (
    <div className="w-full">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">{title || 'LED Ekran Kayıtları'}</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Etkinlik ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center justify-between w-full md:w-auto px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Filter size={18} className="mr-2" />
                <span>Filtrele</span>
                {isFiltersOpen ? 
                  <ChevronUp size={16} className="ml-2" /> : 
                  <ChevronDown size={16} className="ml-2" />
                }
              </button>
              
              {isFiltersOpen && (
                <div className="absolute mt-2 right-0 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveFilter('all');
                        setIsFiltersOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeFilter === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Tüm Etkinlikler
                    </button>
                    <button
                      onClick={() => {
                        setActiveFilter('upcoming');
                        setIsFiltersOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeFilter === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Yaklaşan
                    </button>
                    <button
                      onClick={() => {
                        setActiveFilter('completed');
                        setIsFiltersOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeFilter === 'completed' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Tamamlanan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Events Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih & Saat
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Etkinlik Türü
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ekran Ölçüsü
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metrekare (m²)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ekran Türü
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(event.date).toLocaleDateString('tr-TR', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{event.customerName}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[200px]">{event.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {eventTypeLabels[event.eventType] || event.eventType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.screenSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.area}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {screenTypeLabels[event.screenType] || event.screenType || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(() => {
                      const status = getEventStatusLabel(event);
                      return (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color} mr-2`}>
                          {status.label}
                        </span>
                      );
                    })()}
                    {typeLabel && (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeLabel === 'Kiralama' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {typeLabel}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => {
                        setSelectedEvent(event);
                        setViewModalOpen(true);
                      }}
                    >
                      Görüntüle
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      onClick={() => {
                        setSelectedEvent(event);
                        setEditModalOpen(true);
                      }}
                    >
                      Düzenle
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        setEventToDelete(event);
                        setDeleteModalOpen(true);
                      }}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Kriterlerinize uygun etkinlik bulunamadı.</p>
            </div>
          )}
        </div>
      </div>

      {/* Görüntüle Modal */}
      {viewModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setViewModalOpen(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Etkinlik Detayları</h3>
            <div className="space-y-2 text-gray-700">
              <div><b>Tarih:</b> {selectedEvent.date} {selectedEvent.time}</div>
              <div><b>Müşteri:</b> {selectedEvent.customerName}</div>
              <div><b>Etkinlik Türü:</b> {eventTypeLabels[selectedEvent.eventType] || selectedEvent.eventType}</div>
              <div><b>Adres:</b> {selectedEvent.address}</div>
              <div><b>Ekran Ölçüsü:</b> {selectedEvent.screenSize}</div>
              <div><b>Metrekare:</b> {selectedEvent.area}</div>
              <div><b>Ekran Türü:</b> {screenTypeLabels[selectedEvent.screenType] || selectedEvent.screenType || '-'}</div>
              <div><b>Sahne Ölçüsü:</b> {selectedEvent.stageSize}</div>
              <div><b>Kurulum:</b> {selectedEvent.installationRequired ? 'Evet' : 'Hayır'}</div>
              <div><b>Durum:</b> {selectedEvent.status === 'upcoming' ? 'Yaklaşan' : 'Tamamlandı'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Düzenle Modal */}
      {editModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setEditModalOpen(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Etkinlik Düzenle</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                setEvents(events.map(ev => ev.id === selectedEvent.id ? selectedEvent : ev));
                setEditModalOpen(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Tarih</label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    value={selectedEvent.date}
                    onChange={e => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Saat</label>
                  <input
                    type="time"
                    className="w-full border rounded px-3 py-2"
                    value={selectedEvent.time}
                    onChange={e => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Müşteri Adı</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={selectedEvent.customerName}
                  onChange={e => setSelectedEvent({ ...selectedEvent, customerName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Etkinlik Türü</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedEvent.eventType}
                  onChange={e => setSelectedEvent({ ...selectedEvent, eventType: e.target.value })}
                >
                  <option value="concert">Konser</option>
                  <option value="conference">Konferans</option>
                  <option value="corporate">Kurumsal Etkinlik</option>
                  <option value="wedding">Düğün</option>
                  <option value="festival">Festival</option>
                  <option value="sports">Spor Etkinliği</option>
                  <option value="fair">Fuar</option>
                  <option value="launch">Ürün Lansmanı</option>
                  <option value="meeting">Toplantı</option>
                  <option value="seminar">Seminer</option>
                  <option value="exhibition">Sergi</option>
                  <option value="theatre">Tiyatro</option>
                  <option value="cinema">Sinema Gösterimi</option>
                  <option value="education">Eğitim</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Adres</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={selectedEvent.address}
                  onChange={e => setSelectedEvent({ ...selectedEvent, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Ekran Ölçüsü</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={selectedEvent.screenSize}
                    onChange={e => setSelectedEvent({ ...selectedEvent, screenSize: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Metrekare (m²)</label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    value={selectedEvent.area}
                    onChange={e => setSelectedEvent({ ...selectedEvent, area: e.target.value })}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Sahne Ölçüsü</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={selectedEvent.stageSize}
                    onChange={e => setSelectedEvent({ ...selectedEvent, stageSize: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedEvent.installationRequired}
                  onChange={e => setSelectedEvent({ ...selectedEvent, installationRequired: e.target.checked })}
                  className="mr-2"
                  id="edit-installation"
                />
                <label htmlFor="edit-installation" className="text-gray-700 font-medium">Kurulum Gerekiyor mu?</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Telefon</label>
                  <input
                    type="tel"
                    className="w-full border rounded px-3 py-2"
                    value={selectedEvent.phone || ''}
                    onChange={e => setSelectedEvent({ ...selectedEvent, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">E-posta</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={selectedEvent.email || ''}
                    onChange={e => setSelectedEvent({ ...selectedEvent, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Teknik Gereksinimler</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={selectedEvent.technicalRequirements || ''}
                  onChange={e => setSelectedEvent({ ...selectedEvent, technicalRequirements: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Notlar</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={selectedEvent.notes || ''}
                  onChange={e => setSelectedEvent({ ...selectedEvent, notes: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                  onClick={() => setEditModalOpen(false)}
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Silme Onay Modalı */}
      {deleteModalOpen && eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setDeleteModalOpen(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 text-red-600">Kaydı Sil</h3>
            <p className="mb-6">Bu kaydı silmek istediğinize emin misiniz?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                onClick={() => setDeleteModalOpen(false)}
              >
                Vazgeç
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  setEvents(events.filter(ev => ev.id !== eventToDelete.id));
                  setDeleteModalOpen(false);
                  setEventToDelete(null);
                }}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;