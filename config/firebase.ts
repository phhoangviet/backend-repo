import { FirebaseApp, initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";

import firebaseConfig from "./firebaseConfig";
import { Firestore, getFirestore } from "firebase/firestore";
class FirebaseSDK {
  private static _instance: FirebaseSDK;
  public app: FirebaseApp;
  public firestore: Firestore;
  private constructor() {
    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.app);
    console.log(
      "[Firebase] Connected Firebase Project: " +
        this.firestore.app.options.projectId
    );
  }

  public static getInstance(): FirebaseSDK {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new FirebaseSDK();
    return this._instance;
  }
}
export default FirebaseSDK;
