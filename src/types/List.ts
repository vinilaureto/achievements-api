import { Achievement } from "./Achievement";
import { User } from "./User";

export type List = {
  id: string;
  achievements: Achievement[];
  progress: number;
  owner: User;
  participants: User[];
  type: string;
  title: string,
  description: string
};
