import "dotenv/config";

if (!process.env.NEODB_URI) {
  throw new Error("Database URL environment variable missing!!");
}

export const envConfig = {
  neondb_uri: process.env.NEODB_URI as string,
  port: process.env.PORT || 3000,
};
