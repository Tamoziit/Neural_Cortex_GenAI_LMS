import express from "express";
import { createInstitution, logout, login } from "../../controllers/institution.controller/auth.controller";

const router = express.Router();

router.post("/create", createInstitution);
router.post("/login", login);
router.post("/logout/:id", logout);

export default router;