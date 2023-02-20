import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
    unique: true,
  },
  uname: String,
});
export default mongoose.model("DATA", dataSchema);
