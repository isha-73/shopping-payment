import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const dbPassword = process.env.DATABASE_PASSWORD;


const app = express();
app.use(cors());
app.use(json());

// SSL Certificate
const options = {
    key: readFileSync('./key.pem'),
    cert: readFileSync('./cert.pem')
};

// MySQL Connection
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPassword, // your password
    database: 'paymentdb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Secure Payment API (with SQL Injection protection)
app.post('/secure-pay', (req, res) => {
    const { card_number, expiry_date, cvv, amount, note } = req.body;

    const query = "INSERT INTO payments (user_id,card_number, expiry_date, cvv, amount, note) VALUES (?, ?, ?, ?, ?,?)";
    connection.query(query, ['1',card_number, expiry_date, cvv, amount, note], (error, results) => {
        if (error) throw error;
        res.send('Payment Done (SECURE)');
    });
});
app.get('/get-card', (req, res) => {
    const userId = req.query.user_id;

    // Safer query using parameterized inputs
    const query = `SELECT DISTINCT card_number, expiry_date, cvv FROM payments WHERE user_id = ?`;

    connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});


// Start HTTPS Server
createServer(options, app).listen(5001, () => {
    console.log('Secure server running on https://localhost:5001');
});
