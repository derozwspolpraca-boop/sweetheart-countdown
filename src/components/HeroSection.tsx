import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 relative">
      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
          className="text-7xl md:text-9xl mb-8 inline-block"
        >
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            💝
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-4 leading-tight"
        >
          Happy Valentine's
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="h-0.5 gradient-heart mx-auto mb-6 rounded-full overflow-hidden"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed"
        >
          Dla najwspanialszej osoby na świecie 💕
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-primary/40 text-sm font-body"
          >
            ↓ przewiń w dół ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
