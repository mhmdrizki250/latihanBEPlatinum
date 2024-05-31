// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller admin
const adminController = require('../controllers/adminController');

// Mendefinisikan rute untuk pendaftaran admin
// Saat ada permintaan POST ke /register, panggil metode register dari adminController
router.post('/register', adminController.register);

// Mendefinisikan rute untuk login admin
// Saat ada permintaan POST ke /login, panggil metode login dari adminController
router.post('/login', adminController.login);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
