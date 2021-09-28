import { Request, Response } from "express";
import { userModel } from "../database/models/userModel";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types/User";
import { dbConnect } from "../database/databaseConnection";
import { encryptData } from "../utils/encrypt";

export async function createUser(request: Request, response: Response) {
  const { fullName, email, password } = request.body;

  try {
    dbConnect();
    const newUser: User = {
      fullName,
      email,
      password: await encryptData(password),
      delete: false,
      id: uuidv4(),
    };
    await userModel.create(newUser);
    response.status(200).json({ success: true });
  } catch (error) {
    console.log(`[CREATE USER] - ${error}`);
    response.status(500).json({ success: false });
  }
}

export async function findUserById(request: Request, response: Response) {
  const { id } = request.params;

  try {
    dbConnect();
    const user = await userModel.findOne({ id });
    response.status(200).json({ success: true, user });
  } catch (error) {
    console.log(`[FIND USER] - ${error}`);
    response.status(500).json({ success: false });
  }
}

export async function findAllUsers(request: Request, response: Response) {
    try {
      dbConnect();
      const users = await userModel.find({});
      response.status(200).json({ success: true, users });
    } catch (error) {
      console.log(`[FIND ALL USERS] - ${error}`);
      response.status(500).json({ success: false });
    }
}

export async function updateUser(request: Request, response: Response) {
  // implements
}

export async function deleteUser(request: Request, response: Response) {
  // implements
}
