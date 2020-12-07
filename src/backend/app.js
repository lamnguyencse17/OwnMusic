import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

// require("dotenv").config();

const app = express();
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_SERVER }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static("public"));
app.use("/api", require("./routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd() + "/public/index.html"));
});

export default app;
