/* eslint-disable @typescript-eslint/no-explicit-any */
import pkg from "crypto-js";
import { logger } from "../utils/logger";
const { AES, enc } = pkg;

// Use Vite's environment variable syntax for the encryption key
const $key = import.meta.env.VITE_ENCRYPT_KEY;

if (!$key) {
  throw new Error("Encryption key is not defined");
}

export const encrypt = (data: any) => {
  return AES.encrypt(data, $key).toString();
};

export const decrypt = (data: any) => {
  try {
    if (data) {
      const bytes = AES.decrypt(data, $key);
      const decryptedText = bytes.toString(enc.Utf8);
      return JSON.parse(decryptedText);
    }
  } catch (error) {
    logger("Decryption error:", error);
  }
  return null;
};
