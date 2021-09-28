import { Request, Response, NextFunction } from "express";
import { dbConnect } from "../database/databaseConnection";
import { userModel } from "../database/models/userModel";
import { createToken, verifyToken } from "../utils/auth";
import { checkEncryptedData } from "../utils/encrypt";

export async function authenticate(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    dbConnect();
    const user = await userModel.findOne({ email });
    if (await checkEncryptedData(password, user.password)) {
      const token = createToken({ userId: user.id });
      response.status(200).json({ success: true, token, userId: user.id });
    } else {
      response.status(500).json({ success: false });
    }
  } catch (error) {
    console.log(`[USER AUTHENTICATE] - ${error}`);
    response.status(500).json({ success: false });
  }
}

export async function validateAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;
  
  try {
    const tokenData = verifyToken(authorization);
    if (tokenData) next();
    else throw new Error();
  } catch (error) {
    response.status(500).json({ success: false, message: "Authenticate fail" });
  }
}
