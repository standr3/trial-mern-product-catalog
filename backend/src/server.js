import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());
app.use(rateLimiter);
// app.use((req,res,next) => {
//   console.log("We just got a new request",req.method,req.url);
//   next();
// })
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
