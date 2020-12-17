import mongoose from "mongoose";

const Artists = mongoose.Schema;

export const artistSchema = new Artists({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  coverURL: {
    type: String,
    default:
      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081",
  },
  description: { type: String, default: "New Artist" },
  musics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Musics" }],
});

const artistModel = mongoose.model("Artists", artistSchema);
export default artistModel;
