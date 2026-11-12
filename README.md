# FixFlow — Technician Job Management System (React.js + Node.js/Express.js + WampServer MySQL)

> **Tagline:** *Find the Right Technician. Fix It with FixFlow.*

This is the complete full-stack **FixFlow** application built with **React.js (Vite + React Router v6 + Bootstrap 5.3)** on the frontend, **Node.js + Express.js (`mysql2/promise`, JWT, `bcryptjs`, `multer`)** on the backend, and **WampServer (MySQL 8 / phpMyAdmin)** for the database.

---

## 1. Key Platform Features

1. **3 Specialized Technician Categories:**
   - **Electrician**
   - **Plumber**
   - **Computer Repair**
2. **Clean Light Mode Design System:**
   - Styled in a dedicated Light Mode palette (Deep Navy `#0F2647`, Teal `#00A896`, and Warm Amber `#F59E0B`) with detailed CSS documentation in `frontend/src/assets/fixflow.css`.
3. **Modular Role-Based Page & Sidebar Architecture:**
   - Every Customer, Technician, and Administrator page and sidebar is separated into its own dedicated `.jsx` module under `frontend/src/pages/customer/`, `frontend/src/pages/technician/`, and `frontend/src/pages/admin/`.
4. **Comprehensive Function & Code Comments:**
   - Every frontend component, handler, service utility, and backend API route/helper function includes descriptive documentation explaining what happens in that code.

---

## 2. Project Architecture & Structure

```text
fixflow-react-node-wamp/
├── README.md                     # Step-by-step WampServer, Node.js & React.js Setup Guide
├── database/
│   ├── schema.sql                # Normalized 27-table MySQL 8 InnoDB database schema
│   └── seed.sql                  # Initial 3 categories (Electrician, Plumber, Computer Repair), settings & demo accounts
├── backend/                      # Node.js + Express.js REST API Server (Port 5000)
│   ├── package.json
│   ├── .env                      # Pre-configured for WampServer MySQL (root / empty password)
│   ├── server.js                 # Express API server entry point
│   ├── config/
│   │   └── db.js                 # mysql2/promise connection pool & system_settings helper
│   ├── middleware/
│   │   ├── auth.js               # JWT token verification & Role-Based Access Control (RBAC)
│   │   └── upload.js             # Multer file uploads (certifications, jobs, messages, profiles)
│   ├── utils/
│   │   ├── helpers.js            # Reference generator, phone normalizer, rating recalculator, audit logger
│   │   ├── notificationService.js# In-app, SMS & Email notification dispatcher
│   │   ├── smsService.js         # 6-digit SMS OTP generator & Simulated Development OTP mode
│   │   └── paymentService.js     # PayHere MD5 signature verifier, Demo Sandbox & Cash settlement
│   ├── routes/
│   │   ├── authRoutes.js         # Login, Customer Sign Up, OTP Verification, Password Reset
│   │   ├── publicRoutes.js       # Home, Technician Directory, Public Profile, Technician Application, Setup Wizard
│   │   ├── customerRoutes.js     # Customer Dashboard endpoints & Job Timeline
│   │   ├── technicianRoutes.js   # Technician Dashboard endpoints & Dynamic Quote/Invoice Builder
│   │   ├── adminRoutes.js        # Admin Dashboard endpoints, Analytics & CSV Exporter
│   │   └── paymentRoutes.js      # Checkout, Demo Sandbox Simulator, PayHere Webhook, Receipt & Printable Invoice
│   └── uploads/                  # Uploaded attachments directory
└── frontend/                     # React.js Single-Page Application (Port 5173)
    ├── package.json
    ├── vite.config.js            # Proxies /api and /uploads to http://localhost:5000
    ├── index.html                # Light-mode HTML entry point
    └── src/
        ├── main.jsx
        ├── App.jsx               # React Router v6 routes for Public, Customer, Technician & Admin
        ├── assets/fixflow.css    # Commented Light Mode Navy/Teal/Amber design system
        ├── context/AuthContext.jsx
        ├── services/api.js
        ├── components/           # BrandLogo, StatusBadge, PublicLayout, DashboardLayout, ProtectedRoute
        └── pages/
            ├── PublicPages.jsx
            ├── AuthPages.jsx
            ├── PaymentPages.jsx
            ├── customer/         # Sidebar.jsx, Dashboard.jsx, FindTechnicians.jsx, RequestService.jsx, Jobs.jsx, ActiveJobs.jsx, JobDetails.jsx, Quotations.jsx, Invoices.jsx, History.jsx, Messages.jsx, SavedTechnicians.jsx, Reviews.jsx, Notifications.jsx, Profile.jsx, Settings.jsx
            ├── technician/       # Sidebar.jsx, Dashboard.jsx, IncomingJobs.jsx, AcceptedJobs.jsx, ActiveJobs.jsx, CreateQuotation.jsx, Quotations.jsx, CreateInvoice.jsx, Invoices.jsx, History.jsx, Availability.jsx, Services.jsx, ServiceAreas.jsx, Messages.jsx, Reviews.jsx, Earnings.jsx, Notifications.jsx, Profile.jsx, Settings.jsx
            └── admin/            # Sidebar.jsx, Dashboard.jsx, Users.jsx, Applications.jsx, Categories.jsx, Jobs.jsx, Quotations.jsx, Invoices.jsx, Payments.jsx, Reviews.jsx, Reports.jsx, Notifications.jsx, Settings.jsx, AuditLogs.jsx
```

