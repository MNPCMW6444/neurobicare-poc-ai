import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { NeuralNetwork } from "brain.js";
import DATA from "./models/dataModel";
import ANN from "./models/annModel";

const app = express();
const port = process.env.PORT || 6555;

dotenv.config();

let mainDbStatus = false;

const connectToDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    "" + process.env.SAFE,
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

app.use(
  cors({
    origin: ["http://localhost:5665", "https://poc.neurobicare.com"],
    credentials: true,
  })
);

app.get("/areyoualive", (_, res) => res.json({ answer: "yes" }));

app.post("/train", async (req, res) => {
  try {
    const { input, output, name } = req.body;

    const datatokeep = new DATA({
      data: JSON.stringify({ input, output }),
      name,
    });

    await datatokeep.save();

    const lastAnn = await ANN.findOne().sort({ createdAt: -1 }).exec();

    if (!lastAnn) {
      const net = new NeuralNetwork({
        inputSize: 32,
        outputSize: 1,
        hiddenLayers: [10, 10],
      });

      let o: any = {};

      o[output as keyof any] = 1;

      net.train([
        {
          input: {
            feature00: input.original.data[0],
            feature01: input.original.data[1],
            feature02: input.original.data[2],
            feature03: input.original.data[3],
            feature04: input.proccesed.THETA[0],
            feature05: input.proccesed.THETA[1],
            feature06: input.proccesed.THETA[2],
            feature07: input.proccesed.THETA[3],
            feature08: input.proccesed.ALPHA_LOW[0],
            feature09: input.proccesed.ALPHA_LOW[1],
            feature10: input.proccesed.ALPHA_LOW[2],
            feature11: input.proccesed.ALPHA_LOW[3],
            feature12: input.proccesed.ALPHA_HIGH[0],
            feature13: input.proccesed.ALPHA_HIGH[1],
            feature14: input.proccesed.ALPHA_HIGH[2],
            feature15: input.proccesed.ALPHA_HIGH[3],
            feature16: input.proccesed.BETA_LOW[0],
            feature17: input.proccesed.BETA_LOW[1],
            feature18: input.proccesed.BETA_LOW[2],
            feature19: input.proccesed.BETA_LOW[3],
            feature20: input.proccesed.BETA_MID[0],
            feature21: input.proccesed.BETA_MID[1],
            feature22: input.proccesed.BETA_MID[2],
            feature23: input.proccesed.BETA_MID[3],
            feature24: input.proccesed.BETA_HIGH[0],
            feature25: input.proccesed.BETA_HIGH[1],
            feature26: input.proccesed.BETA_HIGH[2],
            feature27: input.proccesed.BETA_HIGH[3],
            feature28: input.proccesed.GAMMA[0],
            feature29: input.proccesed.GAMMA[1],
            feature30: input.proccesed.GAMMA[2],
            feature31: input.proccesed.GAMMA[3],
          },
          output: { focused: o, distracted: 100 - 0 },
        },
      ]);

      const ann = new ANN({
        network: net.toJSON(),
      });

      await ann.save();
      return res.json({ answer: "ANN trained and saved!" });
    }

    const net = new NeuralNetwork().fromJSON((lastAnn as any).network);

    let o: any = {};

    o[output as keyof any] = 1;

    net.train([
      {
        input: {
          feature00: input.original.data[0],
          feature01: input.original.data[1],
          feature02: input.original.data[2],
          feature03: input.original.data[3],
          feature04: input.proccesed.THETA[0],
          feature05: input.proccesed.THETA[1],
          feature06: input.proccesed.THETA[2],
          feature07: input.proccesed.THETA[3],
          feature08: input.proccesed.ALPHA_LOW[0],
          feature09: input.proccesed.ALPHA_LOW[1],
          feature10: input.proccesed.ALPHA_LOW[2],
          feature11: input.proccesed.ALPHA_LOW[3],
          feature12: input.proccesed.ALPHA_HIGH[0],
          feature13: input.proccesed.ALPHA_HIGH[1],
          feature14: input.proccesed.ALPHA_HIGH[2],
          feature15: input.proccesed.ALPHA_HIGH[3],
          feature16: input.proccesed.BETA_LOW[0],
          feature17: input.proccesed.BETA_LOW[1],
          feature18: input.proccesed.BETA_LOW[2],
          feature19: input.proccesed.BETA_LOW[3],
          feature20: input.proccesed.BETA_MID[0],
          feature21: input.proccesed.BETA_MID[1],
          feature22: input.proccesed.BETA_MID[2],
          feature23: input.proccesed.BETA_MID[3],
          feature24: input.proccesed.BETA_HIGH[0],
          feature25: input.proccesed.BETA_HIGH[1],
          feature26: input.proccesed.BETA_HIGH[2],
          feature27: input.proccesed.BETA_HIGH[3],
          feature28: input.proccesed.GAMMA[0],
          feature29: input.proccesed.GAMMA[1],
          feature30: input.proccesed.GAMMA[2],
          feature31: input.proccesed.GAMMA[3],
        },
        output: { focused: o, distracted: 100 - 0 },
      },
    ]);

    (lastAnn as any).network = net.toJSON();
    await lastAnn.save();

    return res.json({ answer: "ANN updated!" });
  } catch (e) {
    console.log(e);
    return res.json({ error: JSON.stringify(e) });
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

    const output = net.run({
      feature00: input.original.data[0],
      feature01: input.original.data[1],
      feature02: input.original.data[2],
      feature03: input.original.data[3],
      feature04: input.proccesed.THETA[0],
      feature05: input.proccesed.THETA[1],
      feature06: input.proccesed.THETA[2],
      feature07: input.proccesed.THETA[3],
      feature08: input.proccesed.ALPHA_LOW[0],
      feature09: input.proccesed.ALPHA_LOW[1],
      feature10: input.proccesed.ALPHA_LOW[2],
      feature11: input.proccesed.ALPHA_LOW[3],
      feature12: input.proccesed.ALPHA_HIGH[0],
      feature13: input.proccesed.ALPHA_HIGH[1],
      feature14: input.proccesed.ALPHA_HIGH[2],
      feature15: input.proccesed.ALPHA_HIGH[3],
      feature16: input.proccesed.BETA_LOW[0],
      feature17: input.proccesed.BETA_LOW[1],
      feature18: input.proccesed.BETA_LOW[2],
      feature19: input.proccesed.BETA_LOW[3],
      feature20: input.proccesed.BETA_MID[0],
      feature21: input.proccesed.BETA_MID[1],
      feature22: input.proccesed.BETA_MID[2],
      feature23: input.proccesed.BETA_MID[3],
      feature24: input.proccesed.BETA_HIGH[0],
      feature25: input.proccesed.BETA_HIGH[1],
      feature26: input.proccesed.BETA_HIGH[2],
      feature27: input.proccesed.BETA_HIGH[3],
      feature28: input.proccesed.GAMMA[0],
      feature29: input.proccesed.GAMMA[1],
      feature30: input.proccesed.GAMMA[2],
      feature31: input.proccesed.GAMMA[3],
    });

    return res.json({ answer: output });
  } catch (e) {
    console.log(e);
    return res.json({ error: JSON.stringify(e) });
  }
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
