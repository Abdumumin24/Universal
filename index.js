require('dotenv').config();  // .env faylidan o'qish uchun

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB ulanish
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB ulanishi muvaffaqiyatli"))
  .catch((error) => console.error("MongoDB ulanishi xatosi:", error));

// Middlewares
app.use(express.json());

// Laptop modeli
const Laptop = mongoose.model('Laptop', new mongoose.Schema({
  name: String,
  specs: String,
  price: Number
}));

// POST request uchun: yangi laptop qo'shish
app.post('/laptops', async (req, res) => {
  const laptop = new Laptop({
    name: req.body.name,
    specs: req.body.specs,
    price: req.body.price
  });
  try {
    const savedLaptop = await laptop.save();
    res.status(201).send(savedLaptop);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// GET request uchun: hamma laptoplarni olish
app.get('/laptops', async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.status(200).send(laptops);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Serverni ishga tushirish
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server ${port}-portda ishlamoqda`);
});




// mongodb+srv://abdumumim24:yqYFd9S1GwLUAeGN@cluster0.yfeqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


