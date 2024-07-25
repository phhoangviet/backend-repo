const firebaseApiKey: string = process.env?.firebase_apiKey || "";
const firebaseAuthDomain: string = process.env?.firebase_authDomain || "";
const firebaseProjectId: string = process.env?.firebase_projectId || "";
const firebaseStorageBucket: string = process.env?.firebase_storageBucket || "";
const firebaseMessagingSenderId: string =
  process.env?.firebase_messagingSenderId || "";
const firebaseAppId: string = process.env?.firebase_appId || "";
const appPort: number = +(process.env?.port || 8080);
export {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
  appPort,
};
