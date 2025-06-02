import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import headerImg from '../assets/teklif-header.png';
import footerImg from '../assets/teklif-footer.png';
import teklifFooterLogo from '../assets/teklif-footer-logo.png';

// @ts-ignore
import html2pdf from 'html2pdf.js';

const PRODUCT_TYPES = [
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'floor', label: 'Floor' },
];

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  floor: 'Pixel aralığı: 2.5mm',
  outdoor: `Pixel Aralığı: 3.9mm\nLED Ömrü: 100.000 Saat\nEkran Yenileme Hızı: 3840Hz\nNovastar TB Uzaktan Kontrol Cihazı\nEnerji Tasarrufu >%30\nParlaklık >6500 cd`,
  indoor: `Pixel Aralığı: 2.6mm\nLED Ömrü: 100.000 Saat\nEkran Yenileme Hızı: 3840Hz\nNovastar TB Uzaktan Kontrol Cihazı\nEnerji Tasarrufu >%30\nParlaklık >6500 cd`,
};

const LOGO_URL = '';

const OfferPage: React.FC = () => {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    productType: '',
    description: '',
    quantity: '',
    unitPrice: '',
    deliveryTime: '',
    installation: '',
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => {
      if (name === 'productType') {
        return { ...f, productType: value, description: PRODUCT_DESCRIPTIONS[value] || '' };
      }
      return { ...f, [name]: value };
    });
  };

  const getQuantityLabel = () => {
    if (form.productType === 'indoor' || form.productType === 'outdoor' || form.productType === 'floor') {
      return 'Metrekare (m²)';
    }
    return 'Adet';
  };

  const handlePdf = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;
    // Header (Logo veya başlık)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 72, 97);
    doc.text('SATIŞ TEKLİFİ', pageWidth / 2, y, { align: 'center' });
    y += 12;
    // Müşteri Bilgileri
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    doc.text(`Müşteri: ${form.customerName || '-'}`, 15, y);
    doc.text(`Telefon: ${form.phone || '-'}`, 15, y + 7);
    y += 18;
    // Ürün Tablosu
    const quantityLabel = (form.productType === 'indoor' || form.productType === 'outdoor' || form.productType === 'floor') ? 'm²' : 'adet';
    const quantity = Number(form.quantity) || 0;
    const unitPrice = Number(form.unitPrice) || 0;
    const installation = form.installation ? Number(form.installation) : 0;
    const rowTotal = quantity * unitPrice;
    const araToplam = rowTotal + installation;
    const kdv = araToplam * 0.2;
    const netToplam = araToplam + kdv;
    autoTable(doc, {
      startY: y,
      head: [[
        'Sıra', 'Ürün Cinsi', 'Açıklama', 'Miktar', 'Birim Fiyatı (USD)', 'Tutar (USD)'
      ]],
      body: [
        [
          '1',
          form.productType ? PRODUCT_TYPES.find(t => t.value === form.productType)?.label || '' : '',
          form.description || '',
          `${form.quantity || ''} ${quantityLabel}`,
          unitPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
          rowTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })
        ],
        [
          '2',
          'Kurulum/Montaj',
          'Kurulum ve montaj hizmeti',
          '-',
          '-',
          installation ? installation.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) : '0,00'
        ]
      ],
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 2, valign: 'middle' },
      headStyles: { fillColor: [15, 72, 97], textColor: 255, fontStyle: 'bold', halign: 'center', font: 'helvetica' },
      bodyStyles: { halign: 'center', font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 12 },   // Sıra
        1: { cellWidth: 28 },   // Ürün Cinsi
        2: { cellWidth: 60, halign: 'left' }, // Açıklama
        3: { cellWidth: 22 },   // Miktar
        4: { cellWidth: 32 },   // Birim Fiyatı
        5: { cellWidth: 32 },   // Tutar
      },
      margin: { left: 15, right: 15 },
      tableLineColor: 180,
      tableLineWidth: 0.5,
      didDrawPage: (data) => {
        if (data.cursor) {
          y = data.cursor.y;
        }
      }
    });
    y += 8;
    // Toplamlar Kutusu
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Ara Toplam:', pageWidth - 70, y);
    doc.text('KDV %20:', pageWidth - 70, y + 7);
    doc.text('Net Toplam:', pageWidth - 70, y + 14);
    doc.setFont('helvetica', 'normal');
    doc.text(`${araToplam.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} $`, pageWidth - 20, y, { align: 'right' });
    doc.text(`${kdv.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} $`, pageWidth - 20, y + 7, { align: 'right' });
    doc.text(`${netToplam.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} $`, pageWidth - 20, y + 14, { align: 'right' });
    y += 24;
    // Teslimat Süresi
    doc.setFont('helvetica', 'bold');
    doc.text('Teslimat Süresi:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(form.deliveryTime || '-', 55, y);
    y += 10;
    // Sözleşme Koşulları ve Banka Bilgileri
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 72, 97);
    doc.text('SÖZLEŞME KOŞULLARI', pageWidth / 2, y + 8, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    const sozlesmeLines = [
      '1- İş bu teklif 7 gün geçerlidir. Teknik Fuarcılık A.Ş. bu teklifte belirtilen uygulama yerleri için teknik servis ekibi hazır edeceği ve miktarları stoğuna satın alacağı için onaylanan ürün miktarları tek taraflı olarak iptal veya iade edilemez ve değiştirilemez. İlave durumunda, piyasa şartlarından doğabilecek fiyat farkı yansıtılarak fatura edilecektir.',
      "2- Altyapı eksikliğinden dolayı teslim süresinin gecikmesinden Teknik Fuarcılık A.Ş. sorumlu tutulamaz. Müşteri altyapısını Teknik Fuarcılık A.Ş.'nın onay verdiği şekilde altyapı yapmak zorundadır.",
      '3- Ödeme sözleşme tarihinde %50 tutarında banka havalesi yoluyla avans ödemesi yapacaktır. Kalan %50 ürünlerin montajı tamamlandıktan ve devreye alındıktan sonra 5 iş günü içerisinde banka havalesi ile yapılacaktır.',
      '4- Tüm Ödemeler firmamızın aşağıda detayı verilen banka hesabına yapabilirsiniz:'
    ];
    let sozlesmeY = y + 14;
    sozlesmeLines.forEach(line => {
      doc.text(line, 15, sozlesmeY, { maxWidth: pageWidth - 30 });
      sozlesmeY += 8;
    });
    // Banka Bilgileri
    sozlesmeY += 2;
    doc.setFont('helvetica', 'bold');
    doc.text('GARANTİ Bankası TL Hesabı', 15, sozlesmeY);
    doc.setFont('helvetica', 'normal');
    doc.text('Hesap Adı: Teknik Fuarcılık A.Ş.', 15, sozlesmeY + 6);
    doc.text('IBAN: TR49 0006200115100006299569', 15, sozlesmeY + 12);
    doc.setFont('helvetica', 'bold');
    doc.text('GARANTİ Bankası USD Hesabı', 15, sozlesmeY + 20);
    doc.setFont('helvetica', 'normal');
    doc.text('Hesap Adı: Teknik Fuarcılık A.Ş.', 15, sozlesmeY + 26);
    doc.text('IBAN: TR09 0006200115100009092628', 15, sozlesmeY + 32);
    // İmza Alanı ve Logo
    const bottomY = doc.internal.pageSize.getHeight() - 40;
    doc.setFont('helvetica', 'bold');
    doc.text('TEKNİK FUARCILIK A.Ş.', 15, bottomY);
    doc.setFont('helvetica', 'normal');
    doc.text('T : +90 212 876 75 06', 15, bottomY + 6);
    doc.text('F : +90 212 876 06 81', 15, bottomY + 12);
    doc.text('www.teknikfuarcilik.com', 15, bottomY + 18);
    doc.setFillColor(0, 0, 0);
    doc.setTextColor(255);
    doc.rect(pageWidth - 60, bottomY - 2, 45, 10, 'F');
    doc.text('MÜŞTERİ', pageWidth - 37.5, bottomY + 6, { align: 'center' });
    doc.setTextColor(0);
    doc.setFont('helvetica', 'normal');
    doc.text('Kaşe / İmza', pageWidth - 37.5, bottomY + 18, { align: 'center' });
    doc.save('satis_teklifi.pdf');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Satış Teklifi Oluştur</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Müşteri Adı</label>
          <input type="text" name="customerName" value={form.customerName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Telefon</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Ürün Cinsi</label>
          <select name="productType" value={form.productType} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
            <option value="">Seçiniz</option>
            {PRODUCT_TYPES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Açıklama</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2 min-h-[80px]" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">{getQuantityLabel()}</label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="w-full border rounded px-3 py-2" min="1" required />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Birim Fiyatı (USD)</label>
          <input type="number" name="unitPrice" value={form.unitPrice} onChange={handleChange} className="w-full border rounded px-3 py-2" min="0" step="0.01" required />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Teslimat Süresi</label>
          <input type="text" name="deliveryTime" value={form.deliveryTime} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Opsiyonel" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Kurulum/Montaj (USD)</label>
          <input type="number" name="installation" value={form.installation} onChange={handleChange} className="w-full border rounded px-3 py-2" min="0" step="0.01" placeholder="Varsayılan: 0" />
        </div>
      </form>
      <div className="flex justify-end mt-8 gap-4">
        <button
          type="button"
          className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
          onClick={() => setShowPreview(true)}
        >
          Teklifi Hazırla
        </button>
        {showPreview && (
          <button
            type="button"
            className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 bg-green-600 hover:bg-green-700 hover:shadow-lg"
            onClick={() => {
              const element = document.getElementById('teklif-preview');
              if (element) {
                // A4 yüksekliği px cinsinden (96dpi için)
                const A4_HEIGHT_PX = 1122;
                const contentHeight = element.scrollHeight;
                let scale = 1.0;
                if (contentHeight > A4_HEIGHT_PX) {
                  scale = A4_HEIGHT_PX / contentHeight;
                  if (scale < 0.5) scale = 0.5; // Çok küçülmesin
                }
                html2pdf().set({
                  margin: 5,
                  filename: 'teklif.pdf',
                  image: { type: 'jpeg', quality: 0.98 },
                  html2canvas: { scale },
                  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                }).from(element).save();
              }
            }}
          >
            PDF İndir
          </button>
        )}
      </div>
      {/* Teklif Önizlemesi */}
      {showPreview && (
        <div id="teklif-preview" className="mt-10 border rounded-xl bg-white" style={{ maxWidth: 770, margin: '0 auto', padding: 14, background: '#fff' }}>
          <img
            src={headerImg}
            alt="Header"
            style={{
              display: 'block',
              margin: '0 auto 24px auto',
              width: 'auto',
              height: 90,
              maxWidth: 700,
              objectFit: 'contain'
            }}
          />
          <h3 className="text-xl font-bold mb-5">Satış Teklifi</h3>
          <div className="mb-2 text-sm"><b>Müşteri:</b> {form.customerName || '-'}</div>
          <div className="mb-2 text-sm"><b>Telefon:</b> {form.phone || '-'}</div>
          <table className="w-full mt-4 border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Ürün Cinsi</th>
                <th className="border px-4 py-2">Açıklama</th>
                <th className="border px-4 py-2">Miktar</th>
                <th className="border px-4 py-2">Birim Fiyatı (USD)</th>
                <th className="border px-4 py-2">Tutar (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{form.productType ? PRODUCT_TYPES.find(t => t.value === form.productType)?.label : '-'}</td>
                <td className="border px-4 py-2">{form.description || '-'}</td>
                <td className="border px-4 py-2">{form.quantity || '-'} {getQuantityLabel()}</td>
                <td className="border px-4 py-2">{form.unitPrice || '-'}</td>
                <td className="border px-4 py-2">{((Number(form.quantity) || 0) * (Number(form.unitPrice) || 0)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2" colSpan={4}>Kurulum/Montaj</td>
                <td className="border px-4 py-2">{form.installation || '0'}</td>
              </tr>
            </tbody>
          </table>
          {/* Toplamlar */}
          <div className="mt-4 flex flex-col items-end gap-1 text-sm">
            <div><b>Ara Toplam:</b> {((Number(form.quantity) || 0) * (Number(form.unitPrice) || 0) + (Number(form.installation) || 0)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} $</div>
            <div><b>KDV %20:</b> {(((Number(form.quantity) || 0) * (Number(form.unitPrice) || 0) + (Number(form.installation) || 0)) * 0.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} $</div>
            <div><b>Net Toplam:</b> {(((Number(form.quantity) || 0) * (Number(form.unitPrice) || 0) + (Number(form.installation) || 0)) * 1.2).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} $</div>
          </div>
          <div className="mt-4 text-sm"><b>Teslimat Süresi:</b> {form.deliveryTime || '-'}</div>
          {/* Footer: Sözleşme Koşulları ve Banka Bilgileri Tablo */}
          <table className="w-full border border-black text-sm mt-8" style={{ fontFamily: 'Arial, sans-serif' }}>
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="bg-[#0f4861] text-white text-center font-bold text-lg border-b border-black py-3"
                  style={{ background: '#0f4861' }}
                >
                  SÖZLEŞME KOŞULLARI
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-black p-3 align-top w-1">1-</td>
                <td className="border-b border-black p-3">
                  İş bu teklif 7 gün geçerlidir. Teknik Fuarcılık A.Ş. bu teklifte belirtilen uygulama yerleri için teknik servis ekibi hazır edeceği ve miktarları stoğuna satın alacağı için onaylanan ürün miktarları tek taraflı olarak iptal veya iade edilemez ve değiştirilemez. İlave durumunda, piyasa şartlarından doğabilecek fiyat farkı yansıtılarak fatura edilecektir.
                </td>
              </tr>
              <tr>
                <td className="border-b border-black p-3 align-top">2-</td>
                <td className="border-b border-black p-3">
                  Altyapı eksikliğinden dolayı teslim süresinin gecikmesinden Teknik Fuarcılık A.Ş. sorumlu tutulamaz. Müşteri altyapısını Teknik Fuarcılık A.Ş.'nın onay verdiği şekilde altyapı yapmak zorundadır.
                </td>
              </tr>
              <tr>
                <td className="border-b border-black p-3 align-top">3-</td>
                <td className="border-b border-black p-3">
                  Ödeme sözleşme tarihinde %50 tutarında banka havalesi yoluyla avans ödemesi yapacaktır. Kalan %50 ürünlerin montajı tamamlandıktan ve devreye alındıktan sonra 5 iş günü içerisinde banka havalesi ile yapılacaktır.
                </td>
              </tr>
              <tr>
                <td className="border-b border-black p-3 align-top">4-</td>
                <td className="border-b border-black p-3">
                  Tüm Ödemeler firmamızın aşağıda detayı verilen banka hesabına yapabilirsiniz:
                  <div className="mt-2 font-bold">GARANTİ Bankası TL Hesabı</div>
                  <div>Hesap Adı: Teknik Fuarcılık A.Ş.</div>
                  <div>IBAN: TR49 0006200115100006299569</div>
                  <div className="mt-2 font-bold">GARANTİ Bankası USD Hesabı</div>
                  <div>Hesap Adı: Teknik Fuarcılık A.Ş.</div>
                  <div>IBAN: TR09 0006200115100009092628</div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Footer: Logo ve Müşteri Kaşe/İmza alanı */}
          <div className="flex items-start justify-between mt-10">
            {/* Sol: Logo ve iletişim */}
            <div className="flex items-start gap-4">
              <img
                src={teklifFooterLogo}
                alt="Teknik Fuarcılık Logo"
                style={{ width: 60, height: 'auto', maxHeight: 40 }}
              />
              <div className="text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                <div className="font-bold">TEKNİK FUARCILIK A.Ş.</div>
                <div>T : +90 212 876 75 06</div>
                <div>F : +90 212 876 06 81</div>
                <div>www.teknikfuarcilik.com</div>
              </div>
            </div>
            {/* Sağ: Müşteri kutusu */}
            <div className="flex flex-col items-center" style={{ minWidth: 100 }}>
              <div
                className="text-white font-bold text-base mb-6"
                style={{
                  background: '#000',
                  width: 90,
                  textAlign: 'center',
                  padding: '4px 0',
                  borderRadius: 2,
                }}
              >
                MÜŞTERİ
              </div>
              <div className="mt-10 text-sm font-medium" style={{ color: '#222' }}>
                Kaşe / İmza
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferPage; 