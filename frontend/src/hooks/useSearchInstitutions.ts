import { useState, useEffect, useRef } from "react";
import type { InstitutionItem, InstitutionSearchHookProps } from "../types";

const useSearchInstitutions = ({
    institutionType,
    query,
    open
}: InstitutionSearchHookProps) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [items, setItems] = useState<InstitutionItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (!open) return;

        const handle = window.setTimeout(async () => {
            setLoading(true);
            setErrorMsg(null);

            abortRef.current?.abort();
            const controller = new AbortController();
            abortRef.current = controller;

            try {
                const q = query.trim();
                const params = new URLSearchParams();
                params.set("type", institutionType);
                if (q) params.set("q", q);

                const res = await fetch(`${apiUrl}/institution/utils?${params.toString()}`, {
                    method: "GET",
                    signal: controller.signal
                });
                const data = await res.json();
                if (!res.ok || data.error) {
                    throw new Error(data.error || "Failed to fetch institutions");
                }

                setItems(Array.isArray(data.items) ? data.items : []);
            } catch (err) {
                if (err instanceof Error && err.name !== "AbortError") {
                    setErrorMsg(err.message);
                }
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => window.clearTimeout(handle);
    }, [apiUrl, institutionType, open, query]);

    return { items, loading, errorMsg };
};

export default useSearchInstitutions;
