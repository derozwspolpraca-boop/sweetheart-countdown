import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const reasons = [
  { text: "Za Twój uśmiech, który rozjaśnia każdy dzień", emoji: "😊" },
  { text: "Za to, jak zawsze wiesz, co powiedzieć", emoji: "💬" },
  { text: "Za wspólne śmiechy do łez", emoji: "😂" },
  { text: "Za cierpliwość i wyrozumiałość", emoji: "🤗" },
  { text: "Za to, że jesteś moim najlepszym przyjacielem/przyjaciółką", emoji: "👫" },
  { text: "Za każdy przytulas i buziaka", emoji: "💋" },
  { text: "Za to, że przy Tobie czuję się sobą", emoji: "🥰" },
  { text: "Za wspólne marzenia o przyszłości", emoji: "✨" },
  { text: "Za to, że zawsze we mnie wierzysz", emoji: "💪" },
  { text: "Po prostu za to, że jesteś", emoji: "💖" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

const WhyILoveYou = () => {
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
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
        >
          <Heart className="w-8 h-8 text-primary" fill="currentColor" />
        </motion.div>

        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Dlaczego Cię Kocham
        </h2>
        <p className="text-muted-foreground font-body mb-10 text-sm">
          Powodów jest nieskończenie wiele, ale oto kilka z nich... 💕
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-3"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4 text-left group cursor-default border border-transparent hover:border-primary/20 transition-colors"
            >
              <motion.span
                className="text-2xl shrink-0"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {reason.emoji}
              </motion.span>
              <span className="font-body text-sm text-foreground/90 leading-relaxed">
                {reason.text}
              </span>
              <motion.span
                className="ml-auto text-primary/30 group-hover:text-primary/60 transition-colors shrink-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                ♥
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyILoveYou;
