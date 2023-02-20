import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
  data: String,
  uname: String,
});
export default mongoose.model("DATA", dataSchema);
