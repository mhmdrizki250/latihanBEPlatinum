// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller receipt dan middleware verifikasi token
const receiptController = require('../controllers/receiptController');
const verifyToken = require('../middleware/verifyToken');

// Mendefinisikan rute untuk mendapatkan tanda terima berdasarkan ID pesanan
// Saat ada permintaan GET ke /:orderId, panggil metode getReceipt dari receiptController setelah melalui middleware verifyToken
router.get('/:orderId', verifyToken, receiptController.getReceipt);

// Mendefinisikan rute untuk mendownload tanda terima berdasarkan ID pesanan
// Saat ada permintaan GET ke /download/:orderId, panggil metode downloadReceipt dari receiptController setelah melalui middleware verifyToken
router.get('/download/:orderId', verifyToken, receiptController.downloadReceipt);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
