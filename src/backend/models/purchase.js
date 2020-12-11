import mongoose from "mongoose";

const Purchases = mongoose.Schema;

export const purchaseSchema = new Purchases({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, required: true },
  musics: { type: mongoose.Schema.Types.ObjectId },
  isCompleted: { type: Boolean, required: true },
});

const purchaseModel = mongoose.model("Purchases", purchaseSchema);
export default purchaseModel;
