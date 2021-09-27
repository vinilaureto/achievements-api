import mongoose from "mongoose";
import { globalConfiguration } from "../config";

export function dbConnect() {
  mongoose.connect(globalConfiguration.DATABASE_URL_CONNECTION);
}

export function dbDisconnect() {
  mongoose.disconnect();
}
