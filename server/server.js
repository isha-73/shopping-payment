import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const dbPassword = process.env.DATABASE_PASSWORD;


const app = express();
app.use(cors());
app.use(json());

// MySQL Connection
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPassword, // your password
    database: 'paymentdb',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Insecure Payment API (vulnerable)
app.post('/pay', (req, res) => {
    const { card_number, expiry_date, cvv, amount, note } = req.body;

    const query = `INSERT INTO payments (user_id, card_number, expiry_date, cvv, amount, note)
                   VALUES ('1','${card_number}', '${expiry_date}', '${cvv}', '${amount}', '${note}')`;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send('Payment Done (INSECURE)');
    });
});
app.get('/transactions', (req, res) => {
    const query = 'SELECT amount, note FROM payments where user_id = 1';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.get('/get-card', (req, res) => {
    const userId = req.query.user_id;

    // This is INSECURE SQL (vulnerable to injection intentionally)
    const query = `SELECT DISTINCT card_number, expiry_date, cvv FROM payments WHERE user_id = ${userId} `;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
        
   
});



// Start HTTP Server
app.listen(5000, () => {
    console.log('Insecure server running on http://localhost:5000');
});
