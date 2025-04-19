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

    const query = "INSERT INTO payments (card_number, expiry_date, cvv, amount, note) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [card_number, expiry_date, cvv, amount, note], (error, results) => {
        if (error) throw error;
        res.send('Payment Done (SECURE)');
    });
});

// Start HTTPS Server
createServer(options, app).listen(5001, () => {
    console.log('Secure server running on https://localhost:5001');
});
