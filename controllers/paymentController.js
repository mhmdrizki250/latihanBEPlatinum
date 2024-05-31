// Mengimpor model Payment dan Order dari file model yang sesuai
const Payment = require('../models/paymentModel');
const { Order } = require('../models/orderModel'); // Pastikan ini diimpor dengan benar

// Fungsi untuk membuat pembayaran baru
exports.createPayment = async (req, res) => {
  const { order_id, payment_method, amount } = req.body; // Mengambil order_id, payment_method, dan amount dari body permintaan
  try {
    // Verifikasi bahwa pesanan ada
    const order = await Order.findById(order_id);
    if (!order) return res.status(404).send('Order not found');

    // Membuat pembayaran baru dalam database
    const payment = await Payment.create(order_id, payment_method, amount);
    res.json(payment); // Mengirimkan pembayaran yang baru dibuat sebagai respons
  } catch (error) {
    console.error('Error creating payment:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan pembayaran berdasarkan orderId
exports.getPaymentByOrderId = async (req, res) => {
  const { orderId } = req.params; // Mengambil orderId dari parameter URL
  try {
    // Mencari pembayaran berdasarkan orderId
    const payment = await Payment.findByOrderId(orderId);
    if (!payment) return res.status(404).send('Payment not found'); // Mengirimkan respons error jika pembayaran tidak ditemukan

    res.json(payment); // Mengirimkan detail pembayaran sebagai respons
  } catch (error) {
    console.error('Error getting payment by order ID:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan semua pembayaran pengguna berdasarkan userId
exports.getUserPayments = async (req, res) => {
  const { userId } = req.params; // Mengambil userId dari parameter URL
  try {
    // Mencari semua pembayaran pengguna berdasarkan userId
    const payments = await Payment.findByUserId(userId);
    res.json(payments); // Mengirimkan semua pembayaran pengguna sebagai respons
  } catch (error) {
    console.error('Error getting user payments:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan tanda terima transaksi berdasarkan orderId
exports.getTransactionReceipt = async (req, res) => {
  const { orderId } = req.params; // Mengambil orderId dari parameter URL
  try {
    // Mencari pembayaran berdasarkan orderId
    const payment = await Payment.findByOrderId(orderId);
    if (!payment) return res.status(404).send('Payment not found'); // Mengirimkan respons error jika pembayaran tidak ditemukan

    res.json(payment); // Mengembalikan detail pembayaran sebagai tanda terima
  } catch (error) {
    console.error('Error getting transaction receipt:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};
