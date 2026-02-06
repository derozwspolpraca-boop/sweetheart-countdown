import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Heart flying from sides toward the loading bar
const SideHeart = ({ id, fromLeft }: { id: number; fromLeft: boolean }) => {
  const yOffset = (Math.random() - 0.5) * 60;
  const size = Math.random() * 10 + 12;

  return (
    <motion.div
      className="absolute text-primary"
      style={{ fontSize: size, top: `calc(50% + 40px + ${yOffset}px)` }}
      initial={{
        x: fromLeft ? -100 : 100,
        opacity: 0.9,
        scale: 1,
      }}
      animate={{
        x: 0,
        opacity: 0,
        scale: 0.3,
      }}
      transition={{ duration: 1.2 + Math.random() * 0.6, ease: "easeIn" }}
      {...(fromLeft ? { style: { ...{ fontSize: size, top: `calc(50% + 40px + ${yOffset}px)` }, left: 0 } } : { style: { ...{ fontSize: size, top: `calc(50% + 40px + ${yOffset}px)` }, right: 0 } })}
    >
      ♥
    </motion.div>
  );
};

// Big heart made of small hearts
const BigHeartReveal = () => {
  // Create heart shape from small hearts using parametric equation
  const heartPoints = useMemo(() => {
    const points: { x: number; y: number; delay: number }[] = [];
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({ x: x * 4, y: y * 4, delay: Math.random() * 0.5 });
    }
    // Fill inside with random hearts
    for (let i = 0; i < 30; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.8;
      const x = r * 16 * Math.pow(Math.sin(t), 3);
      const y = r * -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({ x: x * 4, y: y * 4, delay: 0.2 + Math.random() * 0.6 });
    }
    return points;
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative" style={{ width: 200, height: 200 }}>
        {heartPoints.map((p, i) => (
          <motion.span
            key={i}
            className="absolute text-primary"
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              fontSize: Math.random() * 6 + 8,
            }}
            initial={{ opacity: 0, scale: 0, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: p.delay,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            ♥
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [sideHearts, setSideHearts] = useState<{ id: number; fromLeft: boolean }[]>([]);
  const [showBigHeart, setShowBigHeart] = useState(false);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowBigHeart(true);
          setTimeout(handleComplete, 1800);
          return 100;
        }
        return prev + 1.2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [handleComplete]);

  // Side hearts flying toward bar
  useEffect(() => {
    if (progress > 3 && progress < 98) {
      const interval = setInterval(() => {
        setSideHearts((prev) => [
          ...prev.slice(-20),
          { id: Date.now() + Math.random(), fromLeft: Math.random() > 0.5 },
        ]);
      }, 180);
      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-soft overflow-hidden"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
      >
        {/* Side hearts */}
        {sideHearts.map((h) => (
          <SideHeart key={h.id} id={h.id} fromLeft={h.fromLeft} />
        ))}

        {/* Big heart reveal on complete */}
        {showBigHeart && <BigHeartReveal />}

        {!showBigHeart && (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
              className="text-7xl mb-6 animate-pulse-heart"
            >
              💕
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl md:text-4xl text-foreground mb-10"
            >
              Ładuję miłość...
            </motion.p>
          </>
        )}

        {/* Loading bar */}
        <motion.div
          className="w-72 md:w-80 relative"
          animate={showBigHeart ? { opacity: 0, y: 20 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="h-5 rounded-full bg-secondary/80 overflow-hidden shadow-romantic backdrop-blur-sm border border-rose-medium/20">
            <motion.div
              className="h-full rounded-full gradient-heart relative overflow-hidden"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </motion.div>
          </div>

          {/* Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={showBigHeart ? { opacity: 0 } : { opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-muted-foreground font-body text-sm text-center tracking-wider"
          >
            {Math.min(Math.round(progress), 100)}% ♥
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
