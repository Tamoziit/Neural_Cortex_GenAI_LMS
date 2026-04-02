import express from "express";
import { listInstitutions, getRequests, verifyUser, getMyMembers } from "../../controllers/institution.controller/utils.controller";
import verifyInstitutionToken from "../../middlewares/institutionAuth.middleware";

const router = express.Router();

router.get("/", listInstitutions);
router.get("/requests", verifyInstitutionToken, getRequests);
router.post("/requests/:userId/verify", verifyInstitutionToken, verifyUser);
router.get("/members", verifyInstitutionToken, getMyMembers);

export default router;