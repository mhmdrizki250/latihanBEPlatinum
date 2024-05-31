// Mengimpor jsonwebtoken untuk verifikasi token
const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token pengguna
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Mengambil header authorization dari permintaan
  console.log('Authorization Header:', authHeader); // Log header Authorization untuk debugging

  if (!authHeader) {
    console.error('No authorization header'); // Log jika header authorization tidak ada
    return res.status(403).send('Token is required'); // Mengirimkan respons error jika token tidak ada
  }

  const tokenParts = authHeader.split(' '); // Memisahkan header menjadi bagian-bagian token
  console.log('Token parts:', tokenParts); // Log bagian token untuk debugging

  // Memeriksa apakah format token benar (harus terdiri dari "Bearer" dan token itu sendiri)
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.error('Token format is incorrect'); // Log jika format token salah
    return res.status(403).send('Token format is incorrect'); // Mengirimkan respons error jika format token salah
  }

  const token = tokenParts[1]; // Mengambil token dari bagian kedua
  console.log('Token:', token); // Log token untuk debugging

  // Memverifikasi token dengan kunci rahasia JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed', err); // Log jika verifikasi token gagal
      return res.status(401).send('Invalid token'); // Mengirimkan respons error jika token tidak valid
    }
    console.log('Token verified:', decoded); // Log token yang telah terverifikasi untuk debugging
    req.userId = decoded.id; // Menyimpan id pengguna yang terverifikasi ke dalam objek permintaan
    next(); // Melanjutkan ke middleware atau route handler berikutnya
  });
};

// Mengekspor middleware verifyToken
module.exports = verifyToken;
