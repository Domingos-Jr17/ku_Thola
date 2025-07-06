import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/vagas") {
      return location.pathname.startsWith(path);
    }
    return location.pathname === path;
  };

  const links = [
    { to: "/home", label: "Inicio" },
    { to: "candidato/vagas", label: "Vagas" },
    {to:"/about", label: "Sobre"},
    { to: "/candidato/dashboard", label: "Área do Candidato" }, // texto alterado aqui
    { to: "/rh/login", label: "Área do Recrutador" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-800 text-white shadow sticky top-0 z-50">
      <nav
        className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 hover:opacity-90 transition"
          aria-label="Página inicial - KU THOLA"
        >
          <img
            src="/ku-thola_logo.svg"
            alt="Logo KU THOLA"
            className="h-12 w-auto"
            loading="lazy"
            width={48}
            height={48}
          />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menu links */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex gap-6 items-center text-sm md:text-base`}
          role="menubar"
        >
          {links.map(({ to, label }) => (
            <li key={to} role="none">
              <Link
                to={to}
                className={`block px-3 py-2 rounded-md transition
                  ${
                    isActive(to)
                      ? "underline font-semibold bg-blue-600 bg-opacity-20 text-white"
                      : "hover:bg-blue-600 hover:text-white"
                  }
                  focus:outline-none focus:ring-2 focus:ring-white`}
                role="menuitem"
                aria-current={isActive(to) ? "page" : undefined}
                onClick={() => setMenuOpen(false)} // fecha menu no clique mobile
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
