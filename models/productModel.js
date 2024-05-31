// Mengimpor konfigurasi database dari file db.js
const pool = require('../config/db');

// Objek Product yang berisi metode untuk berinteraksi dengan tabel products di database
const Product = {
  // Metode untuk membuat produk baru
  create: async (productName, description, price, categoryId, imageUrl) => {
    // Menjalankan query untuk menyisipkan produk baru ke dalam tabel products
    const result = await pool.query(
      'INSERT INTO products (product_name, description, price, category_id, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [productName, description, price, categoryId, imageUrl]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },

  // Metode untuk memperbarui produk yang ada
  update: async (productId, productName, description, price, categoryId, imageUrl) => {
    // Menjalankan query untuk memperbarui produk dalam tabel products
    const result = await pool.query(
      'UPDATE products SET product_name = $1, description = $2, price = $3, category_id = $4, image_url = $5 WHERE product_id = $6 RETURNING *',
      [productName, description, price, categoryId, imageUrl, productId]
    );
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  },

  // Metode untuk menghapus produk berdasarkan productId
  delete: async (productId) => {
    // Menjalankan query untuk menghapus produk dari tabel products
    await pool.query('DELETE FROM products WHERE product_id = $1', [productId]);
  },

  // Metode untuk menemukan semua produk
  findAll: async () => {
    // Menjalankan query untuk memilih semua produk dari tabel products
    const result = await pool.query('SELECT * FROM products');
    // Mengembalikan semua baris dari hasil query
    return result.rows;
  },

  // Metode untuk menemukan produk berdasarkan productId
  findById: async (productId) => {
    // Menjalankan query untuk memilih produk dari tabel products berdasarkan productId
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [productId]);
    // Mengembalikan baris pertama dari hasil query
    return result.rows[0];
  }
};

// Mengekspor objek Product sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = Product;
