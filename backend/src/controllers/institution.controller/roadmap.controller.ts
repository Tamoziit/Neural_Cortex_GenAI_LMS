import { Request, Response } from "express";
import { AssignRoadmapProps } from "../../types";
import User from "../../models/user.model";
import LearningPath from "../../models/learninPath.model";
import Institution from "../../models/institutions.model";

export const assignRoadmap = async (req: Request, res: Response) => {
    try {
        const { memberId, role }: AssignRoadmapProps = req.body;

        const member = await User.findById(memberId);
        const institution = await Institution.findById(req.institution?._id);

        if (!institution) {
            res.status(400).json({ error: "Cannot find user" });
            return;
        }
        if (!member) {
            res.status(400).json({ error: "Cannot find user" });
            return;
        }
        if (!institution.members.includes(memberId)) {
            res.status(400).json({ error: "This user is not a member of your institution" });
            return;
        }
        if (!role) {
            res.status(400).json({ error: "No valid role found" });
            return;
        }
        if(role !== "Azure_AI_Engineer" && role !== "Azure_DS" && role !== "Azure_Administrator" && role !== "Azure_Solutions_Architect" && role !== "Azure_DevOps_Engineer" && role !== "Azure_Data_Engineer" && role !== "Azure_Security_Engineer" && role !== "Azure_Developer") {
            res.status(400).json({ error: "Select a valid role" });
            return;
        }

        const existingRoadmap = await LearningPath.findOne({ userId: memberId, role });
        if (existingRoadmap) {
            res.status(400).json({ error: "This roadmap has already been assigned to this user" });
            return;
        }

        const newLearningPath = new LearningPath({
            institutionId: req.institution?._id,
            userId: memberId,
            role
        });

        if (newLearningPath) {
            await newLearningPath.save();

            res.status(200).json(newLearningPath);
        }
    } catch (error) {
        console.log("Error in assignRoadmap controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}