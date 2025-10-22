const express = require("express");
const { Pool } = require("pg");
const { greet } = require("@your-org/shared-lib");

const app = express();
const port = 4000;

// connects to the "db" service provided by docker-compose in the codespace
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: "appdb"
});


app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: greet("API") });
});

app.get("/api/widgets", async (_req, res) => {
  const { rows } = await pool.query("select id, name, created_at from widgets order by id");
  res.json(rows);
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
