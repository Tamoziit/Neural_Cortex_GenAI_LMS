import Footer from "../../components/Footer";
import About from "../../components/landing/About";
import Contact from "../../components/landing/Contact";
import LearningRoadmap from "../../components/landing/LearningRoadmap";
import Modules from "../../components/landing/Modules";
import UserBase from "../../components/landing/UserBase";
import LandingNavbar from "../../components/navbars/LandingNavbar";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <>
      <LandingNavbar />

      <div className="relative pt-20 lg:pt-32 p-6 lg:p-16 flex flex-col items-center justify-center w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12">
          <div className="flex flex-col items-center lg:items-start gap-6">
            <motion.div
              className="w-40 lg:w-60"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <img
                src="/DN_Logo.gif"
                alt="Neural Cortex logo"
                className="w-full object-contain"
              />
            </motion.div>

            <div className="flex flex-col items-center lg:items-start gap-3">
              <motion.h1
                className="text-primary font-sans text-[40px] lg:text-[65px] leading-none text-center lg:text-left"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              >
                Neuron Cortex
              </motion.h1>

              <motion.p
                className="text-subhead text-sm sm:text-lg !font-mono text-center lg:text-left max-w-xl !text-gray-300"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                consequatur impedit consequuntur doloremque ullam numquam, mollitia
                quo repellendus?
              </motion.p>
            </div>
          </div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          >
            <img
              src="/Azure.png"
              alt="Azure logo"
              className="w-50 lg:w-100 object-contain"
            />
          </motion.div>
        </div>
      </div>

      <About />
      <LearningRoadmap />
      <UserBase />
      <Modules />
      <Contact />
      <Footer />
    </>
  );
};

export default Landing;