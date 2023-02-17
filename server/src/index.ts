import sslRedirect from "heroku-ssl-redirect";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

import Data from "./models/dataModel";

const app = express();
const port = process.env.PORT || 6555;

dotenv.config();

let mainDbStatus = false;

let logReq: any;

const connectToDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    "" + process.env.MONGO,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
    (err) => {
      if (err) return console.error(err);
      console.log("Connected to Main MongoDB");
      mainDbStatus = true;
    }
  );

  if (!mainDbStatus) setTimeout(connectToDB, 180000);
};

connectToDB();

app.use(sslRedirect());
app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development" ? ["http://localhost:5665"] : [],
    credentials: true,
  })
);

app.listen(port, () => console.log(`Server started on port: ${port}`));

app.get("/areyoualive", (_, res) => res.json({ answer: "yes" }));
