import { Schema, model } from "mongoose";
import { Achievement } from "../../types/Achievement";

const achievementSchema = new Schema<Achievement>({
  id: String,
  concluded: Boolean,
  createAt: String,
  title: String,
  description: String,
  icon: String,
  concludedAt: String
});

const achievemenModel = model<Achievement>("Achievement", achievementSchema);
export { achievemenModel };
