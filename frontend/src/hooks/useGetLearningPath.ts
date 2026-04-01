import { useState } from "react";
import toast from "react-hot-toast";
import type { LearningPathData } from "../types";

const useGetLearningPath = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getLearningPath = async (id: string): Promise<LearningPathData | null> => {
        setLoading(true);
        try {
            const token = localStorage.getItem("DN-token");
            const res = await fetch(`${apiUrl}/user/learning-path/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data as LearningPathData;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                toast.error("Failed to load learning path");
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getLearningPath };
};

export default useGetLearningPath;