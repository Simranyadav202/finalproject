const pool = require('./db');

(async () => {
  try {
    console.log("Attempting to connect to the database...");
    const res = await pool.query('SELECT NOW()');
    console.log("Connected! Current time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    await pool.end(); // Close the pool connection when done
  }
})();
