import express from "express";


import { createUser, getUsers, getUser, updateUser, deleteUser, loginUser } from "../controllers/user.js";

const router = express.Router();



router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/login", loginUser);

export default router;