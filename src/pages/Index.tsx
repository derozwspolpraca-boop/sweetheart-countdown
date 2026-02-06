import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import DateCounter from "@/components/DateCounter";
import PhotoGallery from "@/components/PhotoGallery";
import ValentineQuiz from "@/components/ValentineQuiz";
import FloatingHearts from "@/components/FloatingHearts";

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
            <DateCounter />
            <PhotoGallery />
            <ValentineQuiz />

            <footer className="text-center py-10 px-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display text-2xl text-primary"
              >
                Kocham Cię 💕
              </motion.p>
              <p className="text-muted-foreground text-xs font-body mt-2">
                ~ Walentynki 2026 ~
              </p>
            </footer>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Index;
