import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// import db
import connectDatabase from "./config/database";

// import routes
import errorMiddleware from "./middleware/error.js";
import categoryRouter from "./routes/categoryRoute";
import brandRouter from "./routes/brandRoute";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import storeRoute from "./routes/storeRoute";
import productRoute from "./routes/productRouter";
import reviewRoute from "./routes/reviewRoute";
import orderRoute from "./routes/orderRoute";
import paymentRoute from "./routes/paymentRoute";

//components
const app = express();
dotenv.config();

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

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
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", storeRoute);
app.use("/api", productRoute);
app.use("/api", reviewRoute);
app.use("/api", orderRoute);
app.use("/api", paymentRoute);

app.use(errorMiddleware);

// connection
app.listen(process.env.PORT, () => {
  console.log(`Server is running port: http://localhost:${process.env.PORT}`);
});
