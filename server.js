const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'auto',
    password: '1801'
});

connection.connect(err => {
    if (err) {
        console.error('Помилка підключення до бази даних: ' + err.stack);
        return;
    }
    console.log('Підключено до бази даних як id ' + connection.threadId);
});

// Маршрут для відправлення даних про авто на сторінку admin.html
app.get('/admin/data', (req, res) => {
    const sql = 'SELECT * FROM avto';

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
            return;
        }

        res.json(results);
    });
});
// Маршрут для відправлення даних про авто на сторінку shop.html
app.get('/shop/data', (req, res) => {

    const sql = 'SELECT * FROM avto';

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
            return;
        }

        res.json(results);
    });
});

app.delete('/admin/data/:name', (req, res) => {
    const { name } = req.params;
    const sql = 'DELETE FROM avto WHERE name = ?';

    connection.query(sql, name, (err, result) => {
        if (err) {
            console.error('Помилка видалення даних: ' + err.stack);
            res.status(500).json({ error: 'Помилка видалення даних' });
            return;
        }

        console.log(`Авто з іменем "${name}" було успішно видалено`);
        res.json({ message: `Авто з іменем "${name}" було успішно видалено` });
    });
});

app.post('/admin/data', express.json(), (req, res) => {
    const { name, price } = req.body;
    const sql = 'INSERT INTO avto (name, price) VALUES (?, ?)';
    const values = [name, price];

    connection.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Помилка додавання даних до бази даних' });
            return;
        }

        res.json({ message: 'Додано нове авто', id: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
