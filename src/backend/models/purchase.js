import mongoose from "mongoose";

const Purchases = mongoose.Schema;

export const purchaseSchema = new Purchases({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Artists",
  },
  musics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Musics" }],
  isCompleted: { type: Boolean, required: true },
  isPending: { type: Boolean, required: true },
  price: { type: Number, require: true },
});

const purchaseModel = mongoose.model("Purchases", purchaseSchema);
export default purchaseModel;
