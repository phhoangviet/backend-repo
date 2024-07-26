import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { secretKey } from "../config/env";
import FirebaseSDK from "../config/firebase";
import { User } from "../entities/user.entity";
import { TokenData, DataStoredInToken } from "../entities/user.interface";
import { sign } from "jsonwebtoken";

export const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token};Path=/;Secure=true;HttpOnly=true; Max-Age=${tokenData.expiresIn};SameSite=none`;
};

export const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    username: user.username,
  };

  const expiresIn: number = 24 * 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, secretKey, { expiresIn }),
  };
};

export const handleCreateUser = async (username: string, password: string) => {
  const fbIns = FirebaseSDK.getInstance();

  const docRef = await addDoc(collection(fbIns.firestore, "USERS"), {
    username,
    password,
  });
  console.log(docRef.id);
  console.log(docRef);
};

export const handleFindUser = async (
  username: string
): Promise<{
  existed: boolean;
  data?: { username: string; password: string };
}> => {
  const fbIns = FirebaseSDK.getInstance();
  const qSnapshot = query(
    collection(fbIns.firestore, "USERS"),
    where("username", "==", username)
  );
  const docs = await getDocs(qSnapshot);
  if (docs.empty || docs.docs.length > 1) {
    return { existed: false, data: undefined };
  }

  return {
    existed: true,
    data: docs.docs[0].data() as { username: string; password: string },
  };
};
