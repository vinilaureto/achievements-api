import { Router } from "express";
import { createUser, findAllUsers, findUserById } from "../middlewares/userMiddlewares";

const routes = Router();

routes.get("/", (req, res) => {
    res.send({ola: "mundo"})
})

// User routers
routes.post('/users', createUser)
routes.get('/users/:id', findUserById)
routes.get('/users', findAllUsers)

export { routes };
