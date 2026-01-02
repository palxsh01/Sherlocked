import express from "express";
import rateLimiter from "./middleware/rateLimiter.js";
import sherlockedRoutes from "./routes/sherlockedRoutes.js"
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(rateLimiter);

app.use("/sherlocked/", sherlockedRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}/sherlocked/`);
    })
});