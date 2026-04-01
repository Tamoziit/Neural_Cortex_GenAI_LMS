import { useState } from "react";
import toast from "react-hot-toast";
import type { EvaluationResult, PersonaAnswer } from "../types";

const useEvaluatePersona = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const evaluatePersona = async (
        role: string,
        answers: PersonaAnswer[]
    ): Promise<EvaluationResult | null> => {
        setLoading(true);
        try {
            const token = localStorage.getItem("DN-token");
            const res = await fetch(`${apiUrl}/user/learning-path/evaluate-persona/${role}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ answers }),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data as EvaluationResult;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to evaluate persona");
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, evaluatePersona };
};

export default useEvaluatePersona;