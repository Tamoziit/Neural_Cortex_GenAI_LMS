import express from "express";
import verifyToken from "../../middlewares/auth.middleware";
import { personaIdentification, evaluatePersona, getLearningPathById, getAllLearningPaths, getModuleById } from "../../controllers/user.controller/learning-path.controller";

const router = express.Router();

router.get("/persona-identification/:role", verifyToken, personaIdentification);
router.post("/evaluate-persona/:role", verifyToken, evaluatePersona);
router.get("/", verifyToken, getAllLearningPaths);
router.get("/:id", verifyToken, getLearningPathById);
router.get("/module/:id", verifyToken, getModuleById);

export default router;