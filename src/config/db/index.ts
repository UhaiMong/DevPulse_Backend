import { Pool } from "pg";
import { envConfig } from "../env";

export const pool = new Pool({
  connectionString: envConfig.neondb_uri,
});

pool.on("connect", () => {
  console.log("Database connection established..");
});

pool.on("error", (err) => {
  console.error("Unexpected error database: ", err);
  process.exit(-1);
});
