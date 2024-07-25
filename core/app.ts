import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");

// import FirebaseSDK from "../config/firebase";
import { appPort } from "../config/env";
import { collection, getFirestore } from "firebase/firestore";
import FirebaseSDK from "../config/firebase";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
const firebaseSdk = FirebaseSDK.getInstance();
const db = getFirestore(firebaseSdk.app);
const user = collection(db, "USERS");
console.log(user);

app.listen(appPort, () => {
  console.log(`[App] Server is running on port ${appPort}`);
});

export default app;
