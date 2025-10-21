import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const flicker = async () => {
      while (isMounted) {
        await controls.start({ opacity: 0.9, transition: { duration: 0.05 } });
        await controls.start({ opacity: 1, transition: { duration: 0.05 } });
        await new Promise((r) => setTimeout(r, Math.random() * 2000 + 500));
      }
    };

    flicker();

    return () => {
      isMounted = false;
    };
  }, [controls]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[var(--color-main-black)] flex flex-col items-center justify-center text-center font-['Epunda_Slab']">
      <div
        className="absolute inset-0 w-full h-full opacity-50 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/Background Gif For Edits.gif')",
        }}
      />

      <motion.div
        animate={controls}
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1a1a1a]/90 via-transparent to-[#1a1a1a]/90 mix-blend-screen"
      />

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.3, 0.46, 0.45, 0.94] }}
        className="origin-bottom w-full h-full flex flex-col items-center justify-center rounded-[2rem] overflow-hidden"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-[clamp(1rem,5vw,1rem)] font-bold tracking-[0.2em] text-grey75 z-10"
        >
          Error 404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-white text-[clamp(5rem,2vw,7.5rem)] z-10"
        >
          Sorry, we can't find that page
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 z-10"
        >
          <Link
            to="/"
            className="px-8 py-3 text-sm font-semibold tracking-wide text-black bg-[var(--color-main-red)] rounded-full hover:bg-[#ff3030] transition-all duration-300"
          >
            GO HOME
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 0.3 }}
        className="absolute bottom-0 w-full h-1 bg-white/10"
      />
    </div>
  );
};

export default NotFound;
