import { Schema, model } from "mongoose";
import { List } from "../../types/List";

const listSchema = new Schema<List>({
  id: String,
  achievements: [],
  owner: String,
  participants: [],
  progress: Number,
  type: String
});

const listModel = model<List>("List", listSchema);
export { listModel };
