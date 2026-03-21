import express from "express";
import { createInstitution, listInstitutions, getRequests, verifyUser, logout, login } from "../controllers/institutions.controller";
import verifyInstitutionToken from "../middlewares/institutionAuth.middleware";

const router = express.Router();

router.get("/", listInstitutions);
router.post("/create", createInstitution);
router.post("/login", login);
router.post("/logout/:id", logout);

router.get("/requests", verifyInstitutionToken, getRequests);
router.post("/requests/:userId/verify", verifyInstitutionToken, verifyUser);

export default router;