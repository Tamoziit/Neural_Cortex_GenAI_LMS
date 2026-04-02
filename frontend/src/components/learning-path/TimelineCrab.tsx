import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion, useSpring } from "framer-motion";
import CrabGLB from "../recommended-courses/CrabGLB";
import type { TimelineCrabProps } from "../../types";

useGLTF.preload("/models/crab.glb");

const TimelineCrab = ({ targetY, walking }: TimelineCrabProps) => {
	const spring = useSpring(targetY, { stiffness: 60, damping: 18 });

	// Update spring whenever targetY changes
	useEffect(() => {
		spring.set(targetY);
	}, [targetY, spring]);

	return (
		<motion.div
			className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20"
			style={{ top: spring, translateX: "-50%", translateY: "-50%" }}
		>
			{/* Crab canvas */}
			<div style={{ width: 140, height: 140 }}>
				<Canvas
					camera={{ position: [0, 0.3, 1.6], fov: 55 }}
					gl={{ antialias: true, alpha: true }}
					style={{ width: "100%", height: "100%" }}
				>
					<ambientLight intensity={0.7} />
					<directionalLight position={[2, 4, 2]} intensity={1.2} color="#ffffff" />
					<pointLight position={[0, 1, 1]} intensity={2.5} color="#fb923c" distance={6} decay={2} />
					<Suspense fallback={null}>
						<CrabGLB walking={walking} />
					</Suspense>
				</Canvas>
			</div>
			{/* Shadow blob */}
			<div
				className="absolute rounded-full blur-md"
				style={{
					bottom: 4,
					left: "50%",
					transform: "translateX(-50%)",
					width: 50,
					height: 10,
					background: "rgba(251, 146, 60, 0.35)",
				}}
			/>
		</motion.div>
	);
};

export default TimelineCrab;