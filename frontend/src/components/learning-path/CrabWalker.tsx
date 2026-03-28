import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import CrabGLB from "./CrabGLB";
import { POSITIONS as PIN_POSITIONS } from "../../constants/roadmapData";
import type { CrabWalkerProps, WalkState } from "../../types";

useGLTF.preload("/models/crab.glb");



const CRAB_W = 200;
const CRAB_H = 200;

const CrabWalker = ({ unlockedCount }: CrabWalkerProps) => {
	const prevCount = useRef(unlockedCount);
	const [walk, setWalk] = useState<WalkState | null>(null);
	const [walking, setWalking] = useState(false);
	// Always visible once the crab has appeared at least once
	const [visible, setVisible] = useState(true);

	// Start at the current unlocked level (last unlocked pin)
	const startPin = PIN_POSITIONS[Math.max(0, Math.min(unlockedCount - 1, PIN_POSITIONS.length - 1))];
	const [pos, setPos] = useState({ x: startPin.x, y: startPin.y });
	const animRef = useRef<number | null>(null);
	const posRef = useRef({ x: startPin.x, y: startPin.y });

	useEffect(() => {
		const diff = unlockedCount - prevCount.current;
		if (diff > 0 && unlockedCount <= PIN_POSITIONS.length) {
			// Walk from the previous current pin to the newly unlocked (current) pin
			const fromIdx = Math.max(0, Math.min(prevCount.current - 1, PIN_POSITIONS.length - 1));
			const toIdx = Math.max(0, Math.min(unlockedCount - 1, PIN_POSITIONS.length - 1));
			const from = PIN_POSITIONS[fromIdx];
			const to = PIN_POSITIONS[toIdx];

			// Cancel any in-flight animation
			if (animRef.current) cancelAnimationFrame(animRef.current);

			setTimeout(() => {
				posRef.current = { x: from.x, y: from.y };
				setPos({ x: from.x, y: from.y });
				setWalk({ id: Date.now(), fromX: from.x, fromY: from.y, toX: to.x, toY: to.y });
				setVisible(true);
				setWalking(true);

				const DURATION = 2000;
				const startTime = performance.now();

				const animate = (now: number) => {
					const elapsed = now - startTime;
					const p = Math.min(elapsed / DURATION, 1);
					const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

					const cx = from.x + (to.x - from.x) * eased;
					const cy = from.y + (to.y - from.y) * eased;

					posRef.current = { x: cx, y: cy };
					setPos({ x: cx, y: cy });

					if (p < 1) {
						animRef.current = requestAnimationFrame(animate);
					} else {
						// Stay at destination permanently
						setWalking(false);
					}
				};
				animRef.current = requestAnimationFrame(animate);
			}, 350);
		}
		prevCount.current = unlockedCount;
	}, [unlockedCount]);

	// Cleanup on unmount
	useEffect(() => {
		return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
	}, []);

	const facingRight = walk ? walk.toX >= walk.fromX : true;

	return (
		<div
			className="absolute z-25 pointer-events-none"
			style={{
				left: pos.x - CRAB_W / 2,
				top: pos.y - CRAB_H / 2 - 50,
				width: CRAB_W,
				height: CRAB_H,
				opacity: visible ? 1 : 0,
				transition: "opacity 0.5s ease",
				transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
			}}
		>
			<Canvas
				camera={{ position: [0, 0.3, 1.6], fov: 55 }}
				gl={{ antialias: true, alpha: true }}
				style={{ width: "100%", height: "100%" }}
			>
				<ambientLight intensity={0.6} />
				<directionalLight position={[2, 4, 2]} intensity={1.2} color="#ffffff" />
				<pointLight position={[0, 1, 1]} intensity={2.5} color="#fb923c" distance={6} decay={2} />

				<Suspense fallback={null}>
					<CrabGLB walking={walking} />
				</Suspense>
			</Canvas>

			{/* Shadow blob beneath crab */}
			<div
				className="absolute rounded-full blur-md"
				style={{
					bottom: 4,
					left: "50%",
					transform: "translateX(-50%)",
					width: 70,
					height: 12,
					background: "rgba(251, 146, 60, 0.35)",
				}}
			/>
		</div>
	);
}

export default CrabWalker;