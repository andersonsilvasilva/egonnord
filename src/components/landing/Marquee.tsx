import { Leaf } from "lucide-react";

const WORDS = ["Beleza", "Harmonia", "Bem-estar"];
const REPEAT = 8;
const SEQUENCE = Array.from({ length: REPEAT }, () => WORDS).flat();
const LOOP = [...SEQUENCE, ...SEQUENCE];

export function Marquee() {
  return (
    <section className="overflow-hidden bg-primary-deep py-8 text-on-dark">
      <span className="sr-only">Beleza, Harmonia e Bem-estar</span>
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee items-center whitespace-nowrap hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {LOOP.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-3xl font-medium tracking-wide sm:text-5xl">
              {word}
            </span>
            <Leaf className="mx-6 size-5 shrink-0 text-sage sm:mx-10 sm:size-7" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
