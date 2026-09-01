import paisagismoImg from "@/assets/egon-canteiro-de-flores.jpg";
import implantacaoImg from "@/assets/egon-implantacao-jardim.jpg";
import maintenanceImg from "@/assets/egon-poda-cerca.jpg";
import renovationImg from "@/assets/egon-repaginacao-espacos.jpg";
import cleaningImg from "@/assets/service-cleaning.jpg";
import bedsImg from "@/assets/service-garden-beds.jpg";

const SERVICES = [
  {
    img: paisagismoImg,
    title: "Paisagismo",
    text: "Planejamento de jardins com escolha de plantas e soluções que valorizam cada espaço.",
  },
  {
    img: implantacaoImg,
    title: "Implantação de Jardins",
    text: "Preparo do solo e plantio das espécies adequadas para criar jardins bonitos e saudáveis.",
  },
  {
    img: maintenanceImg,
    title: "Manutenção & Conservação",
    text: "Cuidados regulares com plantas, jardins e áreas verdes para mantê-los sempre bem cuidados.",
  },
  {
    img: renovationImg,
    title: "Repaginação de Espaços",
    text: "Renovação de jardins e áreas verdes, aproveitando melhor o que já existe no local.",
  },
  {
    img: cleaningImg,
    title: "Limpeza de Terrenos",
    text: "Limpeza e organização de terrenos, quintais e áreas externas para novos usos ou plantios.",
  },
  {
    img: bedsImg,
    title: "Hortas Orgânicas",
    text: "Criação de hortas simples e produtivas para cultivar temperos, ervas e alimentos frescos.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-28 bg-secondary/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
            Serviços
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            O que fazemos pelo seu espaço
          </h2>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div className="overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}