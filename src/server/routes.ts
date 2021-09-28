import { Router } from "express";
import { createAchievement, getAchievementsFromIds } from "../middlewares/achievementsMiddleware";
import { addAchievementToList, createList, findListsByOwner, findPublicLists, getAchivementsIdsFromList } from "../middlewares/listMiddleware";
import {
  createUser,
  findAllUsers,
  findUserById,
} from "../middlewares/userMiddlewares";

const routes = Router();

routes.get("/", (req, res) => {
  res.send({ ola: "mundo" });
});

// User routers
routes.post("/users", createUser);
routes.get("/users/:id", findUserById);
routes.get("/users", findAllUsers);

// List routes
routes.post("/list", createList);
routes.get("/list/:owner", findListsByOwner);
routes.get("/list", findPublicLists);

// Achievements routes
routes.post("/achievements", createAchievement, addAchievementToList);
routes.get("/achievements/:list", getAchivementsIdsFromList, getAchievementsFromIds);

export { routes };
