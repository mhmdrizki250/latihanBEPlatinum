// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller cart dan middleware verifikasi token
const cartController = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

// Mendefinisikan rute untuk membuat keranjang
// Saat ada permintaan POST ke /create, panggil metode createCart dari cartController setelah melalui middleware verifyToken
router.post('/create', verifyToken, cartController.createCart);

// Mendefinisikan rute untuk menambahkan item ke keranjang
// Saat ada permintaan POST ke /add, panggil metode addItemToCart dari cartController setelah melalui middleware verifyToken
router.post('/add', verifyToken, cartController.addItemToCart);

// Mendefinisikan rute untuk memperbarui item di keranjang
// Saat ada permintaan PUT ke /update/:cartItemId, panggil metode updateCartItem dari cartController setelah melalui middleware verifyToken
router.put('/update/:cartItemId', verifyToken, cartController.updateCartItem);

// Mendefinisikan rute untuk menghapus item dari keranjang
// Saat ada permintaan DELETE ke /delete/:cartItemId, panggil metode deleteCartItem dari cartController setelah melalui middleware verifyToken
router.delete('/delete/:cartItemId', verifyToken, cartController.deleteCartItem);

// Mendefinisikan rute untuk mendapatkan keranjang berdasarkan userId
// Saat ada permintaan GET ke /:userId, panggil metode getCart dari cartController setelah melalui middleware verifyToken
router.get('/:userId', verifyToken, cartController.getCart);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
