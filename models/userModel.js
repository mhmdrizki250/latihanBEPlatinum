// Mengimpor konfigurasi database dari file db.js
const pool = require('../config/db');

// Objek User yang berisi metode untuk berinteraksi dengan tabel users di database
const User = {
  // Metode untuk membuat pengguna baru
  create: async (username, email, passwordHash) => {
    // Menjalankan query untuk menyisipkan pengguna baru ke dalam tabel users
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, passwordHash]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },

  // Metode untuk menemukan pengguna berdasarkan username
  findByUsername: async (username) => {
    // Menjalankan query untuk memilih pengguna dari tabel users berdasarkan username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  }
};

// Mengekspor objek User sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = User;
