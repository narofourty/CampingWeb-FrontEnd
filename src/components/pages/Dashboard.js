import React, { useState, useEffect } from 'react';
import {Menu, Home, User, Settings, LogOut, ShoppingBag, Users, HandPlatter, NotebookPen} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useEmployee } from '../../hooks/useEmployee';
import ProfileComponent from './ProfileComponent';
import ProductComponent from './ProductComponent';
import UsersComponent from "./UsersComponent";
import logo from '../../assets/images/logo.png';
import '@styles/app.css';


const SidebarApp = () => {
  const { user, logout } = useAuth();
  const { employee, loading, error } = useEmployee(user?.username, user?.token);
  const [activeItem, setActiveItem] = useState(() => {
    const storedItem = localStorage.getItem('activeItem');
    return storedItem || 'home';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'reservation', label: 'Reservations', icon: <NotebookPen size={20} /> },
    { id: 'product', label: 'Product', icon: <ShoppingBag size={20} /> },
    { id: 'services', label: 'Services', icon: <HandPlatter size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId);
    localStorage.setItem('activeItem', itemId);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);

  return (
    <div className="app-container">
      <div className={`mobile-overlay ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>

      <header className="mobile-header">
        <button className="menu-button" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="mobile-title">Camping Web</div>
        <div style={{ width: '24px' }}></div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h1 className="sidebar-title">Camping Web</h1>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={logout}>
            <LogOut size={20} className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-card">

          {activeItem === 'home' && (
            <>
              <h2 className="content-title">Benvenuto nella Home</h2>
              <p className="content-text">
                Questa è la pagina principale dell'applicazione. Utilizza il menu laterale per
                navigare tra le diverse sezioni. Il design è stato personalizzato utilizzando
                i colori e lo stile che preferisci.
              </p>
            </>
          )}

          {activeItem === 'product' && (
            <ProductComponent />
          )}

          {activeItem === 'profile' && (
            <ProfileComponent  employee={employee}  loading={loading}  error={error}  username={user?.username}/>
          )}
          {activeItem === 'users' && (
              <UsersComponent user={user} />
          )}

          {activeItem === 'settings' && (
            <>
              <h2 className="content-title">Impostazioni</h2>
              <p className="content-text">
                Configura l'applicazione secondo le tue preferenze. Puoi modificare tema,
                notifiche e altre opzioni di personalizzazione.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SidebarApp;