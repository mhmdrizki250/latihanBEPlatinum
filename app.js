// Mengimpor dan mengonfigurasi dotenv untuk menggunakan variabel lingkungan dari file .env
require('dotenv').config();

// Mengimpor framework Express
const express = require('express');

// Mengimpor middleware CORS untuk menangani permintaan lintas sumber
const cors = require('cors');

// Membuat instance aplikasi Express
const app = express();

// Mendapatkan nomor port dari variabel lingkungan atau menggunakan port 3000 secara default
const port = process.env.PORT || 3000;

// Menggunakan middleware CORS untuk mengizinkan permintaan lintas sumber
app.use(cors());

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Mengimpor dan menggunakan rute dari berbagai file rute
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const receiptRoutes = require('./routes/receiptRoutes');

// Menggunakan rute
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/shippings', shippingRoutes);
app.use('/payments', paymentRoutes);
app.use('/receipts', receiptRoutes);

// Menjalankan server pada port yang ditentukan dan menampilkan pesan di konsol
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
