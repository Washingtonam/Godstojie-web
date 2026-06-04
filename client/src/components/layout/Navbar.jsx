export default function Navbar({ view, setView, token, onLogout }) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Godstojie Construction</p>
          <h1 className="text-xl font-semibold text-slate-900">Lead Conversion Portal</h1>
        </div>
        <nav className="flex items-center gap-3">
          <button
            onClick={() => setView('home')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === 'home' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Home
          </button>
          {!token ? (
            <button
              onClick={() => setView('login')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === 'login' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Admin Login
            </button>
          ) : (
            <>
              <button
                onClick={() => setView('dashboard')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === 'dashboard' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Admin Leads
              </button>
              <button
                onClick={onLogout}
                className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
