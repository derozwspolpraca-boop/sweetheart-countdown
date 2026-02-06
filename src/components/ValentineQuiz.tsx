import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  question: string;
  answers: string[];
  correct: number;
}

const questions: Question[] = [
  { question: "Pytanie 1?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 0 },
  { question: "Pytanie 2?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 1 },
  { question: "Pytanie 3?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 2 },
  { question: "Pytanie 4?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 3 },
  { question: "Pytanie 5?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 0 },
  { question: "Pytanie 6?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 1 },
  { question: "Pytanie 7?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 2 },
  { question: "Pytanie 8?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 3 },
  { question: "Pytanie 9?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 0 },
  { question: "Pytanie 10?", answers: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"], correct: 1 },
];

const labels = ["A", "B", "C", "D"];

const ValentineQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === questions[currentQ].correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setFinished(true);
      }
      setShowResult(false);
    }, 1200);
    setShowResult(true);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
  };

  const q = questions[currentQ];
  const percentage = Math.round((score / questions.length) * 100);

  const getResultEmoji = () => {
    if (percentage >= 90) return { emoji: "💯", text: "Idealna para!" };
    if (percentage >= 70) return { emoji: "💖", text: "Super razem!" };
    if (percentage >= 50) return { emoji: "💕", text: "Całkiem nieźle!" };
    return { emoji: "💗", text: "Poznajcie się lepiej! 😘" };
  };

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
          className="text-5xl mb-3"
        >
          🧠
        </motion.div>

        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">
          Quiz Miłosny
        </h2>
        <p className="text-muted-foreground font-body mb-8 text-sm">
          Sprawdź, jak dobrze się znamy! 💕
        </p>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl p-5 md:p-6 shadow-card border border-primary/5"
            >
              {/* Progress bar */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-body font-semibold">
                    Pytanie {currentQ + 1} z {questions.length}
                  </span>
                  <span className="text-xs text-primary font-body font-bold">
                    {Math.round(((currentQ) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full gradient-heart"
                    initial={{ width: `${((currentQ) / questions.length) * 100}%` }}
                    animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <h3 className="font-display text-xl md:text-2xl text-foreground mb-6 leading-snug">
                {q.question}
              </h3>

              <div className="grid gap-2.5">
                {q.answers.map((answer, i) => {
                  let btnStyle = "bg-secondary text-secondary-foreground hover:bg-rose-medium hover:text-primary-foreground";
                  if (showResult && selected !== null) {
                    if (i === q.correct) {
                      btnStyle = "bg-primary text-primary-foreground ring-2 ring-primary/30 scale-[1.02]";
                    } else if (i === selected) {
                      btnStyle = "bg-destructive text-destructive-foreground ring-2 ring-destructive/30";
                    } else {
                      btnStyle = "bg-secondary text-muted-foreground opacity-40";
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={selected === null ? { scale: 1.02 } : {}}
                      whileTap={selected === null ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-3.5 rounded-xl font-body text-sm text-left transition-all duration-300 flex items-center gap-3 ${btnStyle}`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-background/40 flex items-center justify-center text-xs font-bold shrink-0 backdrop-blur-sm">
                        {labels[i]}
                      </span>
                      <span className="leading-snug">{answer}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-card rounded-3xl p-8 shadow-card border border-primary/5"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: 2 }}
                className="text-7xl mb-5"
              >
                {getResultEmoji().emoji}
              </motion.div>

              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                {getResultEmoji().text}
              </h3>

              {/* Percentage circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                className="relative w-28 h-28 mx-auto mb-4"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - percentage / 100) }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-2xl font-bold text-primary font-body"
                  >
                    {percentage}%
                  </motion.span>
                </div>
              </motion.div>

              <p className="text-foreground font-body text-base font-semibold mb-1">
                {score} z {questions.length} poprawnych
              </p>
              <p className="text-muted-foreground font-body text-xs mb-6">
                {percentage >= 70 ? "Znacie się świetnie! 🥰" : "Czas na więcej randek! 😘"}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                className="gradient-heart text-primary-foreground font-body font-semibold py-3 px-8 rounded-full shadow-romantic text-sm"
              >
                Zagraj ponownie 💕
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ValentineQuiz;
