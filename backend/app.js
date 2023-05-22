import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDatabase from "./config/database";

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// connect database
connectDatabase();

// connection
app.listen(process.env.PORT, () => {
  console.log(`Server is running port: http://localhost:${process.env.PORT}`);
});
