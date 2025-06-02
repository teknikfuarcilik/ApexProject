import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Calendar, ArrowUpRight } from 'lucide-react';

const ekranTurleri: Record<string, string> = {
  indoor: 'İç Mekan',
  outdoor: 'Dış Mekan',
  rental: 'Rental',
  fixed: 'Sabit',
  transparent: 'Şeffaf',
  other: 'Diğer',
};

const SalesDashboard = (props: any) => {
  const navigate = useNavigate();
  const events = props.events.filter((ev: any) => ev.type === 'satis');
  const setEvents = props.setEvents;

  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [eventToDelete, setEventToDelete] = React.useState<any>(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editEvent, setEditEvent] = React.useState<any>(null);

  // İstatistikler
  const now = new Date();
  const totalCount = events.length;
  const completedCount = events.filter((event: any) => event.status === 'tamamlandi').length;
  const cancelledCount = events.filter((event: any) => event.status === 'vazgecildi').length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Toplam Satın Alma Kayıtları</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-800">{totalCount}</h3>
          </div>
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <ShoppingCart className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Tamamlanan Satış</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-800">{completedCount}</h3>
          </div>
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Vazgeçilen Satışlar</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-800">{cancelledCount}</h3>
          </div>
          <div className="p-3 rounded-full bg-red-100 text-red-600">
            <ShoppingCart className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-6">
        <button
          className="px-6 py-2 rounded-lg bg-yellow-400 text-gray-900 font-medium hover:bg-yellow-500 transition-colors"
          onClick={() => navigate('/satis-yeni')}
        >
          Satın Alma Kaydı Ekle
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">LED Ekran Satın Almaları</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ekran Ölçüsü</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metrekare (m²)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ekran Türü</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event: any) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{event.customerName}</td>
                  <td className="px-6 py-4">{event.screenSize}</td>
                  <td className="px-6 py-4">{event.area}</td>
                  <td className="px-6 py-4">{ekranTurleri[event.screenType] || event.screenType || '-'}</td>
                  <td className="px-6 py-4">{event.date ? new Date(event.date).toLocaleDateString('tr-TR') : '-'}</td>
                  <td className="px-6 py-4">
                    {event.status === 'tamamlandi' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Tamamlandı</span>
                    )}
                    {event.status === 'beklemede' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Beklemede</span>
                    )}
                    {event.status === 'vazgecildi' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Vazgeçildi</span>
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
                        setEditEvent(event);
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
          {events.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Kayıt bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
      {/* Görüntüle Modalı */}
      {viewModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setViewModalOpen(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Satın Alma Detayları</h3>
            <div className="space-y-2 text-gray-700">
              <div><b>Müşteri:</b> {selectedEvent.customerName}</div>
              <div><b>Ekran Ölçüsü:</b> {selectedEvent.screenSize}</div>
              <div><b>Metrekare:</b> {selectedEvent.area}</div>
              <div><b>Ekran Türü:</b> {ekranTurleri[selectedEvent.screenType] || selectedEvent.screenType || '-'}</div>
              <div><b>Tarih:</b> {selectedEvent.date ? new Date(selectedEvent.date).toLocaleDateString('tr-TR') : '-'}</div>
              <div><b>Durum:</b> {selectedEvent.status === 'tamamlandi' ? 'Tamamlandı' : selectedEvent.status === 'vazgecildi' ? 'Vazgeçildi' : 'Beklemede'}</div>
            </div>
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
                  setEvents(events.filter((ev: any) => ev.id !== eventToDelete.id));
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
      {/* Düzenle Modalı */}
      {editModalOpen && editEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setEditModalOpen(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Satın Alma Kaydını Düzenle</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                setEvents(events.map((ev: any) => ev.id === editEvent.id ? editEvent : ev));
                setEditModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">Müşteri Adı</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editEvent.customerName}
                  onChange={e => setEditEvent({ ...editEvent, customerName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Ekran Ölçüsü</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editEvent.screenSize}
                  onChange={e => setEditEvent({ ...editEvent, screenSize: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Metrekare (m²)</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={editEvent.area}
                  onChange={e => setEditEvent({ ...editEvent, area: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Ekran Türü</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={editEvent.screenType}
                  onChange={e => setEditEvent({ ...editEvent, screenType: e.target.value })}
                  required
                >
                  <option value="indoor">İç Mekan</option>
                  <option value="outdoor">Dış Mekan</option>
                  <option value="floor">Floor</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Tarih</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={editEvent.date}
                  onChange={e => setEditEvent({ ...editEvent, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Durum</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={editEvent.status}
                  onChange={e => setEditEvent({ ...editEvent, status: e.target.value })}
                  required
                >
                  <option value="beklemede">Beklemede</option>
                  <option value="tamamlandi">Tamamlandı</option>
                  <option value="vazgecildi">Vazgeçildi</option>
                </select>
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
    </div>
  );
};

export default SalesDashboard; 