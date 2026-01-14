import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import express from "express";
import { connectDb } from "./config/db";
import session from "express-session";
import passport from "./config/passport";
import cors from "cors";

//routes imports
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const port = 5000;

app.get("/", (req, res) => {
  res.send("app is running successfully");
});

//routes
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);

//database connection
connectDb();

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
