import "dotenv/config";

if (!process.env.NEODB_URI) {
  throw new Error("Database URL environment variable missing!!");
}

export const envConfig = {
  neondb_uri: process.env.NEODB_URI as string,
  port: process.env.PORT || 3000,
  jwt_secret_token: process.env.JWT_SECRET_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
};
