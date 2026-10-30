import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye, Menu, X, Phone, Sun, Moon, Palette } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('darkMode') === 'true');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-orange-500 font-semibold'
      : 'text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400';

  const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Soleil', path: '/soleil' },
    { label: 'Photogrey', path: '/photogrey' },
    { label: 'Enfant', path: '/enfant' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 shrink-0 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-black tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent truncate">
                PETER OPTIQUE
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-none hidden sm:block">
                Opticien Moderne
              </div>
            </div>
          </Link>

          {/* NAV DESKTOP — dès md (tablette / PC) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-end min-w-0">
            {links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 lg:px-3 py-1.5 text-xs lg:text-sm rounded-lg transition ${isActive(item.path)}`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/ordonnance"
              className="ml-1 inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs lg:text-sm font-semibold px-2.5 lg:px-3 py-1.5 hover:opacity-90 transition whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              Ordonnance
            </Link>

            <Link
              to="/lentilles"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs lg:text-sm font-semibold px-2.5 lg:px-3 py-1.5 hover:opacity-90 transition whitespace-nowrap"
            >
              Lentilles
            </Link>

            <button
              onClick={() => setIsDark((v) => !v)}
              className="ml-1 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Thème"
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>

          {/* BOUTON MOBILE uniquement */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setIsDark((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {[
              { label: 'Accueil', path: '/' },
              { label: 'Lunettes de Soleil', path: '/soleil' },
              { label: 'Photogrey', path: '/photogrey' },
              { label: 'Enfant', path: '/enfant' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base ${isActive(item.path)}`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/ordonnance"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-3"
            >
              <Phone className="w-4 h-4" />
              Déposer Ordonnance
            </Link>

            <Link
              to="/lentilles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold py-3"
            >
              <Palette className="w-4 h-4" />
              Changer de Lentilles
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}