import app from "./app";
import { iniDb } from "./config/db/db";
import { envConfig } from "./config/env";

const PORT = envConfig.port;

(async () => {
  await iniDb();
  app.listen(PORT, () => {
    console.log(`Server is live now on: ${PORT}`);
  });
})();
