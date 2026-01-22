import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

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
app.use(express.static(path.join(__dirname, "web-build")));

// ------------------------------
// PostgreSQL Connection
// ------------------------------
let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  console.log("✅ Connected to PostgreSQL");
} else {
  console.warn("⚠️ No DATABASE_URL found. Backend running in mock mode.");
  pool = {
    query: async () => {
      console.log("Mock DB query");
      return { rows: [{ id: 0 }] };
    }
  };
}

// ----------------------------------------------------
// Initialize DB Tables (PostgreSQL)
// ----------------------------------------------------
const initDB = async () => {
  try {
    // Price Calculator Submissions
    await pool.query(`
      CREATE TABLE IF NOT EXISTS price_calculator_submissions (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        message TEXT,
        selections JSONB,
        total_price INT DEFAULT 0,
        monthly_price INT DEFAULT 0,
        price_estimate TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Cookie Consent
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cookie_consent (
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Database initialized successfully.");
  } catch (err) {
    console.error("❌ Error initializing PostgreSQL DB:", err);
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
