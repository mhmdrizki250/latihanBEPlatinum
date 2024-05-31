// Mengimpor kelas Pool dari modul pg (PostgreSQL)
const { Pool } = require('pg');

// Membuat instance koneksi pool dengan konfigurasi yang diambil dari variabel lingkungan
const pool = new Pool({
  user: process.env.DB_USER,       // Nama pengguna untuk koneksi database PostgreSQL
  host: process.env.DB_HOST,       // Hostname server database PostgreSQL
  database: process.env.DB_DATABASE, // Nama database yang akan digunakan
  password: process.env.DB_PASSWORD, // Kata sandi untuk koneksi ke database PostgreSQL
  port: process.env.DB_PORT,       // Nomor port untuk koneksi ke database PostgreSQL
});

// Mengekspor instance pool agar dapat digunakan di file lain
module.exports = pool;
