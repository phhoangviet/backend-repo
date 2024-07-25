import { FirebaseApp, initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";

import firebaseConfig from "./firebaseConfig";
class FirebaseSDK {
  private static _instance: FirebaseSDK;
  public app: FirebaseApp;
  private constructor() {
    this.app = initializeApp(firebaseConfig);
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
