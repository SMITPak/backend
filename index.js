import express from "express";
import cors from "cors";
import router from "./Routes/index.js";
import mongoose from "./DB/index.js";
import serverless from "serverless-http";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/images", express.static("images/"));

app.use(cors());

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Connection error:", error);
});

db.once("open", function () {
  console.log("DB Connected");
});

app.use("/api", router);

export const handler = serverless(app);
export default app;
