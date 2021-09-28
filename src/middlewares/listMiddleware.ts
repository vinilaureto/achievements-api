import { NextFunction, Request, Response } from "express";
import { listModel } from "../database/models/listModel";
import { v4 as uuidv4 } from "uuid";
import { List } from "../types/List";
import { dbConnect } from "../database/databaseConnection";

export async function createList(request: Request, response: Response) {
  const { title, description, owner, type } = request.body;

  try {
    dbConnect();
    const newList: List = {
      id: uuidv4(),
      achievements: [],
      owner,
      title,
      description,
      type,
      participants: [],
      progress: 0,
    };
    await listModel.create(newList);
    response.status(200).json({ success: true });
  } catch (error) {
    console.log(`[CREATE LIST] - ${error}`);
    response.status(500).json({ success: false });
  }
}

export async function findListsByOwner(request: Request, response: Response) {
  const { owner } = request.params;

  try {
    dbConnect();
    const lists = await listModel.find().where({ owner });
    response.status(200).json({ success: true, lists });
  } catch (error) {
    console.log(`[FIND LIST BY OWNER] - ${error}`);
    response.status(500).json({ success: false });
  }
}

export async function findPublicLists(request: Request, response: Response) {
  try {
    dbConnect();
    const lists = await listModel.find().where({ type: "public" });
    response.status(200).json({ success: true, lists });
  } catch (error) {
    console.log(`[FIND LIST BY OWNER] - ${error}`);
    response.status(500).json({ success: false });
  }
}

export async function addAchievementToList(
  request: Request,
  response: Response
) {
  const { achievementId } = response.locals;
  const { listId } = request.body;
  try {
    dbConnect();
    const dbTransaction = await listModel.findOneAndUpdate(
      { id: listId },
      { $push: { achievements: achievementId } }
    );
    response.status(200).json({ success: true });
  } catch (error) {
    console.log(`[ADD ACHIEVEMENT TO LIST] - ${error}`);
    response.status(500).json({ success: false });
  }
}

export async function getAchivementsIdsFromList(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { list } = request.params;

  try {
    dbConnect();
    const listDocument = await listModel.findOne({ id: list });
    const achievementsIds =  listDocument.achievements;
    response.locals.achievementsIds = achievementsIds;
    next();
  } catch (error) {
    console.log(`[GET ACHIEVEMENT IDS FROM LIST] - ${error}`);
    response.status(500).json({ success: false });
  }
}
