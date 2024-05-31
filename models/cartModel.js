// Mengimpor konfigurasi database dari file db.js
const pool = require('../config/db');

// Objek Cart yang berisi metode untuk berinteraksi dengan tabel carts di database
const Cart = {
  // Metode untuk membuat cart baru
  create: async (userId) => {
    // Menjalankan query untuk menyisipkan cart baru ke dalam tabel carts
    const result = await pool.query(
      'INSERT INTO carts (user_id) VALUES ($1) RETURNING *',
      [userId]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },
  
  // Metode untuk menemukan cart berdasarkan userId
  findByUserId: async (userId) => {
    // Menjalankan query untuk memilih cart dari tabel carts berdasarkan userId
    const result = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  }
};

// Objek CartItem yang berisi metode untuk berinteraksi dengan tabel cart_items di database
const CartItem = {
  // Metode untuk menambahkan item ke cart
  add: async (cartId, productId, quantity) => {
    // Menjalankan query untuk menyisipkan item baru ke dalam tabel cart_items
    const result = await pool.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [cartId, productId, quantity]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },
  
  // Metode untuk memperbarui item dalam cart
  update: async (cartItemId, quantity) => {
    // Menjalankan query untuk memperbarui item dalam tabel cart_items
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2 RETURNING *',
      [quantity, cartItemId]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },
  
  // Metode untuk menghapus item dari cart
  delete: async (cartItemId) => {
    // Menjalankan query untuk menghapus item dari tabel cart_items
    await pool.query('DELETE FROM cart_items WHERE cart_item_id = $1', [cartItemId]);
  },
  
  // Metode untuk menemukan item dalam cart berdasarkan cartId
  findByCartId: async (cartId) => {
    // Menjalankan query untuk memilih item dari tabel cart_items berdasarkan cartId
    const result = await pool.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId]);
    // Mengembalikan semua baris dari hasil query
    return result.rows;
  }
};

// Mengekspor objek Cart dan CartItem sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = { Cart, CartItem };
