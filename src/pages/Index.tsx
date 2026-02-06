import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import DateCounter from "@/components/DateCounter";
import WhyILoveYou from "@/components/WhyILoveYou";
import PhotoGallery from "@/components/PhotoGallery";
import ValentineQuiz from "@/components/ValentineQuiz";
import FloatingHearts from "@/components/FloatingHearts";

const SectionDivider = () => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="flex items-center justify-center gap-3 py-4 max-w-xs mx-auto"
  >
    <div className="h-px flex-1 gradient-heart rounded-full opacity-30" />
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-primary/40 text-sm"
    >
      ♥
    </motion.span>
    <div className="h-px flex-1 gradient-heart rounded-full opacity-30" />
  </motion.div>
);

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen gradient-soft relative overflow-x-hidden"
        >
          <FloatingHearts />
          <div className="relative z-20">
            <HeroSection />
            <SectionDivider />
            <DateCounter />
            <SectionDivider />
            <WhyILoveYou />
            <SectionDivider />
            <PhotoGallery />
            <SectionDivider />
            <ValentineQuiz />

            <footer className="text-center py-14 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.span
                  className="text-4xl inline-block mb-3"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💕
                </motion.span>
                <p className="font-display text-3xl text-foreground mb-1">
                  Kocham Cię
                </p>
                <p className="text-muted-foreground text-xs font-body mt-2 tracking-wide">
                  ~ Walentynki 2026 ~
                </p>
              </motion.div>
            </footer>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Index;
