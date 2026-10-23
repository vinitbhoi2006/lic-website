# Production Deployment & Operations Guide
### LIC Insurance Advisory Services Portal

This guide provides step-by-step procedures to deploy the full-stack portal to production with PostgreSQL, live email delivery, SSL/HTTPS certificates, and operational monitoring.

---

## 1. Production PostgreSQL Database Setup

While local development and test automation run zero-configuration SQLite (`prisma/dev.db`), production environments should use a managed PostgreSQL cluster (e.g., Supabase, Neon, AWS RDS, or Render).

### Step 1: Obtain Connection String
Obtain your PostgreSQL connection string:
```text
postgresql://<username>:<password>@<db-host>:5432/<database_name>?sslmode=require
```

### Step 2: Use the PostgreSQL Schema
Copy or switch to the dedicated production PostgreSQL schema:
```bash
cp prisma/schema.postgresql.prisma prisma/schema.prisma
```

### Step 3: Run Database Migrations
Deploy all tables, constraints, indexes, and enums:
```bash
export DATABASE_URL="postgresql://<username>:<password>@<db-host>:5432/<database_name>?sslmode=require"
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

---

## 2. Live Email Notification Configuration

The backend contains a production email adapter in `server/src/services/notification.service.ts`.  
Configure your SMTP credentials in `server/.env`:

```env
# Notification Recipient: licdybhoi@gmail.com
SMTP_HOST="smtp.sendgrid.net" # or smtp.resend.com, email-smtp.ap-south-1.amazonaws.com
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASS="your_secure_smtp_api_key"
SMTP_FROM="LIC Advisory Services <noreply@yourdomain.in>"
```

### Verification:
1. When `SMTP_HOST` is configured, live transactional emails are dispatched to `licdybhoi@gmail.com` upon new inquiry submission and to the customer with their tracking reference number.
2. If `SMTP_HOST` is left blank, the application automatically enters safe development mode: it logs the email content to the server terminal and records the event in the `Notification` database table with status `SIMULATED_DEV`.

---

## 3. Production Environment Variables Checklist

Ensure these variables are set in your production hosting dashboard (e.g. Render, Railway, Vercel, or AWS ECS):

| Variable | Description | Example |
|---|---|---|
| `PORT` | Node.js listening port | `5000` |
| `NODE_ENV` | Environment identifier | `production` |
| `DATABASE_URL` | PostgreSQL connection URI | `postgresql://...` |
| `JWT_SECRET` | Cryptographically random key (min 32 chars) | `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | Token validity period | `7d` |
| `CLIENT_ORIGIN` | Authorized domain for CORS | `https://licadvisory.in` |
| `ADVISOR_NAME` | Business advisor identity | `Dnyaneshwar Yedu Bhoi` |
| `ADVISOR_PRIMARY_PHONE` | Primary contact mobile | `9923835939` |
| `ADVISOR_SECONDARY_PHONE`| Secondary contact mobile | `7972131176` |
| `ADVISOR_EMAIL` | Business inquiry notification email | `licdybhoi@gmail.com` |

---

## 4. Production Build & Execution

To run the unified full-stack server on a cloud VM or container:

```bash
# 1. Install dependencies
npm install --production=false
npm --prefix server install
npm --prefix client install

# 2. Build frontend and backend
npm run build

# 3. Start unified Node.js process (serves both API & React client)
NODE_ENV=production npm --prefix server start
```

---

## 5. Nginx Reverse Proxy & SSL (Let's Encrypt)

Sample `/etc/nginx/sites-available/licadvisory.in`:

```nginx
server {
    server_name licadvisory.in www.licadvisory.in;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable HTTPS via Certbot:
```bash
sudo certbot --nginx -d licadvisory.in -d www.licadvisory.in
```

---

## 6. Database Backup & Disaster Recovery

### Automated Daily PostgreSQL Backup:
```bash
pg_dump -Fc -d "$DATABASE_URL" -f "/var/backups/lic_db_$(date +%Y%m%d).dump"
```

### Restoration:
```bash
pg_restore -d "$DATABASE_URL" -c "/var/backups/lic_db_20261010.dump"
```

---

## 7. Administrator Credentials Security

Do **not** use the default demo password in production. To rotate the administrator password:

```bash
# Generate a fresh Bcrypt hash for Advisor Dnyaneshwar Bhoi
npx tsx -e "
const bcrypt = require('bcryptjs');
bcrypt.hash('YourNewSecureAdminPasswordHere', 10).then(console.log);
"
```
Update the password hash directly in the `User` table for `admin@licadvisory.in`.
