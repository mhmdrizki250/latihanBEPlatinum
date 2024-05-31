// Mengimpor model Shipping dan Order dari file model yang sesuai
const Shipping = require('../models/shippingModel');
const { Order } = require('../models/orderModel'); // Pastikan ini diimpor dengan benar

// Fungsi untuk membuat pengiriman baru
exports.createShipping = async (req, res) => {
  const { order_id, address, city, postal_code, country } = req.body; // Mengambil data pengiriman dari body permintaan
  try {
    console.log('order_id:', order_id); // Log untuk debugging
    const order = await Order.findById(order_id); // Memastikan pesanan ada
    console.log('order:', order); // Log untuk debugging
    if (!order) return res.status(404).send('Order not found'); // Mengirimkan respons error jika pesanan tidak ditemukan

    // Membuat pengiriman baru dalam database
    const shipping = await Shipping.create(order_id, address, city, postal_code, country);
    res.json(shipping); // Mengirimkan pengiriman yang baru dibuat sebagai respons
  } catch (error) {
    console.error('Error creating shipping:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan detail pengiriman berdasarkan orderId
exports.getShippingByOrderId = async (req, res) => {
  const { orderId } = req.params; // Mengambil orderId dari parameter URL
  try {
    // Mencari pengiriman berdasarkan orderId
    const shipping = await Shipping.findByOrderId(orderId);
    if (!shipping) return res.status(404).send('Shipping not found'); // Mengirimkan respons error jika pengiriman tidak ditemukan

    res.json(shipping); // Mengirimkan detail pengiriman sebagai respons
  } catch (error) {
    console.error('Error getting shipping by order ID:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan semua pengiriman pengguna berdasarkan userId
exports.getUserShippings = async (req, res) => {
  const { userId } = req.params; // Mengambil userId dari parameter URL
  try {
    // Mencari semua pengiriman pengguna berdasarkan userId
    const shippings = await Shipping.findByUserId(userId);
    res.json(shippings); // Mengirimkan semua pengiriman pengguna sebagai respons
  } catch (error) {
    console.error('Error getting user shippings:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};
