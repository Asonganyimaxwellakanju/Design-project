const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Add Content Security Policy to allow resources to load
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; font-src 'self' data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:;");
    next();
});

app.use(express.static(path.join(__dirname, '.')));

// Redirect root to login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

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

// 404 Catch-all for API
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: `API Route ${req.method} ${req.url} not found` });
});

// General Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
