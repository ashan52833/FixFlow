import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import { apiFetch, formatMoney } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

/**
 * CustomerDashboardPage()
 * Renders the main Customer Dashboard overview displaying KPI summary cards
 * (total job requests, pending requests, active jobs, completed jobs, unpaid invoices),
 * a table of recent service requests, and recent notifications.
 */
export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState({
    stats: {
      total_jobs: 0,
      pending_requests: 0,
      active_jobs: 0,
      completed_jobs: 0,
      unpaid_count: 0,
      unpaid_sum: 0
    },
    recent_jobs: [],
    recent_notifications: []
  });

  /**
   * Fetch the customer dashboard metrics, recent jobs, and notifications when the component mounts.
   */
  useEffect(() => {
    apiFetch('/customer/dashboard').then(setData).catch(() => {});
  }, []);

  const { stats, recent_jobs, recent_notifications } = data;

  return (
    <DashboardLayout title="Customer Dashboard">
      <div className="ff-card p-4 mb-4 bg-navy text-white">
        <div className="row align-items-center g-3">
          <div className="col-lg-7">
            <h2 className="h4 fw-bold mb-1">Welcome back, {user?.full_name}!</h2>
            <p className="small text-white-50 mb-0">
              Find the Right Technician. Fix It with FixFlow. Manage your Electrician, Plumber, and Computer Repair service requests, approve quotations, track repairs, and settle invoices securely.
            </p>
          </div>
          <div className="col-lg-5 text-lg-end">
            <Link to="/customer/request-service" className="btn btn-accent me-2">
              <i className="bi bi-plus-circle-fill me-1"></i>Request a Service
            </Link>
            <Link to="/customer/find-technicians" className="btn btn-outline-light">
              <i className="bi bi-search me-1"></i>Find Technicians
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl">
          <div className="ff-stat-card">
            <div className="text-muted small fw-semibold">Total Job Requests</div>
            <div className="fs-3 fw-bold mt-1">{stats.total_jobs}</div>
            <Link to="/customer/jobs" className="small text-teal text-decoration-none">
              View all requests &rarr;
            </Link>
          </div>
        </div>
        <div className="col-sm-6 col-xl">
          <div className="ff-stat-card accent-border">
            <div className="text-muted small fw-semibold">Pending Requests</div>
            <div className="fs-3 fw-bold mt-1">{stats.pending_requests}</div>
            <span className="small text-muted">Awaiting technician response</span>
          </div>
        </div>
        {/*<div className="col-sm-6 col-xl">
          <div className="ff-stat-card">
            <div className="text-muted small fw-semibold">Active Jobs</div>
            <div className="fs-3 fw-bold mt-1">{stats.active_jobs}</div>
            <Link to="/customer/active-jobs" className="small text-teal text-decoration-none">
              Track progress &rarr;
            </Link>
          </div>
        </div>*/}
        <div className="col-sm-6 col-xl">
          <div className="ff-stat-card">
            <div className="text-muted small fw-semibold">Completed Jobs</div>
            <div className="fs-3 fw-bold mt-1 text-success">{stats.completed_jobs}</div>
            <Link to="/customer/history" className="small text-teal text-decoration-none">
              View job history &rarr;
            </Link>
          </div>
        </div>
        <div className="col-sm-6 col-xl">
          <div className="ff-stat-card danger-border">
            <div className="text-muted small fw-semibold">Unpaid Invoices ({stats.unpaid_count})</div>
            <div className="fs-4 fw-bold mt-1 text-danger">{formatMoney(stats.unpaid_sum)}</div>
            <Link to="/customer/invoices" className="small text-teal text-decoration-none">
              Pay online &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="ff-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h6 fw-bold mb-0">Recent Service Requests</h3>
              <Link to="/customer/jobs" className="btn btn-sm btn-outline-secondary">
                View All
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle small mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Job Ref</th>
                    <th>Title &amp; Category</th>
                    <th>Technician</th>
                    <th>Status</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recent_jobs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No service requests yet.
                      </td>
                    </tr>
                  ) : (
                    recent_jobs.map((j) => (
                      <tr key={j.id}>
                        <td className="font-monospace fw-bold">{j.job_reference}</td>
                        <td>
                          <strong>{j.title}</strong>
                          <br />
                          <span className="text-muted">{j.category_name}</span>
                        </td>
                        <td>{j.technician_name}</td>
                        <td>
                          <StatusBadge status={j.status} />
                        </td>
                        <td className="text-end">
                          <Link to={`/customer/jobs/${j.id}`} className="btn btn-sm btn-outline-primary">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="ff-card p-4 h-100">
            <h3 className="h6 fw-bold mb-3">Recent Notifications</h3>
            <div className="list-group list-group-flush small">
              {recent_notifications.length === 0 ? (
                <div className="text-muted">No notifications yet.</div>
              ) : (
                recent_notifications.map((n) => (
                  <div key={n.id} className="list-group-item px-0 py-2">
                    <div className="fw-semibold">{n.title}</div>
                    <div className="text-muted">{n.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
