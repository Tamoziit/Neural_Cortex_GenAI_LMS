import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import Spinner from "../../components/Spinner";
import LearningPathHeader from "../../components/learning-path/LearningPathHeader";
import TimelineModuleCard from "../../components/learning-path/TimelineModuleCard";
import TimelineCrab from "../../components/learning-path/TimelineCrab";
import useGetLearningPath from "../../hooks/useGetLearningPath";
import { fallbackAccent, roleAccent } from "../../constants/learningPath";
import type { LearningPathData } from "../../types";

const LearningPathId = () => {
	const { id } = useParams<{ id: string }>();
	const { loading, getLearningPath } = useGetLearningPath();
	const [data, setData] = useState<LearningPathData | null>(null);
	const hasFetched = useRef(false);
	const [focusedIdx, setFocusedIdx] = useState(0);
	const [walking, setWalking] = useState(false);
	const prevFocused = useRef(0);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const timelineRef = useRef<HTMLDivElement>(null);
	const [crabY, setCrabY] = useState(0);

	useEffect(() => {
		if (!id || hasFetched.current) return;
		hasFetched.current = true;
		getLearningPath(id).then((d) => {
			if (d) setData(d);
		});
	}, [id]);

	useEffect(() => {
		if (!data) return;

		const observers: IntersectionObserver[] = [];

		cardRefs.current.forEach((el, idx) => {
			if (!el) return;
			const obs = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
						setFocusedIdx(idx);
					}
				},
				{ threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
			);
			obs.observe(el);
			observers.push(obs);
		});

		return () => observers.forEach((o) => o.disconnect());
	}, [data]);

	// ── Move crab when focused index changes ───────────────────────────────
	useEffect(() => {
		const card = cardRefs.current[focusedIdx];
		const container = timelineRef.current;
		if (!card || !container) return;

		const cardRect = card.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();

		// Y centre of the card relative to the timeline container
		const targetY = cardRect.top - containerRect.top + card.offsetHeight / 2;

		const changed = focusedIdx !== prevFocused.current;
		prevFocused.current = focusedIdx;

		if (changed) {
			setWalking(true);
			// Slight delay before marking idle again (let spring settle)
			setTimeout(() => setWalking(false), 900);
		}

		setCrabY(targetY);
	}, [focusedIdx]);

	// ── Recalculate on scroll / resize ────────────────────────────────────
	const recalcCrab = useCallback(() => {
		const card = cardRefs.current[focusedIdx];
		const container = timelineRef.current;
		if (!card || !container) return;
		const cardRect = card.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		setCrabY(cardRect.top - containerRect.top + card.offsetHeight / 2);
	}, [focusedIdx]);

	useEffect(() => {
		window.addEventListener("scroll", recalcCrab, { passive: true });
		window.addEventListener("resize", recalcCrab, { passive: true });
		return () => {
			window.removeEventListener("scroll", recalcCrab);
			window.removeEventListener("resize", recalcCrab);
		};
	}, [recalcCrab]);

	const accent = data ? (roleAccent[data.role] ?? fallbackAccent) : fallbackAccent;

	return (
		<>
			<AppNavbar />
			<div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-transparent">

				{loading && (
					<div className="flex flex-col items-center justify-center flex-1 min-h-screen gap-4">
						<Spinner size="large" />
						<p className="text-gray-500 text-sm !font-mono tracking-wider">Loading your roadmap…</p>
					</div>
				)}

				{!loading && !data && (
					<div className="flex flex-col items-center justify-center flex-1 min-h-screen gap-3 text-center px-6">
						<p className="text-gray-400 text-xl">Roadmap not found.</p>
						<p className="text-gray-600 text-sm">It may have been removed or you don't have access.</p>
					</div>
				)}

				{/* ── Main content ─────────────────────────────────────── */}
				{!loading && data && (
					<>
						{/* Header */}
						<LearningPathHeader data={data} accentText={accent.text} />

						{/* Timeline section */}
						<div className="relative px-4 lg:px-10 pb-32">
							<div
								ref={timelineRef}
								className="relative max-w-4xl mx-auto"
							>
								{/* Vertical spine line */}
								<motion.div
									initial={{ scaleY: 0 }}
									animate={{ scaleY: 1 }}
									transition={{ duration: 1.2, ease: "easeOut" }}
									className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent origin-top pointer-events-none"
									style={{ transform: "translateX(-50%)" }}
								/>

								{/* Glowing pulse on spine */}
								<div
									className={`absolute left-1/2 -translate-x-1/2 w-0.5 rounded-full pointer-events-none transition-all duration-700`}
									style={{
										top: Math.max(0, crabY - 60),
										height: 120,
										background: `linear-gradient(to bottom, transparent, rgba(34,211,238,0.3), transparent)`,
										filter: "blur(2px)",
									}}
								/>

								{/* Crab walker */}
								<TimelineCrab targetY={crabY} walking={walking} />

								{/* Module cards */}
								<div className="flex flex-col gap-14 py-10">
									{data.moduleIds.map((mod, idx) => (
										<TimelineModuleCard
											key={mod._id}
											ref={(el) => { cardRefs.current[idx] = el; }}
											module={mod}
											index={idx}
											isFocused={focusedIdx === idx}
											accentColor={accent.color}
											accentBorder={accent.border}
											accentText={accent.text}
											accentGlow={accent.glow}
										/>
									))}
								</div>

								{/* End cap */}
								<motion.div
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.8, duration: 0.5 }}
									className={`relative mx-auto w-fit mt-2 flex flex-col items-center gap-2`}
								>
									<div className={`w-6 h-6 rounded-full border-2 ${accent.border} ${accent.glow} ${accent.color} opacity-80`} />
									<p className={`!font-mono text-xs tracking-widest uppercase ${accent.text} opacity-60`}>
										End of Path
									</p>
								</motion.div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default LearningPathId;