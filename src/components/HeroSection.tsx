import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.5 }}
          className="text-7xl md:text-8xl mb-6 animate-pulse-heart inline-block"
        >
          💝
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="font-display text-5xl md:text-7xl text-foreground mb-4 leading-tight"
        >
          Happy Valentine's
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
        >
          Dla najwspanialszej osoby na świecie 💕
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-32 h-0.5 gradient-heart mx-auto mt-8 rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
