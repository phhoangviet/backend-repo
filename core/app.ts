import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");

import { appPort } from "../config/env";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.listen(appPort, () => {
  console.log(`[App] Server is running on port ${appPort}`);
});

export default app;
