const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT,
        email TEXT UNIQUE,
        password TEXT,
        phone TEXT
    )`);

    // Create diagnoses table
    db.run(`CREATE TABLE IF NOT EXISTS diagnoses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        diagnosis TEXT,
        confidence REAL,
        date TEXT,
        FOREIGN KEY(userId) REFERENCES users(id)
    )`);
});

module.exports = db;
