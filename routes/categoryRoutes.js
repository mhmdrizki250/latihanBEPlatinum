// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller category dan middleware verifikasi token admin
const categoryController = require('../controllers/categoryController');
const verifyAdminToken = require('../middleware/verifyAdminToken');

// Mendefinisikan rute untuk membuat kategori baru
// Saat ada permintaan POST ke /, panggil metode createCategory dari categoryController setelah melalui middleware verifyAdminToken
router.post('/', verifyAdminToken, categoryController.createCategory);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
