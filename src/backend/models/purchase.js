import mongoose from "mongoose";

const Purchases = mongoose.Schema;

export const purchaseSchema = new Purchases({
  user: {type: mongoose.Schema.ObjectID, required: true},
  artist: {type: mongoose.Schema.ObjectID, required: true},
  musics: {type: mongoose.Schema.ObjectID}
});

const purchaseModel = mongoose.model("Purchases", purchaseSchema);
export default purchaseModel;
