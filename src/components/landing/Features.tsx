import { Flower2, Shovel, Sprout, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Flower2,
    title: "Paisagismo",
    text: "Projetos exclusivos que valorizam a arquitetura e a luz natural do seu espaço.",
  },
  {
    icon: Shovel,
    title: "Implantação & Plantio",
    text: "Execução completa, do preparo do solo às espécies certas para cada ambiente.",
  },
  {
    icon: Sprout,
    title: "Manutenção e Conservação",
    text: "Planos periódicos de poda, adubação e conservação para um jardim sempre bonito.",
  },
  {
    icon: Zap,
    title: "Orçamento Rápido",
    text: "Resposta ágil pelo WhatsApp, com visita técnica e proposta sem compromisso.",
  },
];

export function Features() {
  return (
    <section className="bg-secondary/60 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-lg border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
          >
            <span className="grid size-12 place-items-center rounded-full bg-sage text-sage-foreground">
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-primary">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}