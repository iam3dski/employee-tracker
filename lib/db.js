const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'employees_db',
  connectionLimit: 10,
});

// Execute a query using the connection pool
const query = async (sql, values) => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query(sql, values);
    return results;
  } finally {
    connection.release();
  }
};

module.exports = {
  query,
};