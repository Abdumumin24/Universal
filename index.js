const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Laptop = require('./models/laptop'); // Laptop modelini import qilish

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static fayllarni public papkadan olish
app.use(express.static(path.join(__dirname, 'public')));

// MongoDBga ulanish
mongoose.connect('mongodb+srv://abdumumim24:yqYFd9S1GwLUAeGN@cluster0.yfeqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => console.log('MongoDBga ulanish muvaffaqiyatli amalga oshirildi'))
    .catch((error) => console.log('MongoDBga ulanishda xato:', error));

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


