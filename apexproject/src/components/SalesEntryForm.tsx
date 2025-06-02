import React, { useState } from 'react';
import { Users, Maximize2, Layout as LayoutIcon, Calendar, Phone, MapPin } from 'lucide-react';

interface SalesFormData {
  customerName: string;
  screenSize: string;
  area: string;
  screenType: string;
  date: string;
  phone: string;
  address: string;
  status: string;
}

const ekranTurleri = [
  { value: 'indoor', label: 'İç Mekan' },
  { value: 'outdoor', label: 'Dış Mekan' },
  { value: 'floor', label: 'Floor' },
];

const SalesEntryForm = ({ addEvent }: { addEvent: (event: any) => void }) => {
  const [formData, setFormData] = useState<SalesFormData>({
    customerName: '',
    screenSize: '',
    area: '',
    screenType: '',
    date: new Date().toISOString().slice(0, 10),
    phone: '',
    address: '',
    status: 'beklemede',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({ ...formData, type: 'satis' });
    setShowSuccess(true);
    setFormData({ customerName: '', screenSize: '', area: '', screenType: '', date: new Date().toISOString().slice(0, 10), phone: '', address: '', status: 'beklemede' });
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Yeni Satın Alma Kaydı</h2>
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 animate-fade-in">
            Kayıt başarıyla eklendi! Bilgiler kaydedildi.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2"><Users className="mr-2 h-5 w-5 text-blue-600" />Müşteri Adı</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2"><Maximize2 className="mr-2 h-5 w-5 text-blue-600" />Ekran Ölçüsü</label>
              <input
                type="text"
                name="screenSize"
                value={formData.screenSize}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2"><Maximize2 className="mr-2 h-5 w-5 text-blue-600" />Metrekare (m²)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="örn., 12"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2"><LayoutIcon className="mr-2 h-5 w-5 text-blue-600" />Ekran Türü</label>
              <select
                name="screenType"
                value={formData.screenType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              >
                <option value="">Ekran türünü seçin</option>
                {ekranTurleri.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2"><Calendar className="mr-2 h-5 w-5 text-blue-600" />Tarih</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">Durum</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              >
                <option value="beklemede">Beklemede</option>
                <option value="tamamlandi">Tamamlandı</option>
                <option value="vazgecildi">Vazgeçildi</option>
              </select>
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2"><Phone className="mr-2 h-5 w-5 text-blue-600" />Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2"><MapPin className="mr-2 h-5 w-5 text-blue-600" />Adres</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesEntryForm; 