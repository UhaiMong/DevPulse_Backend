import app from "./app";
import { envConfig } from "./config/env";

const PORT = envConfig.port;

app.listen(PORT, () => {
  console.log(`Server is live now on: ${PORT}`);
});
