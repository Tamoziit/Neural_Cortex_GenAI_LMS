import express from "express";
import verifyToken from "../../middlewares/auth.middleware";
import { personaIdentification, evaluatePersona, getLearningPathById } from "../../controllers/user.controller/learning-path.controller";

const router = express.Router();

router.get("/persona-identification/:role", verifyToken, personaIdentification);
router.post("/evaluate-persona/:role", verifyToken, evaluatePersona);
router.get("/:id", verifyToken, getLearningPathById);

export default router;