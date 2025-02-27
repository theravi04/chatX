import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { initiateCall, endCall } from "../controllers/call.controller.js";

const router = express.Router();

router.post("/initiate/:id", protectRoute, initiateCall);
router.post("/end/:id", protectRoute, endCall);

export default router;
