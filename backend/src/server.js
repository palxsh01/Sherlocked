import express from "express";
import rateLimiter from "./middleware/rateLimiter.js";
import suspectRoutes from "./routes/suspectRoutes.js"
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173" //Frontend origin   
  }));

app.use(express.json());
app.use(rateLimiter);

app.use("/api/suspects/", suspectRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}/api/`);
    })
});