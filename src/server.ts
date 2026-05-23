import app from "./app";
import { initDb } from "./config/db/db";
import { envConfig } from "./config/env";

const PORT = envConfig.port;

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Server is live now on: ${PORT}`);
  });
})();
