// Mengimpor konfigurasi database dari file db.js
const pool = require('../config/db');

// Objek Order yang berisi metode untuk berinteraksi dengan tabel orders di database
const Order = {
  // Metode untuk membuat pesanan baru
  create: async (userId) => {
    // Menjalankan query untuk menyisipkan pesanan baru ke dalam tabel orders
    const result = await pool.query(
      'INSERT INTO orders (user_id) VALUES ($1) RETURNING *',
      [userId]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },
  
  // Metode untuk menemukan pesanan berdasarkan userId
  findByUserId: async (userId) => {
    // Menjalankan query untuk memilih pesanan dari tabel orders berdasarkan userId
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    // Mengembalikan semua baris dari hasil query
    return result.rows;
  },
  
  // Metode untuk menemukan pesanan berdasarkan orderId
  findById: async (orderId) => {
    // Menjalankan query untuk memilih pesanan dari tabel orders berdasarkan orderId
    const result = await pool.query(
      'SELECT * FROM orders WHERE order_id = $1',
      [orderId]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },
  
  // Metode untuk menghitung total harga pesanan berdasarkan orderId
  calculateTotal: async (orderId) => {
    // Menjalankan query untuk menghitung total harga pesanan dari tabel order_items berdasarkan orderId
    const result = await pool.query(
      'SELECT SUM(price * quantity) as total FROM order_items WHERE order_id = $1',
      [orderId]
    );
    // Mengembalikan total harga pesanan
    return result.rows[0].total;
  }
};

// Objek OrderItem yang berisi metode untuk berinteraksi dengan tabel order_items di database
const OrderItem = {
  // Metode untuk menambahkan item ke pesanan
  add: async (orderId, productId, quantity, price) => {
    // Menjalankan query untuk menyisipkan item baru ke dalam tabel order_items
    const result = await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [orderId, productId, quantity, price]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },
  
  // Metode untuk menemukan item dalam pesanan berdasarkan orderId
  findByOrderId: async (orderId) => {
    // Menjalankan query untuk memilih item dari tabel order_items berdasarkan orderId
    const result = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
    // Mengembalikan semua baris dari hasil query
    return result.rows;
  }
};

// Mengekspor objek Order dan OrderItem sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = { Order, OrderItem };
