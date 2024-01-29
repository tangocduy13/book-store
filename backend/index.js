import express from "express";
import { PORT, MongDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeader: ["Content-Type"],
  }),
);
// app.use(cors());
// Middleware for parsing request body
app.use(express.json());
app.use("/books", booksRoute);
mongoose
  .connect(MongDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on PORT: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
