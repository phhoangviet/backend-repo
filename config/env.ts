import dotenv from "dotenv";
dotenv.config();
const firebaseApiKey = process.env?.firebase_apiKey;
const firebaseAuthDomain = process.env?.firebase_authDomain;
const firebaseProjectId = process.env?.firebase_projectId;
const firebaseStorageBucket = process.env?.firebase_storageBucket;
const firebaseMessagingSenderId = process.env?.firebase_messagingSenderId;
const firebaseAppId = process.env?.firebase_appId;
const appPort = process.env?.port;
export {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
  appPort,
};
