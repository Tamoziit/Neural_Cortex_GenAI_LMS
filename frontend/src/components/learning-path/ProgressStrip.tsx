import type { ProgressStripProps } from "../../types";

const ProgressStrip = ({ total, unlocked, onUnlock }: ProgressStripProps) => (
    <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
            <button
                key={i}
                title={`Unlock up to module ${i + 1}`}
                onClick={() => onUnlock(i + 1 === unlocked ? i : i + 1)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i < unlocked
                    ? "bg-cyan-400 w-5 shadow-[0_0_8px_#22d3ee]"
                    : "bg-white/15 w-2 hover:bg-white/30"
                    }`}
            />
        ))}
        <span className="ml-2 text-xs font-mono text-white/40">
            {unlocked}/{total} unlocked
        </span>
    </div>
);

export default ProgressStrip;