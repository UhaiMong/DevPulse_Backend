import { pool } from ".";

export const iniDb = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        email VARCHAR(30),
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'contributor',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`;
  try {
    await pool.query(sql);
    console.log("User table created");
  } catch (error) {
    console.log("Failed to create user table", error);
    process.exit(1);
  }
};
