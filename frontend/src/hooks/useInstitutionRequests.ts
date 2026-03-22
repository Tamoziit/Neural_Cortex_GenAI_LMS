import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useInstitutionRequests = () => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState<any[]>([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("DN-token");
            const res = await fetch(`${apiUrl}/institution/utils/requests`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setRequests(data.requests || []);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [apiUrl]);

    return { loading, requests, setRequests, fetchRequests };
};

export default useInstitutionRequests;
