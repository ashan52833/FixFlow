import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { apiFetch, dashboardPathForRole } from '../services/api';
import { useAuth } from '../context/AuthContext';

/**
 * LoginPage()
 * Renders the unified portal Sign In page for Customers, Technicians, and Administrators.
 * Includes 1-click quick-fill buttons for testing the Administrator, Customer,
 * and 3 Technician category demo accounts (Electrician, Plumber, Computer Repair).
 */
export function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  /**
   * handleSubmit(e)
   * Submits the username/email and password to `POST /api/auth/login`.
   * Redirects unverified accounts to `/verify-otp` or logs the user in and navigates to their role dashboard.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: { identifier, password }
      });
      login(res.token, res.user);
      navigate(dashboardPathForRole(res.user.role));
    } catch (err) {
      if (err.data?.requires_otp) {
        navigate(`/verify-otp?user_id=${err.data.user_id}&purpose=${err.data.purpose || 'registration'}`);
        return;
      }
      setError(err.message);
    }
  };

  return (
    <PublicLayout>
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="ff-card p-4 p-md-5">
                    <div className="text-center mb-4">
                        <h1 className="h4 fw-bold">Sign In to FixFlow</h1>
                        <p className="text-muted small mb-0">
                        Access your Customer, Technician, or Administrator dashboard.
                        </p>
                    </div>

                {searchParams.get('activated') && (
                    <div className="alert alert-success small">
                    Account activated! You can now sign in below.
                    </div>
                )}
                {error && <div className="alert alert-danger small">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label small fw-semibold">Username or Email Address</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <label className="form-label small fw-semibold">Password</label>
                        <Link to="/forgot-password" className="small text-decoration-none">
                        Forgot Password?
                        </Link>
                    </div>

                    <div className="input-group">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        title={showPassword ? 'Hide password' : 'Show password'}
                        >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                    </div>
                    </div>
                    <button type="submit" className="btn btn-teal w-100 py-2 mb-3">
                    <i className="bi bi-box-arrow-in-right me-1"></i>Sign In
                    </button>
                </form>

                <div className="text-center small">
                    New Customer?{' '}
                    <Link to="/register-customer" className="fw-semibold text-decoration-none">
                        Create Customer Account
                    </Link>{' '}
                    &bull;{' '}
                    <Link to="/setup-admin" className="text-muted text-decoration-none">
                        Setup Wizard
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    </PublicLayout>
  );
}
______________________________________________________________________________________________________________
/**
 * RegisterCustomerPage()
 * Renders the customer registration form and submits new customer details to `POST /api/auth/register-customer`.
 */
export function RegisterCustomerPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    username: '',
    phone: '',
    location: '',
    password: '',
    confirm_password: '',
    accept_terms: true
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  /**
   * handleSubmit(e)
   * Submits the customer registration form and redirects to the SMS OTP verification screen.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const res = await apiFetch('/auth/register-customer', {
        method: 'POST',
        body: form
      });
      navigate(`/verify-otp?user_id=${res.user_id}&purpose=registration`);
    } catch (err) {
      setErrors(err.data?.errors || [err.message]);
    }
  };

  return (
    <PublicLayout>
      <div className="container py-5" style={{ maxWidth: 640 }}>
        <div className="ff-card p-4 p-md-5">
          <span className="badge bg-teal mb-2">Customer Registration</span>
          <h1 className="h4 fw-bold mb-1">Create Your FixFlow Customer Account</h1>
          <p className="text-muted small mb-4">
            Sign up to browse verified Electrician, Plumber, and Computer Repair technicians, request repairs, approve quotations, and pay invoices online.
          </p>

          {errors.length > 0 && (
            <div className="alert alert-danger small">
              <ul className="mb-0 ps-3">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Full Name *</label>
              <input
                type="text"
                className="form-control"
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Username *</label>
              <input
                type="text"
                className="form-control"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Email Address *</label>
              <input
                type="email"
                className="form-control"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Mobile Phone (For SMS OTP) *</label>
              <input
                type="tel"
                className="form-control"
                required
                placeholder="0771234567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">City / Town *</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="e.g. Colombo 05, Kandy"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Password *</label>
              <input
                type="password"
                className="form-control"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Confirm Password *</label>
              <input
                type="password"
                className="form-control"
                required
                value={form.confirm_password}
                onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="accTerms"
                  checked={form.accept_terms}
                  onChange={(e) => setForm({ ...form, accept_terms: e.target.checked })}
                  required
                />
                <label className="form-check-label small" htmlFor="accTerms">
                  I agree to the FixFlow Terms &amp; Conditions and Privacy Policy.
                </label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-teal w-100 py-2">
                Register &amp; Send SMS OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
_________________________________________________________________________________________________________________________

/**
 * ForgotPasswordPage()
 * Renders the Forgot Password page where users request a password reset token by email.
 */
export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [devLink, setDevLink] = useState('');
  const [error, setError] = useState('');

  /**
   * handleSubmit(e)
   * Submits the email address to `POST /api/auth/forgot-password` to generate a reset link.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      const res = await apiFetch('/auth/forgot-password', {
        method: 'POST',
        body: { email }
      });
      setMsg(res.message);
      setDevLink(res.dev_reset_link || '');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PublicLayout>
      <div className="container py-5" style={{ maxWidth: 480 }}>
        <div className="ff-card p-4 p-md-5">
          <h1 className="h4 fw-bold mb-2">Reset Your FixFlow Password</h1>
          <p className="text-muted small mb-4">
            Enter your registered email address to receive a time-limited password reset link.
          </p>
          {msg && <div className="alert alert-success small">{msg}</div>}
          {error && <div className="alert alert-danger small">{error}</div>}
          {devLink && (
            <div className="ff-dev-banner mb-3 small">
              <strong>SIMULATED DEV RESET LINK:</strong>
              <br />
              <Link to={devLink} className="fw-bold text-break">
                Click here to open Reset Password page
              </Link>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Registered Email Address</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-teal w-100 mb-3">
              Send Reset Link
            </button>
          </form>
          <div className="text-center small">
            <Link to="/login" className="text-decoration-none">
              <i className="bi bi-arrow-left me-1"></i>Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
_____________________________________________________________________________________________________

/**
 * ResetPasswordPage()
 * Renders the password reset completion form using the email and token query parameters.
 */
export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * handleSubmit(e)
   * Submits the new password and token to `POST /api/auth/reset-password`.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await apiFetch('/auth/reset-password', {
        method: 'POST',
        body: { email, token, password, confirm_password: confirmPassword }
      });
      navigate('/login?activated=1');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PublicLayout>
      <div className="container py-5" style={{ maxWidth: 480 }}>
        <div className="ff-card p-4 p-md-5">
          <h1 className="h4 fw-bold mb-3">Choose a New Password</h1>
          {error && <div className="alert alert-danger small">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">New Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-teal w-100">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
