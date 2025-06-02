import React, { useState, useEffect } from 'react';
import { Monitor, Layers, Ruler, Maximize2, Image as ImageIcon, CheckCircle, PanelTop, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  screenType: string;
  pixelPitch: string;
  panelSize: string;
  totalArea: number;
  usedArea: number;
  image?: string;
}

const initialForm = {
  name: '',
  screenType: '',
  pixelPitch: '',
  panelSize: '',
  totalArea: '',
  usedArea: '',
  image: undefined as string | undefined,
};

const screenTypeOptions = [
  { value: 'Indoor', label: 'Indoor' },
  { value: 'Outdoor', label: 'Outdoor' },
  { value: 'Floor', label: 'Floor' },
];

const STORAGE_KEY = 'products';

const StoklarPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<typeof initialForm>(initialForm);

  // Yükleme
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setProducts(JSON.parse(stored));
    setLoaded(true);
  }, []);

  // Kaydetme
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, loaded]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, image: reader.result as string }));
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.screenType || !form.pixelPitch || !form.panelSize || form.totalArea === '' || isNaN(Number(form.totalArea))) {
      alert('Lütfen tüm alanları eksiksiz ve doğru doldurun.');
      return;
    }
    setProducts(prev => [
      {
        id: Date.now().toString(),
        name: form.name.trim(),
        screenType: form.screenType,
        pixelPitch: form.pixelPitch.trim(),
        panelSize: form.panelSize.trim(),
        totalArea: Number(form.totalArea),
        usedArea: Number(form.usedArea) || 0,
        image: form.image,
      },
      ...prev
    ]);
    setForm(initialForm);
    setPreview(undefined);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setSelected(null);
  };

  const handleEditClick = () => {
    if (selected) {
      setEditForm({
        name: selected.name,
        screenType: selected.screenType,
        pixelPitch: selected.pixelPitch,
        panelSize: selected.panelSize,
        totalArea: selected.totalArea.toString(),
        usedArea: selected.usedArea.toString(),
        image: selected.image,
      });
      setEditMode(true);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setProducts(prev => prev.map(p =>
      p.id === selected.id
        ? {
            ...p,
            name: editForm.name,
            screenType: editForm.screenType,
            pixelPitch: editForm.pixelPitch,
            panelSize: editForm.panelSize,
            totalArea: Number(editForm.totalArea),
            usedArea: Number(editForm.usedArea) || 0,
            image: editForm.image,
          }
        : p
    ));
    setEditMode(false);
    setSelected(null);
  };

  // Toplamlar
  const totalTotalArea = products.reduce((sum, p) => sum + (p.totalArea || 0), 0);
  const totalAvailableArea = products.reduce((sum, p) => sum + (p.totalArea - (p.usedArea || 0)), 0);

  return (
    <div className="max-w-6xl mx-auto py-10 relative">
      <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
        <Layers className="inline-block text-green-600" size={32} /> Stoklarımız
      </h1>
      {/* Grid/Kartlar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
        {products.length === 0 && <div className="col-span-full text-gray-500 text-center">Henüz ürün eklenmedi.</div>}
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform group relative"
            onClick={() => setSelected(product)}
          >
            <div className="w-28 h-28 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-3 border border-gray-100 group-hover:shadow-md">
              {product.image ? (
                <img src={product.image} alt={product.name} className="object-contain h-full w-full" />
              ) : (
                <ImageIcon className="text-gray-300" size={48} />
              )}
            </div>
            <div className="font-semibold text-lg text-gray-800 text-center mb-1 flex items-center gap-2">
              <Monitor className="inline-block text-blue-500" size={18} /> {product.name}
            </div>
          </div>
        ))}
      </div>
      {/* Ürün Ekle Butonu */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transition-all text-lg"
      >
        <Plus size={22} /> Ürün Ekle
      </button>
      {/* Ürün Ekleme Modalı */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowForm(false)}
            >×</button>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Plus /> Yeni Ürün Ekle</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1"><Monitor className="mr-2 h-5 w-5 text-blue-600" />Ürün Adı</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1"><Layers className="mr-2 h-5 w-5 text-green-600" />Ekran Türü</label>
                <select name="screenType" value={form.screenType} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                  <option value="">Seçiniz</option>
                  {screenTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1"><Ruler className="mr-2 h-5 w-5 text-purple-600" />Pixel Aralığı</label>
                <input type="text" name="pixelPitch" value={form.pixelPitch} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Örn: P2.6" />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1"><PanelTop className="mr-2 h-5 w-5 text-yellow-600" />Panel Ölçüsü</label>
                <input type="text" name="panelSize" value={form.panelSize} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Örn: 50x100" />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1"><Maximize2 className="mr-2 h-5 w-5 text-pink-600" />Toplam Alan (m²)</label>
                <input type="number" name="totalArea" value={form.totalArea} onChange={handleChange} className="w-full border rounded px-3 py-2" required min="0" step="0.01" />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1"><CheckCircle className="mr-2 h-5 w-5 text-gray-600" />Kullanılan Alan (m²)</label>
                <input type="number" name="usedArea" value={form.usedArea} onChange={handleChange} className="w-full border rounded px-3 py-2" min="0" step="0.01" />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center text-gray-700 font-medium mb-1"><ImageIcon className="mr-2 h-5 w-5 text-gray-600" />Fotoğraf (isteğe bağlı)</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {preview && (
                  <img src={preview} alt="Önizleme" className="mt-2 h-16 object-contain rounded shadow" />
                )}
              </div>
              <div className="md:col-span-2 flex justify-end items-end">
                <button type="submit" className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">Ekle</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Detay Modalı */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => { setSelected(null); setEditMode(false); }}
            >×</button>
            {editMode ? (
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Monitor className="text-blue-500" size={22} /> Ürünü Düzenle
                </h2>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="border rounded px-3 py-2" required placeholder="Ürün Adı" />
                <select name="screenType" value={editForm.screenType} onChange={handleEditChange} className="border rounded px-3 py-2" required>
                  <option value="">Ekran Türü</option>
                  {screenTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <input type="text" name="pixelPitch" value={editForm.pixelPitch} onChange={handleEditChange} className="border rounded px-3 py-2" required placeholder="Pixel Aralığı" />
                <input type="text" name="panelSize" value={editForm.panelSize} onChange={handleEditChange} className="border rounded px-3 py-2" required placeholder="Panel Ölçüsü" />
                <input type="number" name="totalArea" value={editForm.totalArea} onChange={handleEditChange} className="border rounded px-3 py-2" required min="0" step="0.01" placeholder="Toplam Alan" />
                <input type="number" name="usedArea" value={editForm.usedArea} onChange={handleEditChange} className="border rounded px-3 py-2" min="0" step="0.01" placeholder="Kullanılan Alan" />
                <div className="flex justify-end gap-2 mt-2">
                  <button type="button" onClick={() => setEditMode(false)} className="px-4 py-2 rounded bg-gray-200 text-gray-700">Vazgeç</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Kaydet</button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Monitor className="text-blue-500" size={22} /> {selected.name}
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2"><Layers className="text-green-600" size={18}/> <b>Ekran Türü:</b> {selected.screenType}</div>
                  <div className="flex items-center gap-2"><Ruler className="text-purple-600" size={18}/> <b>Pixel Aralığı:</b> {selected.pixelPitch}</div>
                  <div className="flex items-center gap-2"><PanelTop className="text-yellow-600" size={18}/> <b>Panel Ölçüsü:</b> {selected.panelSize}</div>
                  <div className="flex items-center gap-2"><Maximize2 className="text-pink-600" size={18}/> <b>Toplam Alan:</b> {selected.totalArea} m²</div>
                  <div className="flex items-center gap-2"><CheckCircle className="text-gray-600" size={18}/> <b>Kullanılan Alan:</b> {selected.usedArea || 0} m²</div>
                  <div className="flex items-center gap-2"><CheckCircle className="text-green-700" size={18}/> <b>Müsait Alan:</b> {(selected.totalArea - (selected.usedArea || 0)).toFixed(2)} m²</div>
                  {selected.image && <img src={selected.image} alt={selected.name} className="mt-2 h-32 w-full object-contain rounded shadow" />}
                </div>
                <div className="flex justify-end mt-6 gap-2">
                  <button onClick={handleEditClick} className="px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">Düzenle</button>
                  <button onClick={() => handleDelete(selected.id)} className="px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200">Sil</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoklarPage; 