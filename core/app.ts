import express, { Application } from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");

import FirebaseSDK from "../config/firebase";
import { collection, getFirestore } from "firebase/firestore/lite";
import { appPort } from "../config/env";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const port = 8080;
const firebaseSdk: FirebaseSDK = FirebaseSDK.getInstance();
console.log(
  `[Firebase] Connect to firebase project ${firebaseSdk.app.options.projectId}`
);

// const db = getFirestore(firebaseSdk.app);
// const user = collection(db, "USERS");
// console.log(user);

app.listen(appPort, () => {
  console.log(`[App] Server is running on port ${appPort}`);
});

export default app;
