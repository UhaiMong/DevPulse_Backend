import express, { type Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: `Server health is ok!`,
    author: "Uhaimong/Next Level Developer",
  });
});

export default app;
