import { pool } from ".";

export const initDb = async () => {
  const userTableSQL = `
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
  const issueTableSQL = `
CREATE TABLE IF NOT EXISTS issues(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'open',
    reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

)
`;
  try {
    await pool.query(userTableSQL);
    console.log("User table created");

    await pool.query(issueTableSQL);
    console.log("Issue table created.");
  } catch (error) {
    console.log("Failed to create user table", error);
    process.exit(1);
  }
};
