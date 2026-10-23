# LIC Insurance Advisory Services — Master Portal

**Authorized Insurance Advisor:** Dnyaneshwar Yedu Bhoi  
**Primary Mobile:** [+91 9923835939](tel:9923835939) | **Secondary Mobile:** [+91 7972131176](tel:7972131176)  
**Business Email:** [licdybhoi@gmail.com](mailto:licdybhoi@gmail.com)  
**Serving Area:** Maharashtra & Pan-India Virtual Consultations  

---

## 🌟 Executive Summary & Capabilities

A complete, production-grade, full-stack financial platform designed specifically for **LIC Insurance Advisory Services (Advisor: Dnyaneshwar Yedu Bhoi)**. Inspired by premium Indian fintech platforms (CRED, Zerodha, HDFC Bank), this portal integrates a responsive public website, an interactive educational insurance calculator, an authenticated customer portal, and an administrative lead & operations console.

### Key Architectural Pillars:
- **Design System:** Deep Navy (`#102A43`), Royal Blue (`#174EA6`), Gold Accent (`#D6AD60`), Background (`#F5F8FC`), and Inter typography with tabular numerals for financial currency formatting in INR (₹).
- **Multi-Language Localization:** Real-time language switching between **English**, **Marathi (मराठी)**, and **Hindi (हिंदी)** across all public navigation, disclaimers, calculator labels, and contact forms.
- **Actuarial Insurance Needs Calculator:** Tested educational calculation engine combining family expense continuity, debt liquidation, and milestone education funds against existing active cover.
- **Relational Data Persistence:** Powered by **Prisma ORM** with normalized models for `User`, `Enquiry`, `EnquiryStatusHistory`, `Consultation`, `InsuranceProduct`, `ConsentRecord`, `Notification`, and `AuditLog`.
- **Indian Compliance & DPDP:** Mandatory statutory disclaimers clarifying that this is an independent advisory portal (not LIC's official corporate website), non-guaranteed returns disclaimer, insurer claim settlement authority notice, and explicit DPDP consent capture.
- **Automated Test Suite:** 100% passing test suite spanning calculation logic, Indian phone number validation, Bcrypt/JWT security, and multi-tenant data isolation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, React Router v6, TanStack Query, Recharts |
| **Backend** | Node.js, Express, TypeScript, REST API (`/api/v1`), Zod validation, Helmet, CORS, Express-Rate-Limit, Nodemailer |
| **Database** | Prisma ORM, SQLite (`prisma/dev.db` for instant zero-dependency local dev/test) + PostgreSQL (`prisma/schema.postgresql.prisma` for production deployment) |
| **Security** | Bcrypt password hashing (salt rounds 10), JWT tokens, Role-Based Access Control (`CUSTOMER`, `ADMIN`, `ADVISOR`), rate limiters on auth endpoints |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js v18+ (tested on Node.js v24.20.0 LTS)
- npm v10+

### 2. Installation
From the root workspace directory:
```bash
# Install root, server, and client dependencies
npm install
npm --prefix server install
npm --prefix client install
```

### 3. Database Migration & Synthetic Seeding
Sync the database schema and populate with verified LIC products and demo accounts:
```bash
# Push schema to SQLite dev database
npx prisma db push --schema=prisma/schema.prisma

# Seed 8 verified LIC products, admin account, customer account, and sample enquiries
npx tsx prisma/seed.ts
```

### 4. Running the Automated Test Suite
Execute the comprehensive test runner covering unit formulas, schema rules, auth cryptography, and database multi-tenant isolation:
```bash
npm test
# or: npx tsx tests/run-all-tests.ts
```

### 5. Running in Development Mode
Starts both the Express API (`http://localhost:5000`) and the Vite React dev server (`http://localhost:5173`) concurrently:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 6. Running in Unified Production Mode
Builds both client and server and serves the full-stack portal from a single port:
```bash
npm run build
npm --prefix server start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

---

## 🔑 Pre-Seeded Accounts (Demo / Review)

| Role | Email | Password | Access |
|---|---|---|---|
| **Administrator** | `admin@licadvisory.in` | `AdminPassword@2026` | Full Admin Console (`/admin`): Metrics, Lead Workflow, Product CMS, Audit Logs |
| **Customer** | `customer@example.com` | `CustomerPassword@2026` | Customer Portal (`/customer`): Track Inquiries, Book Consultations, Edit Profile |

*(Note: The login modal contains one-click buttons to automatically fill these credentials for rapid review).*

---

## 📂 Project Directory Structure

```text
├── client/                     # Frontend Application (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── api/                # Typed REST client connecting to /api/v1
│   │   ├── components/         # Navbar, Footer, Hero, About, Services, Claims, FAQs, AuthModal
│   │   ├── context/            # LanguageContext (EN/MR/HI), AuthContext (JWT & RBAC)
│   │   ├── features/
│   │   │   ├── calculator/     # Educational Insurance Needs Calculator & formulas
│   │   │   ├── products/       # Verified LIC plan cards, filters, and brochures
│   │   │   ├── enquiries/      # Lead capture form with Indian mobile validation & DPDP consent
│   │   │   ├── customer/       # Customer dashboard, timeline, consultation booking
│   │   │   └── admin/          # Admin Recharts analytics, lead management, CMS, audit logs
│   │   ├── i18n/               # Multi-language translations (English, Marathi, Hindi)
│   │   ├── lib/                # Utility helpers (formatINR, getStatusBadgeClasses)
│   │   ├── pages/              # HomePage, CustomerPage, AdminPage
│   │   └── types/              # Domain models & TypeScript definitions
│   ├── vite.config.ts          # Proxy configuration to Express backend
│   └── tailwind.config.js      # Financial design system palette & typography
│
├── server/                     # Backend Application (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/             # Zod-validated environment config, Prisma singleton
│   │   ├── controllers/        # Auth, Enquiry, Product, Consultation, Admin
│   │   ├── middleware/         # AuthGuard, RoleGuard, RateLimiter, ErrorHandler
│   │   ├── routes/             # REST endpoints mounted under /api/v1/
│   │   ├── services/           # AuditService, NotificationService (Email & WhatsApp adapter)
│   │   ├── utils/              # Token signer, logger, response wrappers
│   │   ├── validators/         # Zod schemas for all request payloads
│   │   ├── app.ts              # Express application factory with Helmet & static bundle serving
│   │   └── server.ts           # Server bootstrap & graceful shutdown
│
├── prisma/                     # Database Schema & Migrations
│   ├── schema.prisma           # Prisma SQLite schema for immediate local execution
│   ├── schema.postgresql.prisma# Production PostgreSQL schema with native enums & indexes
│   ├── seed.ts                 # Verified LIC plans, admin/customer seed script
│   └── dev.db                  # Local SQLite database file
│
├── tests/                      # Automated Test Suite
│   ├── calculator.test.ts      # Unit tests for actuarial formulas & edge cases
│   ├── validation.test.ts      # Input schema & Indian phone number validation
│   ├── auth.test.ts            # Bcrypt hashing & JWT signature verification
│   ├── integration.test.ts     # Database persistence & customer data isolation test
│   └── run-all-tests.ts        # Master runner
│
├── DEPLOYMENT.md               # Production deployment instructions (PostgreSQL, SMTP, Domain)
├── package.json                # Monorepo scripts
└── .env.example                # Configuration template
```

---

## ⚖️ Indian Insurance Compliance Notice

This portal is operated by an independent, authorized life insurance advisor and is **not** the official corporate website of Life Insurance Corporation of India (LIC).  
- **Official Portal:** [https://licindia.in](https://licindia.in)  
- **No Guaranteed Returns:** Market-linked insurance products (ULIPs) are subject to investment risks. Bonus additions are subject to insurer declaration.  
- **Claim Authority:** Claim settlement, underwriting approval, and policy issuance decisions are solely governed by the official procedures of Life Insurance Corporation of India.
