// Mengimpor model Order dan OrderItem dari orderModel
const { Order, OrderItem } = require('../models/orderModel');

// Mengimpor model Product dari productModel
const Product = require('../models/productModel');

// Fungsi untuk membuat pesanan baru
exports.createOrder = async (req, res) => {
  const { userId } = req.body; // Mengambil userId dari body permintaan
  try {
    // Membuat pesanan baru dalam database
    const order = await Order.create(userId);
    res.json(order); // Mengirimkan pesanan yang baru dibuat sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk menambahkan item ke dalam pesanan
exports.addOrderItem = async (req, res) => {
  const { order_id, product_id, quantity } = req.body; // Mengambil order_id, product_id, dan quantity dari body permintaan
  try {
    // Mencari produk berdasarkan product_id
    const product = await Product.findById(product_id);
    if (!product) return res.status(404).send('Product not found'); // Mengirimkan respons error jika produk tidak ditemukan

    const price = product.price; // Mengambil harga produk
    // Menambahkan item ke dalam pesanan dalam database
    const orderItem = await OrderItem.add(order_id, product_id, quantity, price);
    res.json(orderItem); // Mengirimkan item pesanan yang baru ditambahkan sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan detail pesanan berdasarkan id
exports.getOrder = async (req, res) => {
  const { id } = req.params; // Mengambil id dari parameter URL
  try {
    // Mencari pesanan berdasarkan id
    const order = await Order.findById(id);
    if (!order) return res.status(404).send('Order not found'); // Mengirimkan respons error jika pesanan tidak ditemukan

    // Mendapatkan item-item dalam pesanan berdasarkan orderId
    const orderItems = await OrderItem.findByOrderId(id);
    const total = await Order.calculateTotal(id); // Menghitung total pesanan
    res.json({ order, orderItems, total }); // Mengirimkan detail pesanan, item-item, dan total sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mendapatkan semua pesanan pengguna berdasarkan userId
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params; // Mengambil userId dari parameter URL
  try {
    // Mencari semua pesanan pengguna berdasarkan userId
    const orders = await Order.findByUserId(userId);
    for (const order of orders) {
      order.total = await Order.calculateTotal(order.order_id); // Menghitung total setiap pesanan
    }
    res.json(orders); // Mengirimkan semua pesanan pengguna sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};
