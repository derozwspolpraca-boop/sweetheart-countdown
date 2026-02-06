import { useEffect, useState } from "react";

interface FloatHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatHeart[]>([]);

  useEffect(() => {
    const generated: FloatHeart[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 8,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-primary/20"
          style={{
            left: `${h.left}%`,
            bottom: "-20px",
            fontSize: `${h.size}px`,
            animation: `float-heart ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
