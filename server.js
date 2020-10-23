import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const port = 3000;
const data_uri =
  "mongodb://db:27017/ownmusic?readPreference=primary&appname=Server&ssl=false";
mongoose.connect(data_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const app = express();

app.use(morgan("tiny"));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(compression())

app.use("/api", require("./routes"))

app.listen(port, () => {
    console.log("Running on 3000 port")
})