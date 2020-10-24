import mongoose from "mongoose";
import app from "./app";

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});


app.listen(parseInt(process.env.EXPRESS_PORT), () => {
    console.log("Running on 3000 port");
});