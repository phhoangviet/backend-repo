import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import app from "../dist/core/app";

export const api = onRequest(app);
