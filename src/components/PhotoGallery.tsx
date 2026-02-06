import { motion } from "framer-motion";

const placeholders = [
  { id: 1, label: "Nasze pierwsze zdjęcie 📸" },
  { id: 2, label: "Ulubiony moment 🥰" },
  { id: 3, label: "Razem w podróży ✈️" },
  { id: 4, label: "Nasz wspólny wieczór 🌙" },
  { id: 5, label: "Śmieszne wspomnienie 😂" },
  { id: 6, label: "Najpiękniejszy dzień 💐" },
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
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="aspect-square rounded-2xl bg-card shadow-card border-2 border-secondary flex flex-col items-center justify-center p-4 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 gradient-love opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {["💕", "🥰", "✨", "💖", "🌸", "💗"][i]}
              </span>
              <span className="text-xs text-muted-foreground font-body text-center">
                {photo.label}
              </span>
              <span className="text-[10px] text-rose-medium mt-1 font-body opacity-60">
                Dodaj zdjęcie
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PhotoGallery;
