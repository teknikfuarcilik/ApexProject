import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RentalDashboard from './components/RentalDashboard';
import RentalEntryForm from './components/RentalEntryForm';
import SalesDashboard from './components/SalesDashboard';
import SalesEntryForm from './components/SalesEntryForm';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import StoklarPage from './pages/StoklarPage';
import OfferPage from './pages/OfferPage';

const initialRentalEvents: any[] = [];
const initialSalesEvents: any[] = [];

function getInitialEvents(key: string, initial: any[]): any[] {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initial;
    }
  }
  return initial;
}

function App() {
  const [scrolled, setScrolled] = React.useState(false);
  const [rentalEvents, setRentalEvents] = React.useState(getInitialEvents('rentalEvents', initialRentalEvents));
  const [salesEvents, setSalesEvents] = React.useState(getInitialEvents('salesEvents', initialSalesEvents));

  React.useEffect(() => {
    localStorage.setItem('rentalEvents', JSON.stringify(rentalEvents));
  }, [rentalEvents]);
  React.useEffect(() => {
    localStorage.setItem('salesEvents', JSON.stringify(salesEvents));
  }, [salesEvents]);

  // Eski kayıtları otomatik taşı (sadece ilk açılışta)
  React.useEffect(() => {
    const oldEvents = localStorage.getItem('events');
    if (oldEvents && (!rentalEvents || rentalEvents.length === 0)) {
      try {
        const parsed = JSON.parse(oldEvents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const withType = parsed.map(ev => ({ ...ev, type: ev.type || 'kiralik' }));
          setRentalEvents(withType);
          localStorage.setItem('rentalEvents', JSON.stringify(withType));
        }
        localStorage.removeItem('events');
      } catch {}
    }
  }, []);

  // Tüm kayıtları kiralik olarak işaretle (manuel geçiş)
  React.useEffect(() => {
    const rentalEventsRaw = localStorage.getItem('rentalEvents');
    if (rentalEventsRaw) {
      try {
        const arr = JSON.parse(rentalEventsRaw);
        if (Array.isArray(arr)) {
          const updated = arr.map(ev => ({ ...ev, type: 'kiralik' }));
          setRentalEvents(updated);
          localStorage.setItem('rentalEvents', JSON.stringify(updated));
        }
      } catch {}
    }
  }, []);

  const addRentalEvent = (event: any) => {
    setRentalEvents((prev: any[]) => [
      { ...event, id: Date.now() },
      ...prev
    ]);
  };
  const addSalesEvent = (event: any) => {
    setSalesEvents((prev: any[]) => [
      { ...event, id: Date.now() },
      ...prev
    ]);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header scrolled={scrolled} />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kiralama" element={<RentalDashboard events={rentalEvents} setEvents={setRentalEvents} />} />
            <Route path="/kiralama-yeni" element={<RentalEntryForm addEvent={addRentalEvent} />} />
            <Route path="/satis" element={<SalesDashboard events={salesEvents} setEvents={setSalesEvents} />} />
            <Route path="/satis-yeni" element={<SalesEntryForm addEvent={addSalesEvent} />} />
            <Route path="/raporlar" element={<ReportsPage />} />
            <Route path="/ayarlar" element={<SettingsPage />} />
            <Route path="/stoklar" element={<StoklarPage />} />
            <Route path="/teklif" element={<OfferPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;