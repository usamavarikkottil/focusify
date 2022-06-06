import express from "express";


import { createSession, deleteSession, getSession, getSessions } from "../controllers/session.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();



router.post("/", verifyToken, createSession);
router.delete("/:id", verifyToken, deleteSession);
router.get("/:id", verifyToken, getSession);
router.get("/", verifyToken, getSessions);

export default router;