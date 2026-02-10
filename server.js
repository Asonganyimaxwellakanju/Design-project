const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer(storage).single('image');

// Register Endpoint
app.post('/api/register', (req, res) => {
    const { fullName, email, password } = req.body;
    db.run(`INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`,
        [fullName, email, password],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: "User registered successfully" });
        }
    );
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.json({ message: "Login successful", user: row });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

// Prediction Endpoint (Mock CNN)
app.post('/api/predict', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // TODO: CONNECT CNN API HERE
        // Example: logic to call a python script or a remote CNN API
        // const result = await callCnnModel(req.file.path);

        const diagnosis = {
            condition: "Atopic Dermatitis (Eczema)",
            confidence: 0.95,
            description: "Commonly known as eczema, this is a condition that makes your skin red and itchy. It's common in children but can occur at any age.",
            prevention: [
                "Use fragrance-free moisturizers immediately after bathing.",
                "Avoid known triggers (stress, harsh soaps).",
                "Keep fingernails short to prevent scratching damage."
            ]
        };

        // Save diagnosis to history if user ID is provided (optional context)
        // const userId = req.body.userId; 
        // if (userId) { db.run(...) }

        res.json(diagnosis);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
