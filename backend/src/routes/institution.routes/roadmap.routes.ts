import express from "express";
import verifyInstitutionToken from "../../middlewares/institutionAuth.middleware";
import { assignRoadmap } from "../../controllers/institution.controller/roadmap.controller";

const router = express.Router();

router.post("/assign-roadmap", verifyInstitutionToken, assignRoadmap);

export default router;