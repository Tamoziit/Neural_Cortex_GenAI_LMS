import { Request, Response } from "express";
import Question from "../../models/question.model";
import { PersonaAnswerProps } from "../../types";
import LearningPath from "../../models/learningPath.model";
import fetchLearningPathModules from "../../utils/fetchLearningPathModules";

export const personaIdentification = async (req: Request, res: Response) => {
	try {
		const role = req.params.role;

		if (!role) {
			res.status(400).json({ error: "Role is required" });
			return;
		}
		if (role !== "Azure_AI_Engineer" && role !== "Azure_DS" && role !== "Azure_Administrator" && role !== "Azure_Solutions_Architect" && role !== "Azure_DevOps_Engineer" && role !== "Azure_Data_Engineer" && role !== "Azure_Security_Engineer" && role !== "Azure_Developer") {
			res.status(400).json({ error: "Select a valid role" });
			return;
		}

		const questions = await Question.findOne({ role }).select("-questions.correct");
		if (!questions) {
			res.status(400).json({ error: "No questions found for this role" });
			return;
		}

		res.status(200).json(questions);
	} catch (error) {
		console.log("Error in personaIdentification controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const evaluatePersona = async (req: Request, res: Response) => {
	try {
		const { answers }: PersonaAnswerProps = req.body;
		const role = req.params.role;

		if (!answers || !role) {
			res.status(400).json({ error: "Error in evaluating Persona" });
			return;
		}
		if (role !== "Azure_AI_Engineer" && role !== "Azure_DS" && role !== "Azure_Administrator" && role !== "Azure_Solutions_Architect" && role !== "Azure_DevOps_Engineer" && role !== "Azure_Data_Engineer" && role !== "Azure_Security_Engineer" && role !== "Azure_Developer") {
			res.status(400).json({ error: "Select a valid role" });
			return;
		}

		const pathAlreadyExists = await LearningPath.findOne({
			userId: req.user?._id,
			role
		});
		if (pathAlreadyExists) {
			res.status(400).json({ error: "You already have an active Learning path for this role" });
			return;
		}

		const questions = await Question.findOne({ role });
		if (!questions) {
			res.status(400).json({ error: "No questions found for this role" });
			return;
		}
		if (questions.questions.length !== answers.length || !Array.isArray(answers)) {
			res.status(400).json({ error: "All questions must be answered" });
			return;
		}

		let correctCount = 0;
		const totalQuestions = questions.questions.length;

		if (totalQuestions === 0) {
			res.status(400).json({ error: "No questions available to evaluate" });
			return;
		}

		answers.forEach((userAns) => {
			const question = questions.questions.find(
				(q: any) => q._id.toString() === userAns._id.toString()
			);
			if (question && question.correct === userAns.ans) {
				correctCount++;
			}
		});

		const percentage = (correctCount / totalQuestions) * 100;

		let level: "Beginner" | "Intermediate" | "Advanced" = "Beginner";
		if (percentage >= 70) {
			level = "Advanced";
		} else if (percentage >= 40) {
			level = "Intermediate";
		}
		const modules = await fetchLearningPathModules({
			role,
			level
		});

		const newLearningPath = new LearningPath({
			userId: req.user?._id,
			role,
			type: "learning-path",
			level,
			moduleIds: modules,
			approved: true
		});

		if (newLearningPath) {
			await newLearningPath.save();

			res.status(200).json({
				score: correctCount,
				total: totalQuestions,
				percentage,
				level,
				learningPath: newLearningPath._id
			});
		}
	} catch (error) {
		console.log("Error in evaluatePersona controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getLearningPathById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		if (!id) {
			res.status(400).json({ error: "Learning path ID is required" });
			return;
		}

		const learningPath = await LearningPath.findById(id).populate({
			path: "moduleIds",
			select: "-chapters",
		});

		if (!learningPath) {
			res.status(400).json({ error: "Learning path not found" });
			return;
		}

		if (learningPath.userId.toString() !== req.user?._id.toString()) {
			res.status(403).json({ error: "Access denied: you do not own this learning path" });
			return;
		}

		const sortedModules = (learningPath.moduleIds as any[]).sort(
			(a, b) => (a.phase ?? 0) - (b.phase ?? 0)
		);

		res.status(200).json({
			...learningPath.toObject(),
			moduleIds: sortedModules,
		});
	} catch (error) {
		console.log("Error in getLearningPathById controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}