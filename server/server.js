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
    database: 'paymentdb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Insecure Payment API (vulnerable)
app.post('/pay', (req, res) => {
    const { card_number, expiry_date, cvv, amount, note } = req.body;

    const query = `INSERT INTO payments (card_number, expiry_date, cvv, amount, note)
                   VALUES ('${card_number}', '${expiry_date}', '${cvv}', '${amount}', '${note}')`;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send('Payment Done (INSECURE)');
    });
});

// Start HTTP Server
app.listen(5000, () => {
    console.log('Insecure server running on http://localhost:5000');
});
