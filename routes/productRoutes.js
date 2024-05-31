// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller produk dan middleware verifikasi token admin
const productController = require('../controllers/productController');
const verifyAdminToken = require('../middleware/verifyAdminToken');

// Mengimpor modul multer untuk mengelola upload file dan modul path untuk mengelola path file
const multer = require('multer');
const path = require('path');

// Mengatur multer untuk menyimpan file yang diupload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Menentukan folder penyimpanan file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Menentukan nama file yang diupload
  }
});
const upload = multer({ storage: storage });

// Rute untuk admin mengelola produk
// Rute POST untuk membuat produk baru dengan upload file gambar
router.post('/', verifyAdminToken, upload.single('image'), productController.create);

// Rute PUT untuk memperbarui produk dengan upload file gambar baru
router.put('/:id', verifyAdminToken, upload.single('image'), productController.update);

// Rute DELETE untuk menghapus produk berdasarkan ID
router.delete('/:id', verifyAdminToken, productController.delete);

// Rute untuk pengguna melihat produk
// Rute GET untuk mendapatkan semua produk
router.get('/', productController.findAll);

// Rute GET untuk mendapatkan detail produk berdasarkan ID
router.get('/:id', productController.findById);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
