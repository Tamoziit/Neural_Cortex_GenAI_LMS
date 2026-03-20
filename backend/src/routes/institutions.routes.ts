import express from "express";
import { createInstitution, listInstitutions } from "../controllers/institutions.controller";

const router = express.Router();

router.get("/", listInstitutions);
router.post("/create", createInstitution);

export default router;