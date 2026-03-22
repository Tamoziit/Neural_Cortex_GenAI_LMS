import { Request, Response } from "express";
import Institution from "../../models/institutions.model";
import User from "../../models/user.model";
import escapeRegex from "../../utils/escapeRegex";

export const listInstitutions = async (req: Request, res: Response) => {
    try {
        const type = req.query.type;
        const q = typeof req.query.q === "string" ? req.query.q : "";

        const filter: Record<string, any> = {};
        if (type === "institute" || type === "corporate") filter.type = type;

        if (q.trim()) {
            const safe = escapeRegex(q.trim());
            filter.$or = [
                { name: { $regex: safe, $options: "i" } },
                { domain: { $regex: safe, $options: "i" } }
            ];
        }

        const items = await Institution.find(filter)
            .select("_id name type domain")
            .limit(25);

        res.status(200).json({ items });
    } catch (error) {
        console.log("Error in listInstitutions controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getRequests = async (req: Request, res: Response) => {
    try {
        // req.institution is set by institutionAuth.middleware.ts
        const instId = (req as any).institution._id;
        const institution = await Institution.findById(instId).populate("requests", "fullName username email gender profilePic _id");

        if (!institution) {
            res.status(404).json({ error: "Institution not found" });
            return;
        }

        res.status(200).json({ requests: institution.requests });
    } catch (error) {
        console.log("Error in getRequests controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const instId = (req as any).institution._id;
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }

        // Find the institution
        const institution = await Institution.findById(instId);
        if (!institution) {
            res.status(404).json({ error: "Institution not found" });
            return;
        }

        // Check if user is in requests array
        const inRequests = institution.requests.some(reqId => reqId.toString() === userId);
        if (!inRequests) {
            res.status(400).json({ error: "User is not in the pending requests list" });
            return;
        }

        // Update User
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        user.verified = true;
        await user.save();

        // Move from requests to members
        institution.requests = institution.requests.filter(reqId => reqId.toString() !== userId);
        institution.members.push(userId as any);
        await institution.save();

        res.status(200).json({ message: "User verified successfully", userId });
    } catch (error) {
        console.log("Error in verifyUser controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};