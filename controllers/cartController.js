// Mengimpor instance pool dari konfigurasi database
const pool = require('../config/db');

// Fungsi untuk membuat keranjang baru
exports.createCart = async (req, res) => {
  const { user_id } = req.body;
  try {
    // Menyisipkan user_id ke dalam tabel carts dan mengembalikan hasilnya
    const result = await pool.query(
      'INSERT INTO carts (user_id) VALUES ($1) RETURNING *',
      [user_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error');
  }
};

// Fungsi untuk menambahkan item ke dalam keranjang
exports.addItemToCart = async (req, res) => {
  const { cart_id, product_id, quantity } = req.body;
  try {
    // Menyisipkan item ke dalam tabel cart_items dan mengembalikan hasilnya
    const result = await pool.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [cart_id, product_id, quantity]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error');
  }
};

// Fungsi untuk memperbarui jumlah item dalam keranjang
exports.updateCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;
  try {
    // Memperbarui quantity item di dalam tabel cart_items dan mengembalikan hasilnya
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2 RETURNING *',
      [quantity, cartItemId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Cart item not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error');
  }
};

// Fungsi untuk menghapus item dari keranjang
exports.deleteCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  try {
    // Menghapus item dari tabel cart_items
    await pool.query(
      'DELETE FROM cart_items WHERE cart_item_id = $1',
      [cartItemId]
    );
    res.send('Cart item deleted');
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error');
  }
};

// Fungsi untuk mendapatkan keranjang berdasarkan user_id
exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    // Mendapatkan keranjang berdasarkan user_id
    const result = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Cart not found');
    }
    const cartId = result.rows[0].cart_id;
    // Mendapatkan item-item dalam keranjang berdasarkan cart_id
    const itemsResult = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1',
      [cartId]
    );
    res.json({
      cart: result.rows[0],
      items: itemsResult.rows
    });
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error');
  }
};
