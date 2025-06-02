export async function fetchEvents() {
  const response = await fetch(import.meta.env.VITE_API_URL + '/events', {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  });
  if (!response.ok) throw new Error('API isteği başarısız');
  return response.json();
} 