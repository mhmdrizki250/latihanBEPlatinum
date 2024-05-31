// Mengimpor jsonwebtoken untuk verifikasi token
const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token admin
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Mengambil header authorization dari permintaan
  if (!authHeader) {
    console.error('No authorization header'); // Log jika header authorization tidak ada
    return res.status(403).send('Token is required'); // Mengirimkan respons error jika token tidak ada
  }

  // Menghapus bagian "Bearer" tambahan dari header authorization
  const tokenParts = authHeader.split(' ').filter(part => part !== 'Bearer');
  console.log('Token parts:', tokenParts); // Log bagian token untuk debugging

  if (tokenParts.length !== 1) {
    console.error('Token format is incorrect'); // Log jika format token salah
    return res.status(403).send('Token format is incorrect'); // Mengirimkan respons error jika format token salah
  }

  const token = tokenParts[0];
  console.log('Token:', token); // Log token untuk debugging

  // Memverifikasi token dengan kunci rahasia JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed', err); // Log jika verifikasi token gagal
      return res.status(401).send('Invalid token'); // Mengirimkan respons error jika token tidak valid
    }
    console.log('Token verified:', decoded); // Log token yang telah terverifikasi untuk debugging
    req.adminId = decoded.id; // Menyimpan id admin yang terverifikasi ke dalam objek permintaan
    next(); // Melanjutkan ke middleware atau route handler berikutnya
  });
};

// Mengekspor middleware verifyAdminToken
module.exports = verifyAdminToken;
