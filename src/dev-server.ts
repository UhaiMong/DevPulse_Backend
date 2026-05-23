import app from "./app";
import { envConfig } from "./config/env";
import { initDb } from "./config/db/db";

const PORT = envConfig.port;

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Server is live now on: ${PORT}`);
  });
})();
