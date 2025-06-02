import React, { useState } from 'react';
import { Calendar, Clock, Users, Tag, MapPin, Maximize2, Layout, WrenchIcon, Phone, Mail, FileText, Clipboard } from 'lucide-react';

interface FormData {
  date: string;
  time: string;
  customerName: string;
  eventType: string;
  address: string;
  screenSize: string;
  area: string;
  stageSize: string;
  installationRequired: boolean;
  phone: string;
  email: string;
  technicalRequirements: string;
  notes: string;
  type: 'kiralik' | 'satis';
  screenType?: string;
}

interface EntryFormProps {
  addEvent: (event: any) => void;
  defaultType?: 'kiralik' | 'satis';
}

const EntryForm: React.FC<EntryFormProps> = ({ addEvent, defaultType = 'kiralik' }) => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    time: '',
    customerName: '',
    eventType: '',
    address: '',
    screenSize: '',
    area: '',
    stageSize: '',
    installationRequired: false,
    phone: '',
    email: '',
    technicalRequirements: '',
    notes: '',
    type: defaultType,
    screenType: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(formData);
    setShowSuccess(true);
    setFormData({
      date: '',
      time: '',
      customerName: '',
      eventType: '',
      address: '',
      screenSize: '',
      area: '',
      stageSize: '',
      installationRequired: false,
      phone: '',
      email: '',
      technicalRequirements: '',
      notes: '',
      type: defaultType,
      screenType: '',
    });
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {defaultType === 'kiralik' ? 'Yeni LED Ekran Kiralama Kaydı' : 'Yeni LED Ekran Kaydı'}
        </h2>
        
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 animate-fade-in">
            Kayıt başarıyla eklendi! Bilgiler kaydedildi.
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date and Time */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Tarih
                </label>
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
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Clock className="mr-2 h-5 w-5 text-blue-600" />
                  Saat
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
            
            {/* Customer and Event */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  Müşteri Adı
                </label>
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
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Tag className="mr-2 h-5 w-5 text-blue-600" />
                  Etkinlik Türü
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="">Etkinlik türünü seçin</option>
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
            </div>
          </div>
          
          {/* Address */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <MapPin className="mr-2 h-5 w-5 text-blue-600" />
              Adres
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>
          
          {/* Sizes */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Maximize2 className="mr-2 h-5 w-5 text-blue-600" />
                LED Ekran Ölçüsü (En x Boy - m)
              </label>
              <input
                type="text"
                name="screenSize"
                value={formData.screenSize}
                onChange={handleChange}
                placeholder="örn., 4 x 3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Maximize2 className="mr-2 h-5 w-5 text-blue-600" />
                Metrekare (m²)
              </label>
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
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Layout className="mr-2 h-5 w-5 text-blue-600" />
                Sahne Ölçüsü (En x Boy - m)
              </label>
              <input
                type="text"
                name="stageSize"
                value={formData.stageSize}
                onChange={handleChange}
                placeholder="örn., 8 x 6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          
          {/* Screen Type */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <Layout className="mr-2 h-5 w-5 text-blue-600" />
              Ekran Türü
            </label>
            <select
              name="screenType"
              value={formData.screenType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Ekran türünü seçin</option>
              <option value="indoor">İç Mekan</option>
              <option value="outdoor">Dış Mekan</option>
              <option value="floor">Floor</option>
            </select>
          </div>
          
          {/* Installation */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="installationRequired"
                checked={formData.installationRequired}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="flex items-center text-gray-700 font-medium">
                <WrenchIcon className="mr-2 h-5 w-5 text-blue-600" />
                Kurulum Gerekiyor mu?
              </label>
              <p className="text-gray-500 mt-1">Yerinde kurulum hizmeti gerekiyorsa işaretleyin</p>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Phone className="mr-2 h-5 w-5 text-blue-600" />
                Telefon
              </label>
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
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Mail className="mr-2 h-5 w-5 text-blue-600" />
                E-posta
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FileText className="mr-2 h-5 w-5 text-blue-600" />
              Teknik Gereksinimler
            </label>
            <textarea
              name="technicalRequirements"
              value={formData.technicalRequirements}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          {/* Notes */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <Clipboard className="mr-2 h-5 w-5 text-blue-600" />
              Notlar
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;