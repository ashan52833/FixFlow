import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const Topbar = ({
  title = 'Home Page',
  username = 'nimali_p',
  fullName = 'Nimali Perera',
  notificationCount = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed-topbar">
      {/* Left: Page Title & Breadcrumb */}
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
        <nav className="topbar-breadcrumb" aria-label="breadcrumb">
          <Link to="/" className="breadcrumb-link">FixFlow</Link>
        </nav>
      </div>

      {/* Right: Actions & User Profile */}
      <div className="topbar-right">
        {/* Notification Bell Button */}
        <Link to="/notifications" className="topbar-btn-notif">
          <Bell size={15} className="notif-bell-icon" />
          {notificationCount > 0 && (
            <span className="topbar-notif-badge">{notificationCount}</span>
          )}
        </Link>

        {/* User Profile Dropdown Button */}
        <div className="dropdown-container" ref={dropdownRef}>
          <button
            type="button"
            className="dropdown-trigger"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
          >
            {/* User Circle Icon */}
            <svg className="user-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <span className="username">{username}</span>
            <span className="caret-icon">▼</span>
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                Signed in as <strong>{fullName}</strong>
              </div>

              <hr className="dropdown-divider" />

              <ul className="dropdown-list">
                <li className="dropdown-item">
                  {/* Bell Icon */}
                  <svg
                    className="item-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span>Notifications</span>
                </li>

                <li className="dropdown-item logout">
                  {/* Logout Icon */}
                  <svg
                    className="item-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;