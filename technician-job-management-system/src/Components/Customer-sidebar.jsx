import { useState } from 'react';
import {
  Wrench,
  Home,
  Search,
  PlusCircle,
  Briefcase,
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

import "../Style/sidebar.css"; // Import the CSS file for styling

const Sidebar = ({ user = { name: 'Nimali Perera', role: 'Customer' }, notificationCount = 2 }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Find Technicians', icon: Search, path: '/find-technicians' },
    { name: 'Request a Service', icon: PlusCircle, path: '/request-service' },
    { name: 'My Job Requests', icon: Briefcase, path: '/job-requests' },
    { name: 'Active Jobs', icon: Zap, path: '/active-jobs' },
    { name: 'Quotations', icon: FileText, path: '/quotations' },
    { name: 'Invoices and Payments', icon: Receipt, path: '/invoices' },
    { name: 'Job History', icon: Clock, path: '/job-history' },
    { name: 'Notifications', icon: Bell, path: '/notifications', badge: notificationCount },
    { name: 'My Profile', icon: UserSquare2, path: '/profile' },
    { name: 'Account Settings', icon: Settings, path: '/settings' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
  ];

  return (
    <aside className="sidebar">
      <div>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo">
            <Wrench className="w-6 h-6 text-white" />
            <span className="w-2 h-2 bg-orange-400 rounded-full absolute bottom-2 right-2"></span>
          </div>
          <div>
            <h1 className="brand-title">
              <span className="text-white">Fix</span>
              <span className="teal">Flow</span>
              <span className="orange">.</span>
            </h1>
            <p className="brand-subtitle">
              Find the Right Technician
            </p>
          </div>
        </div>

        {/* User Info Section */}
        <div className="user-section">
          <h2 className="user-name">{user.name}</h2>
          <span className="user-badge">
            {user.role}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`nav-item ${
                  isActive
                    ? "active"
                    : ""
                }`}
              >
                <div className="nav-item-left">
                  <Icon
                    className={`nav-icon ${
                      isActive 
                      ? 'text-white' 
                      : 'text-[#00a884]'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {/* Notification Badge */}
                {item.badge > 0 && (
                  <span className="badge-danger">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <a
          href="/"
          className="footer-link"
        >
          <Globe className="footer-icon" />
          <span>Public FixFlow Website</span>
        </a>
        <p className="footer-text">
          FixFlow v1.0 &bull; Secure Session
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;