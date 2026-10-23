const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Running production build pipeline...');

// 1. If DATABASE_URL is set and starts with postgres, ensure PostgreSQL schema is active
if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
  console.log('📦 Configuring PostgreSQL schema for production...');
  const postgresSchemaPath = path.join(__dirname, '../prisma/schema.postgresql.prisma');
  const targetSchemaPath = path.join(__dirname, '../prisma/schema.prisma');
  if (fs.existsSync(postgresSchemaPath)) {
    fs.copyFileSync(postgresSchemaPath, targetSchemaPath);
  }
}

// 2. Generate Prisma Client
console.log('🔧 Generating Prisma Client...');
execSync('npx prisma generate', { stdio: 'inherit' });

// 3. Sync database schema to PostgreSQL
if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
  console.log('🗄️ Syncing schema with production PostgreSQL database...');
  try {
    execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
    console.log('🌱 Seeding initial verified products and admin accounts...');
    execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });
  } catch (err) {
    console.warn('Database push/seed notice:', err.message);
  }
}

// 4. Build Server TypeScript
console.log('⚡ Building Backend Server...');
execSync('npm --prefix server run build', { stdio: 'inherit' });

// 5. Build Client Vite bundle
console.log('🎨 Building Frontend Client Bundle...');
execSync('npm --prefix client run build', { stdio: 'inherit' });

console.log('✅ Production build completed successfully!');
