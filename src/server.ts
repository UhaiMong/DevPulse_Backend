import app from "./app";
import { initDb } from "./config/db/db";

(async () => {
  await initDb();
})();

export default app;
