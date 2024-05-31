// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller shipping dan middleware verifikasi token
const shippingController = require('../controllers/shippingController');
const verifyToken = require('../middleware/verifyToken');

// Mendefinisikan rute untuk membuat pengiriman baru
// Saat ada permintaan POST ke /create, panggil metode createShipping dari shippingController setelah melalui middleware verifyToken
router.post('/create', verifyToken, shippingController.createShipping);

// Mendefinisikan rute untuk mendapatkan detail pengiriman berdasarkan ID pesanan
// Saat ada permintaan GET ke /order/:orderId, panggil metode getShippingByOrderId dari shippingController setelah melalui middleware verifyToken
router.get('/order/:orderId', verifyToken, shippingController.getShippingByOrderId);

// Mendefinisikan rute untuk mendapatkan semua pengiriman dari pengguna tertentu berdasarkan userId
// Saat ada permintaan GET ke /user/:userId, panggil metode getUserShippings dari shippingController setelah melalui middleware verifyToken
router.get('/user/:userId', verifyToken, shippingController.getUserShippings);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
