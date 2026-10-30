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
      ? 'text-orange-600 dark:text-orange-400 font-bold'
      : 'text-gray-800 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400';

  const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Soleil', path: '/soleil' },
    { label: 'Photogrey', path: '/photogrey' },
    { label: 'Enfant', path: '/enfant' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b-2 border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-5">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 py-2">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 rounded-lg"
            aria-label="PETER OPTIQUE - Accueil"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black tracking-tight text-blue-700 dark:text-teal-300 leading-tight">
                PETER OPTIQUE
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-none">
                Opticien Moderne
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-end" aria-label="Navigation principale">
            {links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2.5 lg:px-3 py-2 text-base lg:text-lg rounded-lg transition ${isActive(item.path)}`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/ordonnance"
              className="ml-1 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-base font-bold px-3 lg:px-4 py-2.5 transition whitespace-nowrap"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Ordonnance
            </Link>

            <Link
              to="/lentilles"
              className="inline-flex items-center rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-base font-bold px-3 lg:px-4 py-2.5 transition whitespace-nowrap"
            >
              Lentilles
            </Link>

            <button
              onClick={() => setIsDark((v) => !v)}
              className="ml-1 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setIsDark((v) => !v)}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
            >
              {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2" aria-label="Menu mobile">
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
                className={`px-4 py-3 rounded-xl text-xl ${isActive(item.path)}`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/ordonnance"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-teal-600 text-white font-bold text-lg py-4"
            >
              <Phone className="w-5 h-5" />
              Déposer Ordonnance
            </Link>

            <Link
              to="/lentilles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-700 text-white font-bold text-lg py-4"
            >
              <Palette className="w-5 h-5" />
              Changer de Lentilles
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}