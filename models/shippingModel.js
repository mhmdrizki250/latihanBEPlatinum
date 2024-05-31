// Mengimpor konfigurasi database dari file db.js
const pool = require('../config/db');

// Objek Shipping yang berisi metode untuk berinteraksi dengan tabel shipping di database
const Shipping = {
  // Metode untuk membuat entri pengiriman baru
  create: async (order_id, address, city, postal_code, country) => {
    // Menjalankan query untuk menyisipkan entri pengiriman baru ke dalam tabel shipping
    const result = await pool.query(
      'INSERT INTO shipping (order_id, address, city, postal_code, country) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [order_id, address, city, postal_code, country]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },

  // Metode untuk menemukan entri pengiriman berdasarkan orderId
  findByOrderId: async (orderId) => {
    // Menjalankan query untuk memilih entri pengiriman dari tabel shipping berdasarkan orderId
    const result = await pool.query(
      'SELECT * FROM shipping WHERE order_id = $1',
      [orderId]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },

  // Metode untuk menemukan entri pengiriman berdasarkan userId
  findByUserId: async (userId) => {
    // Menjalankan query untuk memilih entri pengiriman dari tabel shipping dengan menggabungkan tabel orders berdasarkan userId
    const result = await pool.query(
      `SELECT s.* FROM shipping s
       JOIN orders o ON s.order_id = o.order_id
       WHERE o.user_id = $1`,
      [userId]
    );
    // Mengembalikan semua baris dari hasil query
    return result.rows;
  }
};

// Mengekspor objek Shipping sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = Shipping;
