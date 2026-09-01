import { Compass, Eye, HeartHandshake } from "lucide-react";
import aboutImage from "@/assets/egon-canteiro.jpg";



const PILLARS = [
  {
    icon: Compass,
    title: "Missão",
    text: "Criar jardins que traduzam a identidade de cada cliente com técnica e sensibilidade.",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser referência regional em paisagismo sustentável e atendimento próximo.",
  },
  {
    icon: HeartHandshake,
    title: "Valores",
    text: "Compromisso, transparência, respeito à natureza e cuidado em cada detalhe.",
  },
];

export function About() {
  return (
    <section id="sobre" className="scroll-mt-28 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src={aboutImage}
            alt="Egon cuidando de um canteiro de flores"
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-4/3 w-full rounded-lg object-cover shadow-[var(--shadow-card)]"
          />
          <div>
            <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
              Nossa História
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Cuidado Profissional Para O Seu Jardim
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Com conhecimento técnico em Agronomia e experiência no cuidado de jardins, desenvolvo
              e mantenho espaços que unem beleza, saúde e funcionalidade. Cada jardim é pensado de
              acordo com o ambiente e a rotina de quem o utiliza, seja para valorizar a estética com
              plantas ornamentais ou para trazer mais utilidade ao espaço com o cultivo de ervas e
              hortaliças.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Cada projeto começa com uma escuta atenta: entendemos rotina, uso do espaço, clima e
              orçamento antes de propor qualquer solução.
            </p>

            <div className="mt-9 grid gap-6 sm:grid-cols-3">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="border-t-2 border-sage pt-4">
                  <Icon className="size-5 text-primary" aria-hidden />
                  <h3 className="mt-3 font-display text-base font-semibold text-primary">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}