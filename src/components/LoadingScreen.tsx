import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Heart = ({ delay, left, size }: { delay: number; left: string; size: number }) => (
  <motion.div
    className="absolute text-primary"
    style={{ left, bottom: -20, fontSize: size }}
    initial={{ y: 0, opacity: 1, rotate: 0 }}
    animate={{ y: -400, opacity: 0, rotate: 25 }}
    transition={{ duration: 3, delay, ease: "easeOut" }}
  >
    ♥
  </motion.div>
);

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: number; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 5 && progress < 95) {
      const heartInterval = setInterval(() => {
        setHearts((prev) => [
          ...prev.slice(-15),
          {
            id: Date.now(),
            left: `${Math.random() * 80 + 10}%`,
            delay: 0,
            size: Math.random() * 16 + 14,
          },
        ]);
      }, 250);
      return () => clearInterval(heartInterval);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-soft"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {hearts.map((h) => (
          <Heart key={h.id} left={h.left} delay={h.delay} size={h.size} />
        ))}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-6xl mb-8 animate-pulse-heart"
        >
          💕
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-3xl text-foreground mb-8"
        >
          Ładuję miłość...
        </motion.p>

        <div className="w-64 h-4 rounded-full bg-secondary overflow-hidden shadow-romantic">
          <motion.div
            className="h-full rounded-full gradient-heart relative overflow-hidden"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-muted-foreground font-body text-sm"
        >
          {Math.min(Math.round(progress), 100)}% ♥
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
