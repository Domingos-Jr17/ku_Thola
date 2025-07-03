import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Users,
  FileText,
  Menu,
  LogOut,
  ChevronLeft,
  //LucideCalendarClock,
  MessageCircle,
  User,
  BarChart2,
  CalendarClock,
  // Bell,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  List,
} from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  path?: string; // se item com link direto
  submenu?: NavItem[];
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Controla os submenus abertos (label do menu)
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Estrutura do menu agrupado
  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/rh/dashboard' },
    {
      label: 'Gerir Vagas',
      icon: <Briefcase size={20} />,
      submenu: [
        { label: 'Ver Todas', icon: <List size={18} />, path: '/rh/vagas' },
        { label: 'Criar Nova', icon: <PlusCircle size={18} />, path: '/rh/vagas' },
      ],
    },
    {
      label: 'Processos Seletivos',
      icon: <Users size={20} />,
      submenu: [
        { label: 'Candidatos por Vaga', icon: <Users size={18} />, path: '/rh/candidatos' },
        { label: 'Avaliações', icon: <FileText size={18} />, path: '/rh/avaliacoes' },
        { label: 'Entrevistas', icon: <CalendarClock size={18} />, path: '/rh/entrevistas' },
      ],
    },
    {
      label: 'Comunicação',
      icon: <MessageCircle size={20} />,
      submenu: [
        { label: 'Mensagens', icon: <MessageCircle size={18} />, path: '/rh/comunicacao' },
        // { label: 'Notificações', icon: <Bell size={18} />, path: '/rh/notificacoes' }, // placeholder
      ],
    },
    { label: 'Relatórios', icon: <BarChart2 size={20} />, path: '/rh/relatorios' },
    { label: 'Perfil', icon: <User size={20} />, path: '/rh/perfil' },
  ];

  const isActive = (path?: string) => path ? location.pathname.startsWith(path) : false;

  const renderNavItem = (item: NavItem) => {
    const isOpen = openMenus.includes(item.label);
    const hasSubmenu = !!item.submenu?.length;

    // Item com submenu
    if (hasSubmenu) {
      // Marcar ativo se algum submenu ativo
      const activeSub = item.submenu!.some(sub => isActive(sub.path));

      return (
        <li key={item.label}>
          <button
            onClick={() => toggleMenu(item.label)}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors duration-200
              ${
                activeSub
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-blue-700 hover:text-white'
              }
            `}
          >
            <span className="flex items-center gap-3">
              {item.icon}
              {!collapsed && item.label}
            </span>
            {!collapsed && (
              isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
          {/* submenu */}
          {isOpen && !collapsed && (
            <ul className="pl-12 mt-2 space-y-1">
              {item.submenu!.map((sub) => (
                <li key={sub.label}>
                  <Link
                    to={sub.path!}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                      ${
                        isActive(sub.path)
                          ? 'bg-blue-700 text-white'
                          : 'text-gray-300 hover:bg-blue-600 hover:text-white'
                      }
                    `}
                  >
                    {sub.icon}
                    <span>{sub.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }

    // Item simples
    return (
      <li key={item.label}>
        <Link
          to={item.path!}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
            ${
              isActive(item.path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-blue-700 hover:text-white'
            }
          `}
        >
          {item.icon}
          {!collapsed && item.label}
        </Link>
      </li>
    );
  };

  const renderLinks = () => (
    <ul className="space-y-2 mt-6">
      {navItems.map(renderNavItem)}
    </ul>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#1E3A8A] text-white">
        <h2 className="text-xl font-bold">Ku Thola</h2>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } hidden md:flex flex-col min-h-screen bg-[#1E3A8A] text-white transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h2 className="text-2xl font-bold">Ku Thola</h2>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-white" aria-label="Toggle collapse sidebar">
            <ChevronLeft
              className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {renderLinks()}

        {/* Sair */}
        <div className="mt-auto p-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut size={20} />
            {!collapsed && <span>Sair</span>}
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-40" onClick={() => setMobileOpen(false)}>
          <div className="w-64 bg-[#1E3A8A] text-white h-full p-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Ku Thola</h2>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <ChevronLeft />
              </button>
            </div>
            {renderLinks()}
            <div className="mt-auto p-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
