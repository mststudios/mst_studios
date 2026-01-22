import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ------------------------------
// Serve frontend (web-build)
// ------------------------------
app.use(express.static(path.join(__dirname, 'web-build')));

// Database Connection Pool
let pool;
if (process.env.DB_HOST) {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
} else {
    console.warn("⚠️ No DB credentials found. Backend will run in mock mode.");
    pool = {
        execute: async () => { console.log("Mock DB execute"); return [{ insertId: 0 }]; },
        getConnection: async () => ({
            query: async () => { console.log("Mock DB query"); },
            release: () => { }
        })
    };
}

// ----------------------------------------------------
// Initialize DB Tables
// ----------------------------------------------------
const initDB = async () => {
    try {
        const connection = await pool.getConnection();

        // Price Calculator Submissions
        await connection.query(`
            CREATE TABLE IF NOT EXISTS price_calculator_submissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                message TEXT,
                selections JSON,
                totalPrice INT DEFAULT 0,
                monthlyPrice INT DEFAULT 0,
                priceEstimate TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Cookie Consent
        await connection.query(`
            CREATE TABLE IF NOT EXISTS cookie_consent (
                id INT AUTO_INCREMENT PRIMARY KEY,
                status ENUM('necessary', 'marketing', 'statistics', 'accepted', 'rejected', 'custom') NOT NULL,
                userAgent TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("✅ Database initialized successfully.");
        connection.release();
    } catch (err) {
        console.error("❌ Error initializing MySQL DB:", err);
    }
};

initDB();

// ----------------------------------------------------
// ROUTES
// ----------------------------------------------------

// API Health Check (Moved from / to /api/health to avoid conflict with static files)
app.get('/api/health', (req, res) => {
    res.json({ status: 'active', message: 'MST Studios API is running' });
});

// POST /submit - Price Calculator Submission
app.post('/submit', async (req, res) => {
    try {
        const { email, message, selections, totalPrice, monthlyPrice, priceEstimate } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const [result] = await pool.execute(
            `INSERT INTO price_calculator_submissions 
                (email, message, selections, totalPrice, monthlyPrice, priceEstimate)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                email,
                message || '',
                JSON.stringify(selections || {}),
                totalPrice || 0,
                monthlyPrice || 0,
                priceEstimate || ''
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Submission saved',
            id: result.insertId
        });
    } catch (error) {
        console.error('❌ Error in /submit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /cookie-consent
app.post('/cookie-consent', async (req, res) => {
    try {
        const { status, userAgent } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        await pool.execute(
            `INSERT INTO cookie_consent (status, userAgent) VALUES (?, ?)`,
            [status, userAgent || 'unknown']
        );

        res.status(201).json({ success: true, message: 'Consent recorded' });
    } catch (error) {
        console.error('❌ Error in /cookie-consent:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Catch-all for frontend routes (SPA Support)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Production server running on port ${PORT}`);
});
