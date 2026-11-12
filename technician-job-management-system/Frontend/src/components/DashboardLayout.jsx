import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardPathForRole, formatDate } from '../services/api';
import CustomerSidebar from '../pages/customer/Sidebar';
import TechnicianSidebar from '../pages/technician/Sidebar';
import AdminSidebar from '../pages/admin/Sidebar';

/**
 * DashboardLayout({ title, children })
 * Shared portal shell for authenticated Customer, Technician, and Administrator pages.
 * Renders the role-specific Sidebar component (`customer/Sidebar.jsx`, `technician/Sidebar.jsx`,
 * or `admin/Sidebar.jsx`), the sticky light-mode topbar with notifications and user profile menu,
 * the main page content container, and the dashboard footer.
 */
export default function DashboardLayout({ title, children }) {
  const {
    user,
    unreadCount,
    quoteUnreadCount,
    incomingJobUnreadCount,
    recentNotifications,
    clearNotificationBadge,
    clearQuoteBadge,
    clearIncomingJobBadge,
    logout
  } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const role = user?.role || 'customer';
  const notifPageUrl = `/${role}/notifications`;

  /**
   * handleLogout()
   * Logs out the current user session and redirects to the login page.
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * renderRoleSidebar()
   * Selects and renders the dedicated Sidebar component corresponding to the active user's role.
   */
  const renderRoleSidebar = () => {
    const sidebarProps = {
      user,
      unreadCount,
      quoteUnreadCount,
      incomingJobUnreadCount,
      clearNotificationBadge,
      clearQuoteBadge,
      clearIncomingJobBadge,
      sidebarOpen,
      onCloseSidebar: () => setSidebarOpen(false),
      onLogout: handleLogout
    };

    if (role === 'admin') {
      return <AdminSidebar {...sidebarProps} />;
    }
    if (role === 'technician') {
      return <TechnicianSidebar {...sidebarProps} />;
    }
    return <CustomerSidebar {...sidebarProps} />;
  };

  return (
    <div className="ff-dashboard-wrapper">
      {renderRoleSidebar()}

      <div className="ff-main-content">
        <header className="ff-topbar shadow-sm">
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-lg-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="bi bi-list fs-5"></i>
            </button>
            <div>
              <h1 className="h5 fw-bold mb-0">{title}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 small">
                  <li className="breadcrumb-item">
                    <Link to={dashboardPathForRole(role)} className="text-decoration-none">
                      FixFlow
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="dropdown">
              <button
                className="btn btn-sm btn-outline-secondary position-relative"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell-fill"></i>
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="dropdown-menu dropdown-menu-end shadow p-0" style={{ width: '330px' }}>
                <div className="p-2 px-3 bg-navy text-white d-flex justify-content-between align-items-center rounded-top">
                  <span className="fw-semibold small">FixFlow Notifications</span>
                  <span className="badge bg-teal">{unreadCount} Unread</span>
                </div>
                <div className="list-group list-group-flush" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {recentNotifications.length === 0 ? (
                    <div className="p-3 text-center text-muted small">No notifications yet.</div>
                  ) : (
                    recentNotifications.map((n) => (
                      <Link
                        key={n.id}
                        to={notifPageUrl}
                        className={`list-group-item list-group-item-action small ${!n.is_read ? 'fw-semibold' : ''}`}
                      >
                        <div className="d-flex justify-content-between">
                          <span className="text-truncate">{n.title}</span>
                          <small className="text-muted ms-1">{formatDate(n.created_at)}</small>
                        </div>
                        <div className="text-muted text-truncate small">{n.message}</div>
                      </Link>
                    ))
                  )}
                </div>
                <div className="p-2 text-center border-top">
                  <Link to={notifPageUrl} className="small text-decoration-none fw-semibold">
                    View All Notifications
                  </Link>
                </div>
              </div>
            </div>

            <div className="dropdown">
              <button className="btn btn-sm btn-navy dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-circle me-1"></i>
                {user?.username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm small">
                <li className="dropdown-header">
                  Signed in as <strong>{user?.full_name}</strong>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to={notifPageUrl}>
                    <i className="bi bi-bell me-2"></i>Notifications
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <div className="container-fluid p-4 flex-grow-1">{children}</div>

        <footer className="border-top py-3 px-4 small text-muted d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <div>
            <strong>FixFlow</strong> — Technician Job Management System &bull; Find the Right Technician. Fix It with FixFlow.
          </div>
        </footer>
      </div>
    </div>
  );
}
