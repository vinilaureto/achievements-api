import jwt from "jsonwebtoken";
import { globalConfiguration } from "../config";

interface tokenData {
  userId: string;
}

export function createToken(data: tokenData) {
  const token = jwt.sign(data, globalConfiguration.JWT_SALT_KEY, {expiresIn: "7d"});
  return token;
}

export function verifyToken(token: string) {
  try {
    const data = jwt.verify(token, globalConfiguration.JWT_SALT_KEY);
    return data;
  } catch (error) {
    console.log(`[VERIFY TOKEN] - ${error}`)
  }
}
