import {Link} from "react-router-dom";

import { useState } from 'react';
import {
  Wrench,
  Home,
  Search,
  PlusCircle,
  Zap,
  FileText,
  Receipt,
  Clock,
  Bell,
  UserSquare2,
  Settings,
  LogOut,
  Globe
} from 'lucide-react';

const Sidebar = ({ user = { name: 'Nimali Perera', role: 'Customer' }, notificationCount = 2 }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Find Technicians', path: '/find-technician', icon: Search },
    { name: 'Request a Service', path: '/request-service', icon: PlusCircle },
    { name: 'Active Jobs', path: '/active-jobs', icon: Zap },
    { name: 'Quotations', path: '/quotations', icon: FileText },
    { name: 'Invoices and Payments', path: '/invoice-payment', icon: Receipt },
    { name: 'Job History', path: '/job-history', icon: Clock },
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: notificationCount },
    { name: 'My Profile', path: '/profile', icon: UserSquare2 },
    { name: 'Account Settings', path: '/settings', icon: Settings },
    { name: 'Logout', path: '/logout', icon: LogOut },
  ];

  return (
    <aside className="sidebar">
      <div>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo">
            <Wrench size={22} color="#ffffff" />
            <span className="brand-dot"></span>
          </div>
          <div className="brand-text">
            <h2>Fix<span>Flow</span><span className="orange-dot">.</span></h2>
            <p>FIND THE RIGHT TECHNICIAN</p>
          </div>
        </div>

        {/* User Info */}
        <div className="sidebar-user">
          <h3>{user.name}</h3>
          <span className="user-badge">{user.role}</span>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path || activeItem === item.name;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setActiveItem(item.name)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <IconComponent className="nav-icon" size={18} />
                  <span className="nav-label">{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <Link to="/public" className="footer-link">
          <Globe size={16} />
          <span>Public FixFlow Website</span>
        </Link>
        <p className="footer-version">FixFlow v1.0 • Secure Session</p>
      </div>
    </aside>
  );
};

export default Sidebar;