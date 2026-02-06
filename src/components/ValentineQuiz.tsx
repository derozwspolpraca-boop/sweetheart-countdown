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

  const getResultEmoji = () => {
    if (score >= 9) return { emoji: "💯", text: "Idealna para!" };
    if (score >= 7) return { emoji: "💖", text: "Super razem!" };
    if (score >= 5) return { emoji: "💕", text: "Całkiem nieźle!" };
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
              className="bg-card rounded-3xl p-6 shadow-card"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground font-body">
                  {currentQ + 1} / {questions.length}
                </span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        i < currentQ
                          ? "bg-primary"
                          : i === currentQ
                          ? "bg-accent"
                          : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-display text-2xl text-foreground mb-6">
                {q.question}
              </h3>

              <div className="grid gap-3">
                {q.answers.map((answer, i) => {
                  let btnStyle = "bg-secondary text-secondary-foreground hover:bg-rose-medium hover:text-primary-foreground";
                  if (showResult && selected !== null) {
                    if (i === q.correct) {
                      btnStyle = "bg-primary text-primary-foreground scale-105";
                    } else if (i === selected) {
                      btnStyle = "bg-destructive text-destructive-foreground";
                    } else {
                      btnStyle = "bg-secondary text-muted-foreground opacity-50";
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={selected === null ? { scale: 1.02 } : {}}
                      whileTap={selected === null ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-4 rounded-2xl font-body text-sm text-left transition-all duration-300 flex items-center gap-3 ${btnStyle}`}
                    >
                      <span className="w-8 h-8 rounded-full bg-background/30 flex items-center justify-center text-xs font-bold shrink-0">
                        {labels[i]}
                      </span>
                      {answer}
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
              className="bg-card rounded-3xl p-8 shadow-card"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
                className="text-6xl mb-4"
              >
                {getResultEmoji().emoji}
              </motion.div>
              <h3 className="font-display text-3xl text-foreground mb-2">
                {getResultEmoji().text}
              </h3>
              <p className="text-primary font-body text-xl font-bold mb-2">
                {score} / {questions.length}
              </p>
              <p className="text-muted-foreground font-body text-sm mb-6">
                poprawnych odpowiedzi
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                className="gradient-heart text-primary-foreground font-body font-semibold py-3 px-8 rounded-full shadow-romantic"
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
