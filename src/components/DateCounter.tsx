import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DateCounter = () => {
  const startDate = new Date(2024, 6, 16); // 16.07.2024
  const valentines = new Date(2026, 1, 14); // 14.02.2026

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = valentines.getTime() - startDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Live counter from start date
  const liveDiff = now.getTime() - startDate.getTime();
  const liveDays = Math.floor(liveDiff / (1000 * 60 * 60 * 24));
  const liveHours = Math.floor((liveDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const liveMinutes = Math.floor((liveDiff % (1000 * 60 * 60)) / (1000 * 60));
  const liveSeconds = Math.floor((liveDiff % (1000 * 60)) / 1000);

  const timeBlocks = [
    { value: liveDays, label: "dni" },
    { value: liveHours, label: "godzin" },
    { value: liveMinutes, label: "minut" },
    { value: liveSeconds, label: "sekund" },
  ];

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl mb-4"
        >
          💖
        </motion.div>

        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Razem od
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-display text-primary mb-2"
        >
          16 lipca 2024
        </motion.p>

        <p className="text-muted-foreground font-body mb-8 text-sm">
          do Walentynek 2026 minęło {days} dni, {hours}h {minutes}min {seconds}s
        </p>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {timeBlocks.map((block, i) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-3 md:p-4 shadow-card"
            >
              <motion.span
                key={block.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="block text-2xl md:text-4xl font-bold text-primary font-body"
              >
                {block.value}
              </motion.span>
              <span className="text-xs md:text-sm text-muted-foreground font-body">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-muted-foreground text-xs font-body"
        >
          ...i każda sekunda z Tobą jest wyjątkowa 💕
        </motion.p>
      </motion.div>
    </section>
  );
};

export default DateCounter;
