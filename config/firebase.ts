import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

import firebaseConfig from "./firebaseConfig";

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);
const functions = getFunctions();
console.log(database);
if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  console.log(functions, "func");
}
export { database, firebaseApp, functions };
