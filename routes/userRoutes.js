// Mengimpor modul express dan membuat instance router
const express = require('express');
const router = express.Router();

// Mengimpor controller user
const userController = require('../controllers/userController');

// Mendefinisikan rute untuk registrasi pengguna
// Saat ada permintaan POST ke /register, panggil metode register dari userController
router.post('/register', userController.register);

// Mendefinisikan rute untuk login pengguna
// Saat ada permintaan POST ke /login, panggil metode login dari userController
router.post('/login', userController.login);

// Mengekspor router sehingga dapat digunakan di bagian lain dari aplikasi
module.exports = router;
