import Router from "express";

import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controllers.js";
import { validationCreateUser } from "../middleware/user.validation.js";

const router = Router();

router.post("/", validationCreateUser, createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
