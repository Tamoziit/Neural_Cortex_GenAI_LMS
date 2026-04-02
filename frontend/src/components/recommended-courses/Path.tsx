import { MODULE_ACCENTS, PATH_D, POSITIONS, CANVAS_WIDTH } from "../../constants/roadmapData";
import { motion } from "framer-motion";

const Path = ({ unlockedCount }: { unlockedCount: number }) => {
	return (
		<svg
			className="absolute inset-y-0 w-full h-full pointer-events-none"
			viewBox={`0 0 ${CANVAS_WIDTH} 600`}
			preserveAspectRatio="xMinYMid meet"
		>
			<defs>
				<linearGradient id="roadmapGradient" x1="0" y1="0" x2="1" y2="0">
					{MODULE_ACCENTS.map((acc, i) => (
						<stop
							key={i}
							offset={`${(i / (MODULE_ACCENTS.length - 1)) * 100}%`}
							stopColor={acc.glow}
						/>
					))}
				</linearGradient>

				<clipPath id="revealMask">
					<motion.rect
						initial={{ width: 0 }}
						animate={{ width: POSITIONS[Math.max(0, Math.min(unlockedCount - 1, POSITIONS.length - 1))]?.x + 130 }}
						transition={{ duration: 1.2, ease: "easeInOut" }}
						x="0" y="0" height="1000"
					/>
				</clipPath>
			</defs>

			{/* road layers */}
			<path d={PATH_D} stroke="#0f172a" strokeWidth="50" fill="none" strokeLinecap="round" transform="translate(0,20)" />
			<path d={PATH_D} stroke="#1e293b" strokeWidth="50" fill="none" strokeLinecap="round" />
			<path d={PATH_D} stroke="url(#roadmapGradient)" strokeOpacity={0.4} strokeWidth="50" fill="none" strokeLinecap="round" transform="translate(0,20)" clipPath="url(#revealMask)" />
			<path d={PATH_D} stroke="url(#roadmapGradient)" strokeWidth="50" fill="none" strokeLinecap="round" clipPath="url(#revealMask)" />
			<path d={PATH_D} stroke="#ffffff" strokeWidth="3" strokeDasharray="12 12" fill="none" strokeOpacity={0.15} strokeLinecap="round" />
			<path d={PATH_D} stroke="#ffffff" strokeWidth="3" strokeDasharray="12 12" fill="none" strokeOpacity={0.5} strokeLinecap="round" clipPath="url(#revealMask)" />
		</svg>
	)
}

export default Path;