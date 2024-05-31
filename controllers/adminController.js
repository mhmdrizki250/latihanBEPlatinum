// Mengimpor bcrypt untuk hashing password
const bcrypt = require('bcryptjs');

// Mengimpor jwt untuk token autentikasi
const jwt = require('jsonwebtoken');

// Mengimpor model Admin
const Admin = require('../models/adminModel');

// Fungsi untuk registrasi admin baru
exports.register = async (req, res) => {
  // Mengambil data dari request body
  const { username, email, password } = req.body;
  
  // Meng-hash password dengan bcrypt
  const passwordHash = await bcrypt.hash(password, 10);
  
  try {
    // Membuat admin baru di database
    const newAdmin = await Admin.create(username, email, passwordHash);
    
    // Mengembalikan data admin baru sebagai response
    res.json(newAdmin);
  } catch (error) {
    // Menangani kesalahan dan mengirimkan response status 500
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Fungsi untuk login admin
exports.login = async (req, res) => {
  // Mengambil data dari request body
  const { username, password } = req.body;
  
  try {
    // Mencari admin berdasarkan username
    const admin = await Admin.findByUsername(username);
    
    // Jika admin tidak ditemukan, mengembalikan response status 404
    if (!admin) return res.status(404).send('Admin not found');

    // Membandingkan password yang diberikan dengan password yang tersimpan di database
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    
    // Jika password tidak cocok, mengembalikan response status 400
    if (!isMatch) return res.status(400).send('Invalid password');

    // Membuat token JWT untuk admin yang berhasil login
    const token = jwt.sign({ id: admin.admin_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Log the token
    console.log('Generated token:', token);
    
    // Mengembalikan token sebagai response
    res.json({ token });
  } catch (error) {
    // Menangani kesalahan dan mengirimkan response status 500
    console.error(error);
    res.status(500).send('Server error');
  }
};