---

## 3. Step-by-Step Setup with WampServer, Node.js & React.js

### Step 1: Start WampServer & Import Database (`fixflow_db`)
1. Launch **WampServer** on Windows and wait until the WampServer system tray icon turns **Green**.
2. Left-click the WampServer tray icon and open **phpMyAdmin** (`http://localhost/phpmyadmin`).
   - Default WampServer MySQL login: Username `root`, Password *(leave blank)*.
3. Click the **Import** tab at the top:
   - First, select `database/schema.sql` and click **Import** (creates the `fixflow_db` database and all 27 tables).
   - Next, select `database/seed.sql` and click **Import** (populates the 3 technician categories: **Electrician**, **Plumber**, **Computer Repair**, system settings, and sample accounts).

*(Alternative WampServer MySQL Console Import)*:
```powershell
mysql -u root < database/schema.sql
mysql -u root fixflow_db < database/seed.sql
```

### Step 2: Configure & Start the Node.js + Express.js Backend
1. Open a terminal inside the `backend` folder:
   ```powershell
   cd backend
   npm install
   ```
2. Verify `backend/.env` matches your WampServer MySQL settings:
   ```ini
   PORT=5000
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=fixflow_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```
3. Start the Express backend server:
   ```powershell
   npm run dev
   # or: npm start
   ```
   The API will start on `http://localhost:5000` (health check: `http://localhost:5000/api/health`).

### Step 3: Start the React.js Frontend
1. Open a second terminal inside the `frontend` folder:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```
2. Open your browser to **`http://localhost:5173`**.

---

## 4. Ready-to-Use Demo Credentials

The login page (`http://localhost:5173/login`) includes **1-Click Quick-Fill Buttons** for testing every portal immediately:

| Role | Username | Email | Password |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin` | `admin@fixflow.local` | `Admin123!` |
| **Customer** | `nimali_p` | `nimali@example.local` | `Demo1234!` |
| **Customer** | `ruwan_j` | `ruwan@example.local` | `Demo1234!` |
| **Technician (Electrician)** | `kasun_elec` | `kasun.tech@example.local` | `Demo1234!` |
| **Technician (Plumber)** | `tharindu_plumb` | `tharindu.tech@example.local` | `Demo1234!` |
| **Technician (Computer Repair)** | `dinesh_it` | `dinesh.tech@example.local` | `Demo1234!` |

You can also visit `http://localhost:5173/setup-admin` at any time to customize the Administrator or Demo account passwords in `fixflow_db`.
