import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

/* Public Website Pages */
import {
  HomePage,
  TechniciansDirectoryPage,
  TechnicianPublicProfilePage,
  ApplyTechnicianPage,
  ApplicationStatusPage,
  SetupTechnicianPage,
  SetupAdminPage,
  AboutPage,
  FaqPage,
  ContactPage,
  PrivacyPage,
  TermsPage,
  Forbidden403Page,
  NotFound404Page
} from './pages/PublicPages';

/* Authentication Pages */
import {
  LoginPage,
  RegisterCustomerPage,
  VerifyOtpPage,
  ForgotPasswordPage,
  ResetPasswordPage
} from '../pages/AuthPages';

/* Separated Customer Portal Pages (pages/customer/*) */
import CustomerDashboardPage from './pages/customer/Dashboard';
import CustomerFindTechniciansPage from './pages/customer/FindTechnicians';
import CustomerRequestServicePage from './pages/customer/RequestService';
import CustomerJobsPage from './pages/customer/Jobs';
import CustomerActiveJobsPage from './pages/customer/ActiveJobs';
import CustomerJobDetailsPage from './pages/customer/JobDetails';
import CustomerQuotationsPage from './pages/customer/Quotations';
import CustomerInvoicesPage from './pages/customer/Invoices';
import CustomerHistoryPage from './pages/customer/History';
import CustomerMessagesPage from './pages/customer/Messages';
import CustomerSavedTechniciansPage from './pages/customer/SavedTechnicians';
import CustomerReviewsPage from './pages/customer/Reviews';
import CustomerNotificationsPage from './pages/customer/Notifications';
import CustomerProfilePage from './pages/customer/Profile';
import CustomerSettingsPage from './pages/customer/Settings';

/* Separated Technician Portal Pages (pages/technician/*) */
import TechnicianDashboardPage from './pages/technician/Dashboard';
import TechnicianIncomingJobsPage from './pages/technician/IncomingJobs';
import TechnicianAcceptedJobsPage from './pages/technician/AcceptedJobs';
import TechnicianActiveJobsPage from './pages/technician/ActiveJobs';
import TechnicianCreateQuotationPage from './pages/technician/CreateQuotation';
import TechnicianQuotationsPage from './pages/technician/Quotations';
import TechnicianCreateInvoicePage from './pages/technician/CreateInvoice';
import TechnicianInvoicesPage from './pages/technician/Invoices';
import TechnicianHistoryPage from './pages/technician/History';
import TechnicianAvailabilityPage from './pages/technician/Availability';
import TechnicianServicesPage from './pages/technician/Services';
import TechnicianServiceAreasPage from './pages/technician/ServiceAreas';
import TechnicianMessagesPage from './pages/technician/Messages';
import TechnicianReviewsPage from './pages/technician/Reviews';
import TechnicianEarningsPage from './pages/technician/Earnings';
import TechnicianNotificationsPage from './pages/technician/Notifications';
import TechnicianProfilePage from './pages/technician/Profile';
import TechnicianSettingsPage from './pages/technician/Settings';

/* Separated Administrator Portal Pages (pages/admin/*) */
import AdminDashboardPage from './pages/admin/Dashboard';
import AdminUsersPage from './pages/admin/Users';
import AdminApplicationsPage from './pages/admin/Applications';
import AdminCategoriesPage from './pages/admin/Categories';
import AdminJobsPage from './pages/admin/Jobs';
import AdminQuotationsPage from './pages/admin/Quotations';
import AdminInvoicesPage from './pages/admin/Invoices';
import AdminPaymentsPage from './pages/admin/Payments';
import AdminReviewsPage from './pages/admin/Reviews';
import AdminReportsPage from './pages/admin/Reports';
import AdminNotificationsPage from './pages/admin/Notifications';
import AdminSettingsPage from './pages/admin/Settings';
import AdminAuditLogsPage from './pages/admin/AuditLogs';

/* Payment & Printable Invoice Pages */
import {
  CheckoutPage,
  DemoGatewayPage,
  PaymentReceiptPage,
  InvoicePrintPage
} from './pages/PaymentPages';

