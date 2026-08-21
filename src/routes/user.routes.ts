import Router from "express";

import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controllers.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../validators/user.validator.js";

const router = Router();

router.post("/", validate(createUserSchema), createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
