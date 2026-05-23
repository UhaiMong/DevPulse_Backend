import app from "./app";
import { initDb } from "./config/db/db";
import { envConfig } from "./config/env";

const main = () => {
  initDb();
  app.listen(envConfig.port, () => {
    console.log(`DevPulse app listening on port ${envConfig.port}`);
  });
};

main();
