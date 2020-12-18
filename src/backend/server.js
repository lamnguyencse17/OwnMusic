import mongoose from "mongoose";
import passport from "passport";
import app from "./app";
import { transactionStatus } from "./services/coinpayment";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

require("./utils/passport")(passport);

app.listen(parseInt(process.env.PORT), async () => {
  setInterval(() => transactionStatus(), 30000);
  console.log("Running on 3000 port");
});
