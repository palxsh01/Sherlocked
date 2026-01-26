import express from "express";
import rateLimiter from "./middleware/rateLimiter.js";
import suspectRoutes from "./routes/suspectRoutes.js";
import evidenceRoutes from "./routes/evidenceRoutes.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", //Frontend origin
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/suspects/", suspectRoutes);
app.use("/api/evidence/", evidenceRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*path", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/api/`);
  });
});
