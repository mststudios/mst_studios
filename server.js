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

// Serve frontend (web-build) ONLY in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "web-build")));
} else {
  // In development (or when not production), show a simple message at root
  app.get("/", (req, res) => {
    res.send("Backend API is running. Configure NODE_ENV=production to serve static frontend files.");
  });
}

// ------------------------------
// PostgreSQL Connection
// ------------------------------
let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // nødvendigt for Render
  });
  console.log("✅ Connected to PostgreSQL");
} else if (process.env.DB_HOST) {
  // Lokalt fallback, hvis du bruger DB_* vars
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  console.log("✅ Connected to local PostgreSQL via DB_* vars");
} else {
  console.warn("⚠️ No DB credentials found. Backend running in mock mode.");
  pool = {
    // PG Pool.query(...) interface
    query: async (text, params) => {
      console.log("Mock DB query:", text);
      // Return shape { rows: [], rowCount: 0 }
      // For INSERT RETURNING id, we simulate a row with id: 0
      if (text && text.includes("RETURNING id")) {
        return { rows: [{ id: 0 }], rowCount: 1 };
      }
      return { rows: [], rowCount: 0 };
    },
    // PG Pool.connect() interface
    connect: async () => ({
      query: async (text, params) => {
        console.log("Mock DB client query:", text);
        return { rows: [], rowCount: 0 };
      },
      release: () => { }
    })
  };
}

// ------------------------------
// Initialize DB Tables
// ------------------------------
const initDB = async () => {
  try {
    const connection = await pool.connect?.() || { query: async () => { }, release: () => { } };

    // Price Calculator Submissions
    await connection.query(`
      CREATE TABLE IF NOT EXISTS price_calculator_submissions (
        id SERIAL PRIMARY KEY,
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
        id SERIAL PRIMARY KEY,
        status VARCHAR(50) NOT NULL,
        userAgent TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Database initialized successfully.");
    connection.release?.();
  } catch (err) {
    console.error("❌ Error initializing DB:", err);
  }
};

initDB();

// ------------------------------
// API Endpoints
// ------------------------------

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "active", message: "MST Studios API is running" });
});

// POST /api/contact
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  // Console log as requested (store/email logic would go here)
  console.log("📩 New Contact Submission:");
  console.log("Name:", name || "Not provided");
  console.log("Email:", email);
  console.log("Message:", message);

  // Respond with success
  res.status(200).json({ success: true, message: "Message received" });
});

// POST /submit
app.post("/submit", async (req, res) => {
  try {
    const { email, message, selections, totalPrice, monthlyPrice, priceEstimate } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const queryResult = await pool.query?.(
      `INSERT INTO price_calculator_submissions (email, message, selections, totalPrice, monthlyPrice, priceEstimate) 
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
      [email, message || "", JSON.stringify(selections || {}), totalPrice || 0, monthlyPrice || 0, priceEstimate || ""]
    ) || { rows: [{ id: 0 }] };

    const newId = queryResult.rows?.[0]?.id || 0;

    res.status(201).json({ success: true, message: "Submission saved", id: newId });
  } catch (err) {
    console.error("❌ Error in /submit:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /cookie-consent
app.post("/cookie-consent", async (req, res) => {
  try {
    const { status, userAgent } = req.body;
    console.log(`🍪 Cookie consent received: ${status}`);

    if (!status) return res.status(400).json({ error: "Status is required" });

    // Use query result object pattern (PostgreSQL standard)
    const queryResult = await pool.query?.(
      `INSERT INTO cookie_consent (status, userAgent) VALUES ($1, $2) RETURNING id`,
      [status, userAgent || "unknown"]
    ) || { rows: [{ id: 0 }] };

    console.log(`✅ Cookie consent saved. ID: ${queryResult.rows?.[0]?.id || 'unknown'}`);

    res.status(201).json({ success: true, message: "Consent recorded" });
  } catch (err) {
    console.error("❌ Error in /cookie-consent:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Catch-all for SPA frontend routes (only in production)
if (process.env.NODE_ENV === "production") {
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "web-build", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Production server running on port ${PORT}`);
});
