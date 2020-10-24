import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());

app.use("/api", require("./routes"));
app.use("/", (req, res) => {
    return res.send("OK");
});

export default app;