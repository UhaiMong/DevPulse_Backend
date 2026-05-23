import cors from "cors";
import express, { type Application } from "express";
import { userRoute } from "./modules/user/user.route";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issue/issue.route";

const app: Application = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:3000",
  "https://devpulse-backend-gamma.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: `Server health is ok!`,
    author: "Uhaimong/Next Level Developer",
  });
});

// All route

app.use("/api/auth", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/issues", issueRoute);

export default app;
