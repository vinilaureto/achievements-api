import { Request, Response, NextFunction } from "express";
import { achievemenModel } from "../database/models/achievementsModel";
import { v4 as uuidv4 } from "uuid";
import { Achievement } from "../types/Achievement";
import { dbConnect } from "../database/databaseConnection";

export async function createAchievement(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { title, description, icon } = request.body;

  try {
    dbConnect();
    const newAchievment: Achievement = {
      id: uuidv4(),
      title,
      description,
      icon,
      concluded: false,
      concludedAt: "",
      createAt: "",
    };
    await achievemenModel.create(newAchievment);
    if (newAchievment) {
      response.locals.achievementId = newAchievment.id;
      next();
    }
  } catch (error) {
    console.log(`[CREATE LIST] - ${error}`);
    response.status(500).json({ success: false });
  }
}

export async function getAchievementsFromIds(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { achievementsIds } = response.locals;

  try {
    dbConnect();
    const achievements = await achievemenModel.find({id: achievementsIds })
    response.status(200).json({sucess: true, achievements})

  } catch (error) {
    console.log(`[GET ACHIEVEMENTS FROM IDS] - ${error}`);
    response.status(500).json({ success: false });
  }
}
