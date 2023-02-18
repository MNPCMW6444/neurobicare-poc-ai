import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import brain from "brain.js";

const app = express();
const port = process.env.PORT || 6555;

dotenv.config();

let mainDbStatus = false;

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

app.use(express.json());

app.use(cors());

app.listen(port, () => console.log(`Server started on port: ${port}`));

app.get("/areyoualive", (_, res) => res.json({ answer: "yes" }));

const annSchema = new mongoose.Schema({
  network: Object,
});

const ANN = mongoose.model("ANN", annSchema);

app.post("/train", async (req, res) => {
  const { input, output } = req.body;

  const net = new brain.NeuralNetwork({
    inputSize: 2,
    outputSize: 1,
  });

  net.train([{ input, output }]);

  const ann = new ANN({
    network: net.toJSON(),
  });

  await ann.save();

  res.status(200).send("ANN trained and saved!");
});
