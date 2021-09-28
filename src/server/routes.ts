import { Router } from "express";
import { createAchievement, getAchievementsFromIds } from "../middlewares/achievementsMiddleware";
import { authenticate, validateAuth } from "../middlewares/authMiddleware";
import { addAchievementToList, createList, findListsByOwner, findPublicLists, getAchivementsIdsFromList } from "../middlewares/listMiddleware";
import {
  createUser,
  findAllUsers,
  findUserById,
} from "../middlewares/userMiddlewares";

const routes = Router();

// User routers
routes.post("/users", createUser);
routes.get("/users/:id", findUserById);
routes.get("/users", findAllUsers);

// List routes
routes.post("/list", validateAuth, createList);
routes.get("/list/:owner", validateAuth, findListsByOwner);
routes.get("/list", findPublicLists);

// Achievements routes
routes.post("/achievements", validateAuth, createAchievement, addAchievementToList);
routes.get("/achievements/:list", validateAuth, getAchivementsIdsFromList, getAchievementsFromIds);

// Auth routes
routes.post('/auth', authenticate)

export { routes };
