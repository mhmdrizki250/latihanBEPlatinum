// Mengimpor konfigurasi database dari file db.js
const pool = require('../config/db');

// Objek Payment yang berisi metode untuk berinteraksi dengan tabel payments di database
const Payment = {
  // Metode untuk membuat pembayaran baru
  create: async (order_id, payment_method, amount) => {
    // Menjalankan query untuk menyisipkan pembayaran baru ke dalam tabel payments
    const result = await pool.query(
      'INSERT INTO payments (order_id, payment_method, amount) VALUES ($1, $2, $3) RETURNING *',
      [order_id, payment_method, amount]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },

  // Metode untuk menemukan pembayaran berdasarkan orderId
  findByOrderId: async (orderId) => {
    // Menjalankan query untuk memilih pembayaran dari tabel payments berdasarkan orderId
    const result = await pool.query(
      'SELECT * FROM payments WHERE order_id = $1',
      [orderId]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },

  // Metode untuk menemukan pembayaran berdasarkan userId
  findByUserId: async (userId) => {
    // Menjalankan query untuk memilih pembayaran dari tabel payments dengan menggabungkan tabel orders berdasarkan userId
    const result = await pool.query(
      `SELECT p.* FROM payments p
       JOIN orders o ON p.order_id = o.order_id
       WHERE o.user_id = $1`,
      [userId]
    );
    // Mengembalikan semua baris dari hasil query
    return result.rows;
  }
};

// Mengekspor objek Payment sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = Payment;
