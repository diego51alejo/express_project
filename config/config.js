require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  dbEngine: process.env.DB_ENGINE,
  dbUrl: process.env.DATABASE_URL,
  isProd: process.env.NODE_ENV === 'production',
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET, 
  smpt_email: process.env.SMTP_EMAIL,
  smpt_password: process.env.SMTP_PASSWORD,

}

module.exports = { config };