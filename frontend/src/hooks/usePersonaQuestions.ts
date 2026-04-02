import { useState } from "react";
import toast from "react-hot-toast";
import type { PersonaQuestionsData } from "../types";

const usePersonaQuestions = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchQuestions = async (role: string): Promise<PersonaQuestionsData | null> => {
        setLoading(true);
        try {
            const token = localStorage.getItem("DN-token");
            const res = await fetch(`${apiUrl}/user/learning-path/persona-identification/${role}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data as PersonaQuestionsData;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to fetch questions");
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, fetchQuestions };
};

export default usePersonaQuestions;