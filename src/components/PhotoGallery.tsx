import { motion } from "framer-motion";

const placeholders = [
  { id: 1, label: "Nasze pierwsze zdjęcie 📸", emoji: "💕" },
  { id: 2, label: "Ulubiony moment 🥰", emoji: "🥰" },
  { id: 3, label: "Razem w podróży ✈️", emoji: "✨" },
  { id: 4, label: "Nasz wspólny wieczór 🌙", emoji: "💖" },
  { id: 5, label: "Śmieszne wspomnienie 😂", emoji: "🌸" },
  { id: 6, label: "Najpiękniejszy dzień 💐", emoji: "💗" },
];

const PhotoGallery = () => {
  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150 }}
          className="text-5xl mb-3"
        >
          📷
        </motion.div>

        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Nasze Wspomnienia
        </h2>
        <p className="text-muted-foreground font-body mb-10 text-sm">
          Każde zdjęcie to historia 💕
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {placeholders.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="aspect-square rounded-2xl bg-card shadow-card border border-primary/10 flex flex-col items-center justify-center p-4 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 gradient-love opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500" />
              <motion.span
                className="text-4xl md:text-5xl mb-3"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                {photo.emoji}
              </motion.span>
              <span className="text-xs text-foreground/70 font-body text-center leading-snug">
                {photo.label}
              </span>
              <span className="text-[10px] text-primary/50 mt-1.5 font-body font-medium">
                Kliknij aby dodać
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PhotoGallery;
