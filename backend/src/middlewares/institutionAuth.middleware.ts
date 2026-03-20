import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../redis/client";
import Institution from "../models/institutions.model";

const verifyInstitutionToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			res.status(401).json({ error: "Unauthorized - No Token Provided" });
			return;
		}

		// Use the same JWT_SECRET
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { userId?: string, _id?: string };
		if (!decoded) {
			res.status(401).json({ error: "Unauthorized - Invalid Token" });
			return;
		}

		// The decoded token might have `userId` or `_id` depending on how it was generated
		const id = decoded._id || decoded.userId;
		if (!id) {
			res.status(401).json({ error: "Unauthorized - Invalid Token Payload" });
			return;
		}

		const redisKey = `DN-institution:${id}`;
		const payload = await client.get(redisKey);
		if (!payload) {
			res.status(401).json({ error: "Unauthorized - No Institution Data in Cache, Login first" });
			return;
		}

		const data = JSON.parse(payload);
		if (data.token !== token) {
			res.status(401).json({ error: "Unauthorized - Token Mismatch" });
			return;
		}

		const institution = await Institution.findById(id).select("-password");
		if (!institution) {
			res.status(404).json({ error: "Institution Not Found!" });
			return;
		}

		(req as any).institution = institution;
		next();
	} catch (error) {
		console.log("Error in verifyInstitutionToken middleware", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export default verifyInstitutionToken;
