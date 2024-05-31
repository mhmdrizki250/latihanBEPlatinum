// Mengimpor instance pool dari konfigurasi database
const pool = require('../config/db');

// Fungsi untuk membuat kategori baru
exports.createCategory = async (req, res) => {
  const { category_name } = req.body; // Mengambil category_name dari body permintaan
  try {
    // Menyisipkan category_name ke dalam tabel categories dan mengembalikan hasilnya
    const result = await pool.query(
      'INSERT INTO categories (category_name) VALUES ($1) RETURNING *',
      [category_name]
    );
    res.json(result.rows[0]); // Mengirimkan kategori yang baru dibuat sebagai respons
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
    res.status(500).send('Server error'); // Mengirimkan respons error jika terjadi kesalahan
  }
};
