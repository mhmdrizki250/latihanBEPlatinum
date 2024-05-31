// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller order dan middleware verifikasi token
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

// Mendefinisikan rute untuk membuat pesanan baru
// Saat ada permintaan POST ke /create, panggil metode createOrder dari orderController setelah melalui middleware verifyToken
router.post('/create', verifyToken, orderController.createOrder);

// Mendefinisikan rute untuk menambahkan item ke pesanan
// Saat ada permintaan POST ke /add, panggil metode addOrderItem dari orderController setelah melalui middleware verifyToken
router.post('/add', verifyToken, orderController.addOrderItem);

// Mendefinisikan rute untuk mendapatkan detail pesanan berdasarkan ID pesanan
// Saat ada permintaan GET ke /:id, panggil metode getOrder dari orderController setelah melalui middleware verifyToken
router.get('/:id', verifyToken, orderController.getOrder);

// Mendefinisikan rute untuk mendapatkan semua pesanan dari pengguna tertentu berdasarkan userId
// Saat ada permintaan GET ke /user/:userId, panggil metode getUserOrders dari orderController setelah melalui middleware verifyToken
router.get('/user/:userId', verifyToken, orderController.getUserOrders);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
