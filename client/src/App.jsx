import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [view, setView] = useState('home');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('godstojie_admin_token');
    if (saved) setToken(saved);
  }, []);

  const handleAuthenticated = (newToken) => {
    setToken(newToken);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('godstojie_admin_token');
    setToken(null);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar view={view} setView={setView} token={token} onLogout={handleLogout} />
      {view === 'home' && <Home />}
      {view === 'dashboard' && token && <AdminDashboard token={token} />}
      {view === 'dashboard' && !token && <Login onAuthenticated={handleAuthenticated} />}
      {view === 'login' && !token && <Login onAuthenticated={handleAuthenticated} />}
      {view === 'login' && token && <AdminDashboard token={token} />}
    </div>
  );
}
