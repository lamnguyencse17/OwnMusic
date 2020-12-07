import mongoose from "mongoose";

const Musics = mongoose.Schema;

export const musicSchema = new Musics({
  name: { type: String, required: true },
  description: {type: String, required: true},
  coverURL: {type: String, required: true},
  demoURL: {type: String, required: true},
  downloadURL: {type: String, required: true},
  price: {type: Number, required: true},
  artist: {type: mongoose.Schema.Types.ObjectId, required: true}
});

const musicModel = mongoose.model("Musics", musicSchema);
export default musicModel;
