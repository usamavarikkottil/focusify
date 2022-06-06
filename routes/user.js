import express from "express";


import { createUser, getUsers, getUser, updateUser, deleteUser, loginUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();



router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.patch("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

router.post("/", createUser);
router.post("/login", loginUser);

export default router;