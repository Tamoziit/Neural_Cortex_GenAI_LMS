import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Institution from "../../models/institutions.model";
import type { InstitutionCreateBody, UserLoginBody } from "../../types";
import client from "../../redis/client";
import generateTokenAndSetCookie from "../../utils/generateTokenAndSetCookie";

export const createInstitution = async (req: Request, res: Response) => {
	try {
		const {
			name,
			type,
			email,
			password
		}: InstitutionCreateBody = req.body;

		if (!name || name.length < 2) {
			res.status(400).json({ error: "Institution name should be at least 2 characters long" });
			return;
		}
		if (type !== "institute" && type !== "corporate") {
			res.status(400).json({ error: "Enter a valid institution type" });
			return;
		}
		if (!email) {
			res.status(400).json({ error: "Enter an email" });
			return;
		}
		if (!password || password.length < 6) {
			res.status(400).json({ error: "Password should be at least 6 characters long" });
			return;
		}

		const existing = await Institution.findOne({ email });
		if (existing) {
			res.status(400).json({ error: "An institution with this email already exists" });
			return;
		}

		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);

		const institution = new Institution({
			name,
			type,
			email,
			password: passwordHash
		});

		await institution.save();

		const token = generateTokenAndSetCookie(institution._id, res);
		const payload = {
			token,
			_id: institution._id,
			name: institution.name,
			type: institution.type,
			email: institution.email,
			domain: institution.domain ?? null
		};

		await client.set(`DN-institution:${institution._id}`, JSON.stringify(payload));
		await client.expire(`DN-institution:${institution._id}`, 30 * 24 * 60 * 60);

		res.status(201)
			.header("Authorization", `Bearer ${token}`)
			.json({
				_id: institution._id,
				name: institution.name,
				type: institution.type,
				email: institution.email,
				domain: institution.domain ?? null,
				profilePic: institution.profilePic ?? null,
				token
			});
	} catch (error) {
		console.log("Error in createInstitution controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password }: UserLoginBody = req.body;
		const institution = await Institution.findOne({ email });
		if (!institution) {
			res.status(400).json({ error: "Cannot find User" });
			return;
		}

		const isPasswordCorrect = await bcrypt.compare(password, institution.password || "");
		if (!isPasswordCorrect) {
			res.status(400).json({ error: "Invalid Login Credentials" });
			return;
		}

		res.cookie("DN-jwt", "", { maxAge: 0 });
		const token = generateTokenAndSetCookie(institution._id, res);
		const payload = {
			token,
			_id: institution._id,
			name: institution.name,
			type: institution.type,
			email: institution.email,
			domain: institution.domain ?? null
		}

		await client.set(`DN-institution:${institution._id}`, JSON.stringify(payload));
		await client.expire(`DN-institution:${institution._id}`, 30 * 24 * 60 * 60);

		res.status(201)
			.header("Authorization", `Bearer ${token}`)
			.json({
				_id: institution._id,
				name: institution.name,
				type: institution.type,
				email: institution.email,
				domain: institution.domain ?? null,
				profilePic: institution.profilePic ?? null,
				token
			});
	} catch (error) {
		console.log("Error in Login controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const logout = async (req: Request, res: Response) => {
	try {
		const institutionId = req.params.id;

		res.cookie("DN-jwt", "", { maxAge: 0 });
		await client.del(`DN-institution:${institutionId}`);

		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in Logout controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
