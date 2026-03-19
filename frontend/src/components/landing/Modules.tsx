import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cards } from "../../constants/modules";
import PillCard from "./PillCard";

const Modules = () => {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

    return (
        <div id="personalized-learning" className="mt-12 w-full flex flex-col items-center px-4">
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 16 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-2 mb-12"
            >
                <h1 className="text-[39px] lg:text-[50px] text-secondary text-center font-semibold tracking-tight">
                    Personalized Learning Resources
                </h1>
                <p className="text-subhead text-center">
                    Everything you need to grow — structured, hands-on, and adaptive.
                </p>
            </motion.div>

            <div className="w-full max-w-4xl flex flex-col gap-4">
                {cards.map((card, idx) => (
                    <PillCard key={card.title} card={card} index={idx} />
                ))}
            </div>
        </div>
    );
};

export default Modules;