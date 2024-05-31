// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller payment dan middleware verifikasi token
const paymentController = require('../controllers/paymentController');
const verifyToken = require('../middleware/verifyToken');

// Mendefinisikan rute untuk membuat pembayaran baru
// Saat ada permintaan POST ke /create, panggil metode createPayment dari paymentController setelah melalui middleware verifyToken
router.post('/create', verifyToken, paymentController.createPayment);

// Mendefinisikan rute untuk mendapatkan detail pembayaran berdasarkan ID pesanan
// Saat ada permintaan GET ke /order/:orderId, panggil metode getPaymentByOrderId dari paymentController setelah melalui middleware verifyToken
router.get('/order/:orderId', verifyToken, paymentController.getPaymentByOrderId);

// Mendefinisikan rute untuk mendapatkan semua pembayaran dari pengguna tertentu berdasarkan userId
// Saat ada permintaan GET ke /user/:userId, panggil metode getUserPayments dari paymentController setelah melalui middleware verifyToken
router.get('/user/:userId', verifyToken, paymentController.getUserPayments);

// Mendefinisikan rute untuk mendapatkan tanda terima transaksi berdasarkan ID pesanan
// Saat ada permintaan GET ke /receipt/:orderId, panggil metode getTransactionReceipt dari paymentController setelah melalui middleware verifyToken
router.get('/receipt/:orderId', verifyToken, paymentController.getTransactionReceipt);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
