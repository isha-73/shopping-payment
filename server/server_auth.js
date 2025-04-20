// server_auth.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();
const dbPassword = process.env.DATABASE_PASSWORD;

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPassword,
    database: 'paymentdb'
});

// Login API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.execute(query, [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (results.length > 0) {
            // Success
            res.json({ success: true, userId: results[0].id, username: results[0].username });
        } else {
            // Invalid credentials
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

app.listen(5002, () => {
    console.log('Auth server running on http://localhost:5002');
});
