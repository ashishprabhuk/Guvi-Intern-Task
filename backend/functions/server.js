import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";
import userRoutes from "../routes/userRoutes.js";
import Serverless from "serverless-http";

const router = express.Router();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));


// app.use('/netlify/functions/api', router);
// module.exports.handler = Serverless(app);