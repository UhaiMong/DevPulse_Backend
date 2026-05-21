import express, { type Application } from "express";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: `Server health is ok!`,
    author: "Uhaimong/Next Level Developer",
  });
});

// All route

app.use("/api/auth", userRoute);

export default app;
