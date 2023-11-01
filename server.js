require('dotenv').config()

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

app.use(express.json());

// Обробник POST-запиту з фронтенду
app.post('/send-email', (req, res) => {
    console.log(req)
    const { name, email, message } = req.body;

    // Налаштування транспортера для надсилання електронної пошти
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    // Налаштовуємо лист для надсилання
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: 'Нове повідомлення з форми',
        text: `Ім'я: ${name} Email: ${email} Повідомлення: ${message}`
    };

    // Надсилаємо лист та повертаємо відповідь на фронтенд
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Помилка при надсиланні листа');
        } else {
            console.log('Email надіслано: ' + info.response);
            res.status(200).send('Email надіслано успішно');
        }
    });
});

// Запускаємо сервер на порті 3000
app.listen(PORT, () => {
    console.log(`Сервер слухає на порті ${PORT}`);
});
