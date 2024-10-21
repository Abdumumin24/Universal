const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Express appini yaratish
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDBga ulanish
mongoose.connect('mongodb://localhost:27017/laptopDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDBga ulanish muvaffaqiyatli amalga oshirildi'))
  .catch((error) => console.log('MongoDBga ulanishda xato:', error));

// Noutbuk modeli
const laptopSchema = new mongoose.Schema({
  name: String,
  specs: String,
  price: Number
});

const Laptop = mongoose.model('Laptop', laptopSchema);

// Noutbuk qo'shish
app.post('/laptops', async (req, res) => {
  const { name, specs, price } = req.body;

  try {
    const newLaptop = new Laptop({ name, specs, price });
    await newLaptop.save();
    res.status(201).json(newLaptop);
  } catch (error) {
    res.status(500).json({ message: 'Ma’lumot saqlashda xato yuz berdi' });
  }
});

// Noutbuklar ro‘yxatini olish
app.get('/laptops', async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.status(200).json(laptops);
  } catch (error) {
    res.status(500).json({ message: 'Ma’lumotlarni olishda xato yuz berdi' });
  }
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda`);
});
