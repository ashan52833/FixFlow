-- ============================================================================
-- FixFlow — Technician Job Management System
-- Initial Seed Data (Service Categories, System Settings & Development Demo Records)
-- Note: Use install/setup_admin.php to create your first Administrator account
-- and optionally initialize development test passwords.
-- ============================================================================

USE `fixflow_db`;

-- ----------------------------------------------------------------------------
-- 1. System Settings
-- ----------------------------------------------------------------------------
INSERT INTO `system_settings` (`setting_group`, `setting_key`, `setting_value`, `description`) VALUES
('general', 'site_name', 'FixFlow', 'Official application name'),
('general', 'site_tagline', 'Find the Right Technician. Fix It with FixFlow.', 'Official platform tagline'),
('general', 'support_email', 'support@fixflow.local', 'Customer and technician support email'),
('general', 'support_phone', '+94 11 234 5678', 'Platform support hotline'),
('general', 'currency_code', 'LKR', 'Default billing currency code'),
('general', 'currency_symbol', 'Rs.', 'Default currency display symbol'),
('policies', 'cancellation_allowed_statuses', 'Requested,Accepted,Quotation Sent', 'Job statuses where customer cancellation is permitted without dispute'),
('policies', 'quotation_default_validity_days', '7', 'Default number of days before a quotation expires'),
('policies', 'require_quote_approval', '1', 'Require customer quotation approval before chargeable work begins'),
('sms', 'sms_driver', 'simulated', 'Active SMS provider driver (simulated, notifylk, textlk, webhook)'),
('sms', 'otp_expiry_minutes', '5', 'OTP code validity window in minutes'),
('sms', 'otp_resend_cooldown_seconds', '60', 'Minimum seconds between OTP resend requests'),
('sms', 'otp_max_attempts', '5', 'Maximum incorrect OTP verification attempts'),
('payment', 'payment_mode', 'demo', 'Payment mode: demo (Simulated Dev Mode), sandbox (PayHere Sandbox), live (PayHere Live)'),
('payment', 'payhere_merchant_id', '1210000', 'PayHere Merchant ID'),
('payment', 'allow_cash_payments', '1', 'Allow cash or manual payment recording with technician/admin confirmation'),
('payment', 'settlement_model', 'platform_collected', 'Payments collected by FixFlow platform and recorded toward technician earnings')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- ----------------------------------------------------------------------------
-- 2. Service Categories
-- ----------------------------------------------------------------------------
INSERT INTO `service_categories` (`id`, `name`, `slug`, `icon_class`, `description`, `base_inspection_fee`, `is_active`, `display_order`) VALUES
(1, 'Electrical Repairs', 'electrical-repairs', 'bi-lightning-charge-fill', 'Complete residential and commercial electrical wiring, distribution board upgrades, circuit breaker fault finding, lighting installation, and surge protection.', 1500.00, 1, 1),
(2, 'Plumbing & Pipefitting', 'plumbing-pipefitting', 'bi-droplet-half', 'Leak detection, pipe replacement, water pump repairs, bathroom fittings, drainage unblocking, and overhead tank plumbing services.', 1200.00, 1, 2),
(3, 'Computer & IT Repairs', 'computer-it-repairs', 'bi-pc-display', 'Laptop and desktop hardware diagnostics, SSD/RAM upgrades, OS recovery, home/office Wi-Fi networking, and printer troubleshooting.', 1500.00, 1, 4),
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`);

-- ----------------------------------------------------------------------------
-- 3. Development Sample Accounts (Locked placeholder hashes until setup script runs)
-- Note: Run `php install/setup_admin.php` or open `/fixflow/install/setup_admin.php`
-- to create your Administrator login and optionally enable demo test logins.
-- ----------------------------------------------------------------------------
INSERT INTO `users` (`id`, `role`, `full_name`, `username`, `email`, `phone`, `password_hash`, `phone_verified_at`, `email_verified_at`, `status`) VALUES
(1, 'admin', 'FixFlow System Administrator', 'admin', 'admin@fixflow.local', '+94112345678', '$2b$10$wK1.q0n1wO3vR5yT8uI9o.e8mZpL4kX2cV6bN7mQ9rS0tU1vW2xY3', NOW(), NOW(), 'active'),
(2, 'customer', 'Nimali Perera', 'nimali_p', 'nimali@example.local', '+94771234501', '$2y$10$LockedDemoAccountUseSetupScriptToEnable00000000000000000', NOW(), NOW(), 'active'),
(3, 'customer', 'Ruwan Jayawardena', 'ruwan_j', 'ruwan@example.local', '+94771234502', '$2y$10$LockedDemoAccountUseSetupScriptToEnable00000000000000000', NOW(), NOW(), 'active'),
(4, 'technician', 'Kasun Silva', 'kasun_elec', 'kasun.tech@example.local', '+94712345601', '$2y$10$LockedDemoAccountUseSetupScriptToEnable00000000000000000', NOW(), NOW(), 'active'),
(5, 'technician', 'Tharindu Bandara', 'tharindu_plumb', 'tharindu.tech@example.local', '+94712345603', '$2y$10$LockedDemoAccountUseSetupScriptToEnable00000000000000000', NOW(), NOW(), 'active'),
(6, 'technician', 'Dinesh Rajapaksha', 'dinesh_it', 'dinesh.tech@example.local', '+94712345604', '$2y$10$LockedDemoAccountUseSetupScriptToEnable00000000000000000', NOW(), NOW(), 'active')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`);

INSERT INTO `customer_profiles` (`user_id`, `location_city`, `default_address`, `postal_code`, `emergency_contact`) VALUES
(2, 'Colombo 05', 'No. 42, Havelock Road, Colombo 05', '00500', '+94779998877'),
(3, 'Kandy', 'No. 18, Peradeniya Road, Kandy', '20000', '+94778887766')
ON DUPLICATE KEY UPDATE `location_city` = VALUES(`location_city`);

