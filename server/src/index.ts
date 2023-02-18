import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { NeuralNetwork } from "brain.js";

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

app.get("/areyoualive", (_, res) => res.json({ answer: "yes" }));

const annSchema = new mongoose.Schema({
  network: Object,
});

const dataSchema = new mongoose.Schema({
  data: String,
});

const ANN = mongoose.model("ANN", annSchema);
const DATA = mongoose.model("DATA", dataSchema);
app.post("/train", async (req, res) => {
  try {
    const { input, output } = req.body;

    const datatokeep = new DATA({ data: JSON.stringify({ input, output }) });

    await datatokeep.save();

    const lastAnn = await ANN.findOne().sort({ createdAt: -1 }).exec();

    if (!lastAnn) {
      const net = new NeuralNetwork({
        inputSize: 32,
        outputSize: 1,
      });

      net.train([
        {
          input: [
            input.original.data[0],
            input.original.data[1],
            input.original.data[2],
            input.original.data[3],
            input.procesed.THETA[0],
            input.procesed.THETA[1],
            input.procesed.THETA[2],
            input.procesed.THETA[3],
            input.procesed.ALPHA_LOW[0],
            input.procesed.ALPHA_LOW[1],
            input.procesed.ALPHA_LOW[2],
            input.procesed.ALPHA_LOW[3],
            input.procesed.ALPHA_HIGH[0],
            input.procesed.ALPHA_HIGH[1],
            input.procesed.ALPHA_HIGH[2],
            input.procesed.ALPHA_HIGH[3],
            input.procesed.BETA_LOW[0],
            input.procesed.BETA_LOW[1],
            input.procesed.BETA_LOW[2],
            input.procesed.BETA_LOW[3],
            input.procesed.BETA_MID[0],
            input.procesed.BETA_MID[1],
            input.procesed.BETA_MID[2],
            input.procesed.BETA_MID[3],
            input.procesed.BETA_HIGH[0],
            input.procesed.BETA_HIGH[1],
            input.procesed.BETA_HIGH[2],
            input.procesed.BETA_HIGH[3],
            input.procesed.GAMMA[0],
            input.procesed.GAMMA[1],
            input.procesed.GAMMA[2],
            input.procesed.GAMMA[3],
          ],
          output,
        },
      ]);

      const ann = new ANN({
        network: net.toJSON(),
      });

      await ann.save();
      return res.json({ answer: "ANN trained and saved!" });
    }

    const net = new NeuralNetwork().fromJSON((lastAnn as any).network);

    net.train([{ input, output }]);

    (lastAnn as any).network = net.toJSON();
    await lastAnn.save();

    return res.json({ answer: "ANN updated!" });
  } catch (e) {
    console.log(e);
    return res.json({ error: e });
  }
});

app.post("/read", async (req, res) => {
  try {
    const { input } = req.body;

    const lastAnn = await ANN.findOne().sort({ createdAt: -1 }).exec();

    if (!lastAnn) {
      return res.json({ error: "no network" });
    }

    const net = new NeuralNetwork().fromJSON((lastAnn as any).network);

    const output = net.run(input);

    return res.json({ answer: output });
  } catch (e) {
    console.log(e);
    return res.json({ error: e });
  }
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
