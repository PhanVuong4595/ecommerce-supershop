import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// import db
import connectDatabase from "./config/database";

// import routes
import errorMiddleware from "./middleware/error.js";
import categoryRouter from "./routes/categoryRoute";
import brandRouter from "./routes/brandRoute";

//components
const app = express();
dotenv.config();

// middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// uploads;
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// connect database
connectDatabase();

//Router
app.get("/", (req, res) => {
  res.send("Backend is Running..");
});
app.use("/api", categoryRouter);
app.use("/api", brandRouter);

app.use(errorMiddleware);

// connection
app.listen(process.env.PORT, () => {
  console.log(`Server is running port: http://localhost:${process.env.PORT}`);
});
