import { useEffect, useMemo, useRef, useState } from "react";
import type { InstitutionItem, SearchableInstitutionSelectProps } from "../../../types";

const SearchableInstitutionSelect = ({
    institutionType,
    value,
    onChange,
    placeholder = "Search institutions..."
}: SearchableInstitutionSelectProps) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [query, setQuery] = useState("");
    const [items, setItems] = useState<InstitutionItem[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const selectedLabel = useMemo(() => {
        return items.find((i) => i._id === value)?.name || "";
    }, [items, value]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const onDocMouseDown = (e: MouseEvent) => {
            const el = containerRef.current;
            if (!el) return;
            if (e.target instanceof Node && !el.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, []);

    // When dropdown opens, make sure query is not stuck empty if a value is selected.
    useEffect(() => {
        if (!open) return;
        if (value && !query) {
            setQuery(selectedLabel || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, value]);

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
                if (err instanceof Error) setErrorMsg(err.message);
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => window.clearTimeout(handle);
    }, [apiUrl, institutionType, open, query]);

    const showValue = value ? selectedLabel : query;

    return (
        <div ref={containerRef} className="relative w-full">
            <label className="text-lg font-medium text-gray-300 flex items-center gap-2">
                Institution
            </label>

            <input
                type="text"
                className="input-primary w-full mt-1"
                value={open ? query : showValue}
                placeholder={placeholder}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
            />

            {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 glassmorphic-2 rounded-lg border-white/20">
                    <div className="p-2">
                        {loading ? (
                            <div className="text-white/70 text-sm">Loading...</div>
                        ) : errorMsg ? (
                            <div className="text-red-300 text-sm">{errorMsg}</div>
                        ) : items.length === 0 ? (
                            <div className="text-white/60 text-sm">No institutions found</div>
                        ) : (
                            <div className="max-h-[220px] overflow-auto pr-2">
                                {items.map((i) => (
                                    <button
                                        key={i._id}
                                        type="button"
                                        className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 transition border border-transparent hover:border-white/10"
                                        onClick={() => {
                                            onChange(i._id);
                                            setOpen(false);
                                        }}
                                    >
                                        <div className="text-gray-100 font-semibold text-sm truncate">
                                            {i.name}
                                        </div>
                                        {i.domain ? (
                                            <div className="text-white/50 text-[12px] truncate">{i.domain}</div>
                                        ) : (
                                            <div className="text-white/40 text-[12px] truncate">{i.type}</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableInstitutionSelect;

