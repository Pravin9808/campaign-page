import mysql from "mysql2/promise";

// Setup MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "user",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "mydb",
});

// Handle POST requests (form submissions)
export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ message: "Name & email required" }), { status: 400 });
    }

    await pool.execute(
      "INSERT INTO Contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    return new Response(JSON.stringify({ message: "Saved successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Database error:", err);
    return new Response(JSON.stringify({ message: "Database error" }), { status: 500 });
  }
}
