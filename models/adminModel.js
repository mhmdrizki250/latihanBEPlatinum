// Mengimpor konfigurasi database dari file db.js
const pool = require('../config/db');

// Objek Admin yang berisi metode untuk berinteraksi dengan tabel admins di database
const Admin = {
  // Metode untuk membuat admin baru
  create: async (username, email, passwordHash) => {
    // Menjalankan query untuk menyisipkan admin baru ke dalam tabel admins
    const result = await pool.query(
      'INSERT INTO admins (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, passwordHash]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },
  
  // Metode untuk menemukan admin berdasarkan username
  findByUsername: async (username) => {
    // Menjalankan query untuk memilih admin dari tabel admins berdasarkan username
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  }
};

// Mengekspor objek Admin sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = Admin;
