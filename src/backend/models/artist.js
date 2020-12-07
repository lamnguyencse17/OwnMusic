import mongoose from "mongoose";

const Artists = mongoose.Schema;

export const artistSchema = new Artists({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  cover: {type: String, require: true},
  musics: [{type: mongoose.Schema.ObjectID, ref: "Musics"}]
});

const artistModel = mongoose.model("Artists", artistSchema);
export default artistModel;
