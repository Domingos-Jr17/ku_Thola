import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2">

      {/* Branding */}
      <div className="text-center md:text-left">
        <h2 className="text-xl font-bold tracking-wide">KU THOLA</h2>
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </p>
        <div className="flex gap-4 mt-2 text-xs justify-center md:justify-start">
          <Link to="/privacidade" className="hover:underline hover:text-gray-100 transition">
            Política de Privacidade
          </Link>
          <span>|</span>
          <Link to="/termos" className="hover:underline hover:text-gray-100 transition">
            Termos de Uso
          </Link>
          <span>|</span>
          <Link to="/ajuda" className="hover:underline hover:text-gray-100 transition">
            Ajuda/FAQ
          </Link>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm items-center">
        <Link to="/home" className="hover:underline hover:text-gray-200 transition">Início</Link>
        <Link to="/vagas" className="hover:underline hover:text-gray-200 transition">Vagas</Link>
        <Link to="/minha-candidatura" className="hover:underline hover:text-gray-200 transition">Minha Candidatura</Link>
        <Link to="/rh/login" className="hover:underline hover:text-gray-200 transition">Recrutador</Link>
      </nav>

      {/* Ícones de contacto */}
      <div className="flex gap-4 items-center">
        <a
          href="mailto:contato@kuthola.com"
          className="hover:text-gray-200 transition"
          aria-label="Enviar email"
        >
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm8 5.5L4.5 6.5l1.41-1.41L12 10.09l6.09-5.01 1.41 1.41L12 11.5z" />
          </svg>
        </a>
        <a
          href="https://github.com/bytes4future"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200 transition"
          aria-label="GitHub"
        >
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.8c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
);
