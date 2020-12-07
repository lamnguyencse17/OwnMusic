import mongoose from "mongoose";

const Artists = mongoose.Schema;

export const artistSchema = new Artists({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  coverURL: {type: String, required: true},
  description: {type: String, required: true},
  musics: [{type: mongoose.Schema.Types.ObjectId, ref: "Musics"}]
});

const artistModel = mongoose.model("Artists", artistSchema);
export default artistModel;
