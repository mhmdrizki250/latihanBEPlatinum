// Mengimpor model Product dan modul path untuk penanganan file
const Product = require('../models/productModel');
const path = require('path');

// Fungsi untuk membuat produk baru
exports.create = async (req, res) => {
  const { product_name, description, price, category_id } = req.body; // Mengambil data produk dari body permintaan
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Mengambil URL gambar jika ada file yang diunggah
  try {
    // Membuat produk baru dalam database
    const newProduct = await Product.create(product_name, description, price, category_id, imageUrl);
    res.json(newProduct); // Mengirimkan produk yang baru dibuat sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk memperbarui produk
exports.update = async (req, res) => {
  const { id } = req.params; // Mengambil id produk dari parameter URL
  const { product_name, description, price, category_id } = req.body; // Mengambil data produk dari body permintaan
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image_url; // Mengambil URL gambar jika ada file yang diunggah atau menggunakan URL gambar yang ada
  try {
    // Memperbarui produk dalam database
    const updatedProduct = await Product.update(id, product_name, description, price, category_id, imageUrl);
    res.json(updatedProduct); // Mengirimkan produk yang diperbarui sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk menghapus produk
exports.delete = async (req, res) => {
  const { id } = req.params; // Mengambil id produk dari parameter URL
  try {
    // Menghapus produk dari database
    await Product.delete(id);
    res.send('Product deleted'); // Mengirimkan respons bahwa produk telah dihapus
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan semua produk
exports.findAll = async (req, res) => {
  try {
    // Mencari semua produk dalam database
    const products = await Product.findAll();
    res.json(products); // Mengirimkan semua produk sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan produk berdasarkan id
exports.findById = async (req, res) => {
  const { id } = req.params; // Mengambil id produk dari parameter URL
  try {
    // Mencari produk berdasarkan id dalam database
    const product = await Product.findById(id);
    res.json(product); // Mengirimkan produk sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};
