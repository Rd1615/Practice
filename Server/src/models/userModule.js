const dbPromise = require('../lib/db');

const userModule = {
  // Create table if not exists
  createTable: async () => {
    const db = await dbPromise;
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Users table ready");
  },

  // Get all users
  getAllUsers: async () => {
    const db = await dbPromise;
    const [rows] = await db.query(`SELECT * FROM users`);
    return rows;
  },

  // Create user
  createUser: async (userData) => {
    const db = await dbPromise;
    const { name, email } = userData; // Destructure values
    const [result] = await db.query(
      `INSERT INTO users (name, email) VALUES (?, ?)`,
      [name, email]
    );
    return result.insertId;
  },

  // Get user by ID
  getUserById: async (id) => {
    const db = await dbPromise;
    const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  },

  // Update user
  updateUser: async (id, userData) => {
    const db = await dbPromise;
    const { name, email } = userData;
    const [result] = await db.query(
      `UPDATE users SET name = ?, email = ? WHERE id = ?`,
      [name, email, id]
    );
    return result.affectedRows;
  },

  // Delete user
  deleteUser: async (id) => {
    const db = await dbPromise;
    const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
    return result.affectedRows;
  },
};

module.exports = userModule;
