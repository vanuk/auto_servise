const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Додавання CORS middleware
app.use(cors());

// Налаштування підключення до бази даних
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'auto',
    password: '1801'
});

// Підключення до бази даних
connection.connect(err => {
    if (err) {
        console.error('Помилка підключення до бази даних: ' + err.stack);
        return;
    }
    console.log('Підключено до бази даних як id ' + connection.threadId);
});

// Маршрут для відправлення даних про авто на сторінку admin.html
app.get('/admin/data', (req, res) => {
    // SQL-запит для вибору даних (приклад)
    const sql = 'SELECT * FROM avto';

    // Виконання запиту до бази даних
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
            return;
        }

        // Відправлення результатів як JSON
        res.json(results);
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

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
