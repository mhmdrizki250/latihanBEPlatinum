// Mengimpor model Order dan OrderItem dari file orderModel
const { Order, OrderItem } = require('../models/orderModel');

// Mengimpor model Payment dan Shipping dari file model yang sesuai
const Payment = require('../models/paymentModel');
const Shipping = require('../models/shippingModel');

// Mengimpor PDFKit untuk membuat dokumen PDF
const PDFDocument = require('pdfkit');

// Fungsi untuk mendapatkan tanda terima (receipt) berdasarkan orderId
exports.getReceipt = async (req, res) => {
  const { orderId } = req.params; // Mengambil orderId dari parameter URL
  try {
    // Mencari pesanan berdasarkan orderId
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).send('Order not found'); // Mengirimkan respons error jika pesanan tidak ditemukan

    // Mencari item pesanan, pembayaran, dan pengiriman berdasarkan orderId
    const orderItems = await OrderItem.findByOrderId(orderId);
    const payment = await Payment.findByOrderId(orderId);
    const shipping = await Shipping.findByOrderId(orderId);

    // Membuat objek tanda terima yang berisi informasi pesanan, item pesanan, pembayaran, dan pengiriman
    const receipt = {
      order,
      orderItems,
      payment,
      shipping
    };

    res.json(receipt); // Mengirimkan objek tanda terima sebagai respons
  } catch (error) {
    console.error('Error getting receipt:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};

// Fungsi untuk mengunduh tanda terima dalam bentuk PDF
exports.downloadReceipt = async (req, res) => {
  const { orderId } = req.params; // Mengambil orderId dari parameter URL
  try {
    // Mencari pesanan berdasarkan orderId
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).send('Order not found'); // Mengirimkan respons error jika pesanan tidak ditemukan

    // Mencari item pesanan, pembayaran, dan pengiriman berdasarkan orderId
    const orderItems = await OrderItem.findByOrderId(orderId);
    const payment = await Payment.findByOrderId(orderId);
    const shipping = await Shipping.findByOrderId(orderId);

    // Membuat dokumen PDF baru
    const doc = new PDFDocument();

    // Menetapkan header respons untuk mengunduh file PDF
    res.setHeader('Content-Disposition', `attachment; filename=receipt-${orderId}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    // Mengirimkan output PDF ke respons
    doc.pipe(res);

    // Menambahkan judul tanda terima ke PDF
    doc.fontSize(20).text('Transaction Receipt', { align: 'center' });
    doc.moveDown();

    // Menambahkan detail pesanan ke PDF
    doc.fontSize(14).text(`Order ID: ${order.order_id}`);
    doc.text(`User ID: ${order.user_id}`);
    doc.text(`Order Date: ${order.order_date}`);
    doc.text(`Status: ${order.status}`);
    doc.moveDown();

    // Menambahkan item pesanan ke PDF
    doc.fontSize(16).text('Order Items');
    orderItems.forEach(item => {
      doc.fontSize(14).text(`Product ID: ${item.product_id}`);
      doc.text(`Quantity: ${item.quantity}`);
      doc.text(`Price: ${item.price}`);
      doc.moveDown();
    });

    // Menambahkan detail pembayaran ke PDF
    doc.fontSize(16).text('Payment');
    doc.fontSize(14).text(`Payment Method: ${payment.payment_method}`);
    doc.text(`Payment Date: ${payment.payment_date}`);
    doc.text(`Amount: ${payment.amount}`);
    doc.moveDown();

    // Menambahkan detail pengiriman ke PDF
    doc.fontSize(16).text('Shipping');
    doc.fontSize(14).text(`Address: ${shipping.address}`);
    doc.text(`City: ${shipping.city}`);
    doc.text(`Postal Code: ${shipping.postal_code}`);
    doc.text(`Country: ${shipping.country}`);
    doc.text(`Shipping Date: ${shipping.shipping_date}`);

    // Mengakhiri dan mengirimkan dokumen PDF
    doc.end();
  } catch (error) {
    console.error('Error downloading receipt:', error); // Log untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};
