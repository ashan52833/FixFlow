-- ============================================================================
-- FixFlow — Technician Job Management System
-- Complete Normalized MySQL 8.0+ Database Schema
-- Tagline: Find the Right Technician. Fix It with FixFlow.
-- ============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `fixflow_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `fixflow_db`;

-- ----------------------------------------------------------------------------
-- 1. users: Core authentication table for Administrator, Customer, Technician
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('admin', 'customer', 'technician') NOT NULL,
    `full_name` VARCHAR(120) NOT NULL,
    `username` VARCHAR(60) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(25) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `phone_verified_at` DATETIME NULL DEFAULT NULL,
    `email_verified_at` DATETIME NULL DEFAULT NULL,
    `status` ENUM('pending_verification', 'pending_approval', 'active', 'suspended', 'deleted') NOT NULL DEFAULT 'pending_verification',
    `avatar_path` VARCHAR(255) NULL DEFAULT NULL,
    `theme_preference` ENUM('system', 'light', 'dark') NOT NULL DEFAULT 'system',
    `last_login_at` DATETIME NULL DEFAULT NULL,
    `last_login_ip` VARCHAR(45) NULL DEFAULT NULL,
    `deleted_at` DATETIME NULL DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_users_username` (`username`),
    UNIQUE KEY `uk_users_email` (`email`),
    INDEX `idx_users_role_status` (`role`, `status`),
    INDEX `idx_users_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. customer_profiles: Extended customer details & preferences
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customer_profiles` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `location_city` VARCHAR(100) NOT NULL,
    `default_address` TEXT NULL,
    `postal_code` VARCHAR(20) NULL,
    `emergency_contact` VARCHAR(25) NULL,
    `sms_notifications` TINYINT(1) NOT NULL DEFAULT 1,
    `email_notifications` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_customer_user` (`user_id`),
    INDEX `idx_customer_city` (`location_city`),
    CONSTRAINT `fk_customer_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. technician_applications: Public technician application workflow
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `technician_applications` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `reference_no` VARCHAR(30) NOT NULL,
    `user_id` INT UNSIGNED NULL DEFAULT NULL,
    `full_name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `preferred_username` VARCHAR(60) NOT NULL,
    `phone` VARCHAR(25) NOT NULL,
    `residential_location` VARCHAR(120) NOT NULL,
    `areas_served` TEXT NOT NULL,
    `service_categories_csv` TEXT NOT NULL,
    `skills_specializations` TEXT NOT NULL,
    `years_experience` INT UNSIGNED NOT NULL DEFAULT 0,
    `qualifications` TEXT NOT NULL,
    `document_path` VARCHAR(255) NULL DEFAULT NULL,
    `short_bio` TEXT NOT NULL,
    `availability_schedule` VARCHAR(150) NOT NULL,
    `starting_rate` DECIMAL(12,2) NOT NULL DEFAULT 1500.00,
    `preferred_contact_method` ENUM('Phone', 'SMS', 'Email', 'In-App') NOT NULL DEFAULT 'Phone',
    `terms_accepted` TINYINT(1) NOT NULL DEFAULT 1,
    `status` ENUM('Pending', 'Under Review', 'Approved', 'Rejected', 'Withdrawn') NOT NULL DEFAULT 'Pending',
    `admin_notes` TEXT NULL,
    `rejection_reason` TEXT NULL,
    `setup_token_hash` VARCHAR(255) NULL DEFAULT NULL,
    `setup_token_expires_at` DATETIME NULL DEFAULT NULL,
    `reviewed_by` INT UNSIGNED NULL DEFAULT NULL,
    `reviewed_at` DATETIME NULL DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_tech_app_ref` (`reference_no`),
    INDEX `idx_tech_app_status` (`status`),
    INDEX `idx_tech_app_email` (`email`),
    CONSTRAINT `fk_tech_app_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_tech_app_reviewer` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. technician_profiles: Approved & active technician professional profile
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `technician_profiles` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `application_id` INT UNSIGNED NULL DEFAULT NULL,
    `headline` VARCHAR(160) NOT NULL,
    `biography` TEXT NOT NULL,
    `skills` TEXT NOT NULL,
    `qualifications` TEXT NOT NULL,
    `years_experience` INT UNSIGNED NOT NULL DEFAULT 1,
    `base_location` VARCHAR(100) NOT NULL,
    `starting_price` DECIMAL(12,2) NOT NULL DEFAULT 1500.00,
    `availability_status` ENUM('Available', 'Busy', 'Unavailable') NOT NULL DEFAULT 'Available',
    `working_hours` VARCHAR(160) NOT NULL DEFAULT 'Mon-Sat: 8:00 AM - 6:00 PM',
    `preferred_contact` ENUM('Phone', 'SMS', 'Email', 'In-App') NOT NULL DEFAULT 'Phone',
    `is_verified_badge` TINYINT(1) NOT NULL DEFAULT 1,
    `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
    `completed_jobs_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `average_rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    `total_reviews` INT UNSIGNED NOT NULL DEFAULT 0,
    `total_earnings` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    `certification_file` VARCHAR(255) NULL DEFAULT NULL,
    `approved_by` INT UNSIGNED NULL DEFAULT NULL,
    `approved_at` DATETIME NULL DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_tech_profile_user` (`user_id`),
    INDEX `idx_tech_availability` (`availability_status`, `is_verified_badge`),
    INDEX `idx_tech_location` (`base_location`),
    INDEX `idx_tech_rating` (`average_rating` DESC),
    CONSTRAINT `fk_tech_profile_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_tech_profile_app` FOREIGN KEY (`application_id`) REFERENCES `technician_applications` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. service_categories: Platform repair & technical service categories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_categories` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(110) NOT NULL,
    `icon_class` VARCHAR(60) NOT NULL DEFAULT 'bi-tools',
    `description` TEXT NOT NULL,
    `base_inspection_fee` DECIMAL(12,2) NOT NULL DEFAULT 1000.00,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `display_order` INT NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_category_slug` (`slug`),
    INDEX `idx_category_active` (`is_active`, `display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. technician_services: Many-to-many link between technicians and categories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `technician_services` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `technician_user_id` INT UNSIGNED NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    `custom_starting_rate` DECIMAL(12,2) NULL DEFAULT NULL,
    `experience_notes` VARCHAR(255) NULL DEFAULT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_tech_category` (`technician_user_id`, `category_id`),
    CONSTRAINT `fk_tech_serv_user` FOREIGN KEY (`technician_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_tech_serv_cat` FOREIGN KEY (`category_id`) REFERENCES `service_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
