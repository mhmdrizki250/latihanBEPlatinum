// Mengimpor bcryptjs untuk hashing password dan jsonwebtoken untuk pembuatan token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mengimpor model User dari userModel
const User = require('../models/userModel');

// Fungsi untuk registrasi pengguna baru
exports.register = async (req, res) => {
  const { username, email, password } = req.body; // Mengambil username, email, dan password dari body permintaan
  const passwordHash = await bcrypt.hash(password, 10); // Meng-hash password dengan bcrypt
  try {
    // Membuat pengguna baru dalam database
    const newUser = await User.create(username, email, passwordHash);
    res.json(newUser); // Mengirimkan pengguna yang baru dibuat sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk login pengguna
exports.login = async (req, res) => {
  const { username, password } = req.body; // Mengambil username dan password dari body permintaan
  try {
    // Mencari pengguna berdasarkan username
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).send('User not found'); // Mengirimkan respons error jika pengguna tidak ditemukan

    // Membandingkan password yang diberikan dengan password hash dalam database
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).send('Invalid password'); // Mengirimkan respons error jika password tidak cocok

    // Membuat token JWT dengan user_id dan menyetelnya untuk kedaluwarsa dalam 1 jam
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token); // Log token untuk debugging
    res.json({ token }); // Mengirimkan token sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};
