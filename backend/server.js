import express from "express";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import { app, server } from "./socket.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  connectDb();
  console.log(`server is running on localhost:${port}`);
});
