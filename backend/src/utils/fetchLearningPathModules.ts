import Module from "../models/modules.model";
import { LearningPathModuleProps } from "../types";

const fetchLearningPathModules = async ({ role, level }: LearningPathModuleProps) => {
    try {
        const modules = await Module.find({ role, level }).select("_id");

        if (!modules) return [];

        return modules.map((m) => m._id);
    } catch (error) {
        console.log("Error in fetching Learning Path modules: ", error);
        return;
    }
}

export default fetchLearningPathModules;