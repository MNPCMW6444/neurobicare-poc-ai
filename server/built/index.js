"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const brain_js_1 = require("brain.js");
const app = (0, express_1.default)();
const port = process.env.PORT || 6555;
dotenv_1.default.config();
let mainDbStatus = false;
const connectToDB = () => {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connect("" + process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err)
            return console.error(err);
        console.log("Connected to Main MongoDB");
        mainDbStatus = true;
    });
    if (!mainDbStatus)
        setTimeout(connectToDB, 180000);
};
connectToDB();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/areyoualive", (_, res) => res.json({ answer: "yes" }));
const annSchema = new mongoose_1.default.Schema({
    network: Object,
});
const dataSchema = new mongoose_1.default.Schema({
    data: String,
});
const ANN = mongoose_1.default.model("ANN", annSchema);
const DATA = mongoose_1.default.model("DATA", dataSchema);
app.post("/train", async (req, res) => {
    try {
        const { input, output } = req.body;
        const datatokeep = new DATA({ data: JSON.stringify({ input, output }) });
        await datatokeep.save();
        const lastAnn = await ANN.findOne().sort({ createdAt: -1 }).exec();
        if (!lastAnn) {
            const net = new brain_js_1.NeuralNetwork({
                inputSize: 32,
                outputSize: 1,
            });
            let o = {};
            o[output] = 1;
            net.train([
                {
                    input: [
                        input.original.data[0],
                        input.original.data[1],
                        input.original.data[2],
                        input.original.data[3],
                        input.proccesed.THETA[0],
                        input.proccesed.THETA[1],
                        input.proccesed.THETA[2],
                        input.proccesed.THETA[3],
                        input.proccesed.ALPHA_LOW[0],
                        input.proccesed.ALPHA_LOW[1],
                        input.proccesed.ALPHA_LOW[2],
                        input.proccesed.ALPHA_LOW[3],
                        input.proccesed.ALPHA_HIGH[0],
                        input.proccesed.ALPHA_HIGH[1],
                        input.proccesed.ALPHA_HIGH[2],
                        input.proccesed.ALPHA_HIGH[3],
                        input.proccesed.BETA_LOW[0],
                        input.proccesed.BETA_LOW[1],
                        input.proccesed.BETA_LOW[2],
                        input.proccesed.BETA_LOW[3],
                        input.proccesed.BETA_MID[0],
                        input.proccesed.BETA_MID[1],
                        input.proccesed.BETA_MID[2],
                        input.proccesed.BETA_MID[3],
                        input.proccesed.BETA_HIGH[0],
                        input.proccesed.BETA_HIGH[1],
                        input.proccesed.BETA_HIGH[2],
                        input.proccesed.BETA_HIGH[3],
                        input.proccesed.GAMMA[0],
                        input.proccesed.GAMMA[1],
                        input.proccesed.GAMMA[2],
                        input.proccesed.GAMMA[3],
                    ],
                    output: o,
                },
            ]);
            const ann = new ANN({
                network: net.toJSON(),
            });
            await ann.save();
            return res.json({ answer: "ANN trained and saved!" });
        }
        const net = new brain_js_1.NeuralNetwork().fromJSON(lastAnn.network);
        let o = {};
        o[output] = 1;
        net.train([
            {
                input: [
                    input.original.data[0],
                    input.original.data[1],
                    input.original.data[2],
                    input.original.data[3],
                    input.proccesed.THETA[0],
                    input.proccesed.THETA[1],
                    input.proccesed.THETA[2],
                    input.proccesed.THETA[3],
                    input.proccesed.ALPHA_LOW[0],
                    input.proccesed.ALPHA_LOW[1],
                    input.proccesed.ALPHA_LOW[2],
                    input.proccesed.ALPHA_LOW[3],
                    input.proccesed.ALPHA_HIGH[0],
                    input.proccesed.ALPHA_HIGH[1],
                    input.proccesed.ALPHA_HIGH[2],
                    input.proccesed.ALPHA_HIGH[3],
                    input.proccesed.BETA_LOW[0],
                    input.proccesed.BETA_LOW[1],
                    input.proccesed.BETA_LOW[2],
                    input.proccesed.BETA_LOW[3],
                    input.proccesed.BETA_MID[0],
                    input.proccesed.BETA_MID[1],
                    input.proccesed.BETA_MID[2],
                    input.proccesed.BETA_MID[3],
                    input.proccesed.BETA_HIGH[0],
                    input.proccesed.BETA_HIGH[1],
                    input.proccesed.BETA_HIGH[2],
                    input.proccesed.BETA_HIGH[3],
                    input.proccesed.GAMMA[0],
                    input.proccesed.GAMMA[1],
                    input.proccesed.GAMMA[2],
                    input.proccesed.GAMMA[3],
                ],
                output: o,
            },
        ]);
        lastAnn.network = net.toJSON();
        await lastAnn.save();
        return res.json({ answer: "ANN updated!" });
    }
    catch (e) {
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
        const net = new brain_js_1.NeuralNetwork().fromJSON(lastAnn.network);
        const output = net.run(input);
        return res.json({ answer: output });
    }
    catch (e) {
        console.log(e);
        return res.json({ error: e });
    }
});
app.listen(port, () => console.log(`Server started on port: ${port}`));