/**
 * App()
 * Root application component that wraps the application in `AuthProvider` and `BrowserRouter`
 * and defines all public, authentication, customer, technician, administrator, and payment routes.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/technicians" element={<TechniciansDirectoryPage />} />
          <Route path="/technicians/:id" element={<TechnicianPublicProfilePage />} />
          <Route path="/apply-technician" element={<ApplyTechnicianPage />} />
          <Route path="/application-status" element={<ApplicationStatusPage />} />
          <Route path="/setup-technician" element={<SetupTechnicianPage />} />
          <Route path="/setup-admin" element={<SetupAdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/403" element={<Forbidden403Page />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-customer" element={<RegisterCustomerPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Customer Portal Routes (pages/customer/*) */}
          <Route path="/customer" element={<ProtectedRoute role="customer"><CustomerDashboardPage /></ProtectedRoute>} />
          <Route path="/customer/find-technicians" element={<ProtectedRoute role="customer"><CustomerFindTechniciansPage /></ProtectedRoute>} />
          <Route path="/customer/request-service" element={<ProtectedRoute role="customer"><CustomerRequestServicePage /></ProtectedRoute>} />
          <Route path="/customer/jobs" element={<ProtectedRoute role="customer"><CustomerJobsPage /></ProtectedRoute>} />
          <Route path="/customer/jobs/:id" element={<ProtectedRoute role="customer"><CustomerJobDetailsPage /></ProtectedRoute>} />
          <Route path="/customer/active-jobs" element={<ProtectedRoute role="customer"><CustomerActiveJobsPage /></ProtectedRoute>} />
          <Route path="/customer/quotations" element={<ProtectedRoute role="customer"><CustomerQuotationsPage /></ProtectedRoute>} />
          <Route path="/customer/invoices" element={<ProtectedRoute role="customer"><CustomerInvoicesPage /></ProtectedRoute>} />
          <Route path="/customer/history" element={<ProtectedRoute role="customer"><CustomerHistoryPage /></ProtectedRoute>} />
          <Route path="/customer/messages" element={<ProtectedRoute role="customer"><CustomerMessagesPage /></ProtectedRoute>} />
          <Route path="/customer/saved-technicians" element={<ProtectedRoute role="customer"><CustomerSavedTechniciansPage /></ProtectedRoute>} />
          <Route path="/customer/reviews" element={<ProtectedRoute role="customer"><CustomerReviewsPage /></ProtectedRoute>} />
          <Route path="/customer/notifications" element={<ProtectedRoute role="customer"><CustomerNotificationsPage /></ProtectedRoute>} />
          <Route path="/customer/profile" element={<ProtectedRoute role="customer"><CustomerProfilePage /></ProtectedRoute>} />
          <Route path="/customer/settings" element={<ProtectedRoute role="customer"><CustomerSettingsPage /></ProtectedRoute>} />

          {/* Technician Portal Routes (pages/technician/*) */}
          <Route path="/technician" element={<ProtectedRoute role="technician"><TechnicianDashboardPage /></ProtectedRoute>} />
          <Route path="/technician/incoming-jobs" element={<ProtectedRoute role="technician"><TechnicianIncomingJobsPage /></ProtectedRoute>} />
          <Route path="/technician/accepted-jobs" element={<ProtectedRoute role="technician"><TechnicianAcceptedJobsPage /></ProtectedRoute>} />
          <Route path="/technician/active-jobs" element={<ProtectedRoute role="technician"><TechnicianActiveJobsPage /></ProtectedRoute>} />
          <Route path="/technician/create-quotation" element={<ProtectedRoute role="technician"><TechnicianCreateQuotationPage /></ProtectedRoute>} />
          <Route path="/technician/quotations" element={<ProtectedRoute role="technician"><TechnicianQuotationsPage /></ProtectedRoute>} />
          <Route path="/technician/create-invoice" element={<ProtectedRoute role="technician"><TechnicianCreateInvoicePage /></ProtectedRoute>} />
          <Route path="/technician/invoices" element={<ProtectedRoute role="technician"><TechnicianInvoicesPage /></ProtectedRoute>} />
          <Route path="/technician/history" element={<ProtectedRoute role="technician"><TechnicianHistoryPage /></ProtectedRoute>} />
          <Route path="/technician/availability" element={<ProtectedRoute role="technician"><TechnicianAvailabilityPage /></ProtectedRoute>} />
          <Route path="/technician/services" element={<ProtectedRoute role="technician"><TechnicianServicesPage /></ProtectedRoute>} />
          <Route path="/technician/service-areas" element={<ProtectedRoute role="technician"><TechnicianServiceAreasPage /></ProtectedRoute>} />
          <Route path="/technician/messages" element={<ProtectedRoute role="technician"><TechnicianMessagesPage /></ProtectedRoute>} />
          <Route path="/technician/reviews" element={<ProtectedRoute role="technician"><TechnicianReviewsPage /></ProtectedRoute>} />
          <Route path="/technician/earnings" element={<ProtectedRoute role="technician"><TechnicianEarningsPage /></ProtectedRoute>} />
          <Route path="/technician/notifications" element={<ProtectedRoute role="technician"><TechnicianNotificationsPage /></ProtectedRoute>} />
          <Route path="/technician/profile" element={<ProtectedRoute role="technician"><TechnicianProfilePage /></ProtectedRoute>} />
          <Route path="/technician/settings" element={<ProtectedRoute role="technician"><TechnicianSettingsPage /></ProtectedRoute>} />

          {/* Administrator Portal Routes (pages/admin/*) */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/applications" element={<ProtectedRoute role="admin"><AdminApplicationsPage /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute role="admin"><AdminCategoriesPage /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute role="admin"><AdminJobsPage /></ProtectedRoute>} />
          <Route path="/admin/quotations" element={<ProtectedRoute role="admin"><AdminQuotationsPage /></ProtectedRoute>} />
          <Route path="/admin/invoices" element={<ProtectedRoute role="admin"><AdminInvoicesPage /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute role="admin"><AdminPaymentsPage /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute role="admin"><AdminReviewsPage /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminReportsPage /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute role="admin"><AdminNotificationsPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettingsPage /></ProtectedRoute>} />
          <Route path="/admin/audit-logs" element={<ProtectedRoute role="admin"><AdminAuditLogsPage /></ProtectedRoute>} />

          {/* Payment & Printable Invoice Routes */}
          <Route path="/payment/checkout/:invoiceId" element={<ProtectedRoute role="customer"><CheckoutPage /></ProtectedRoute>} />
          <Route path="/payment/demo-gateway" element={<ProtectedRoute role="customer"><DemoGatewayPage /></ProtectedRoute>} />
          <Route path="/payment/receipt" element={<ProtectedRoute><PaymentReceiptPage /></ProtectedRoute>} />
          <Route path="/invoice-print/:id" element={<ProtectedRoute><InvoicePrintPage /></ProtectedRoute>} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound404Page />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
