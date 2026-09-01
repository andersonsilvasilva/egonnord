import poda3 from "@/assets/egon-poda3.jpg";
import hortasOrganicas from "@/assets/egon-hortas-organicas.jpg";
import canteiroFlores from "@/assets/egon-canteiro-de-flores.jpg";
import poda2 from "@/assets/egon-poda2.jpg";
import horta from "@/assets/egon-horta.jpg";
import cerca from "@/assets/egon-cerca.jpg";
import limpeza from "@/assets/egon-limpeza.jpg";
import poda from "@/assets/egon-poda.jpg";

const PHOTOS = [
  { src: poda3, alt: "Poda de árvore frutífera carregada de laranjas" },
  { src: hortasOrganicas, alt: "Plantio de mudas de salsinha em horta orgânica" },
  { src: canteiroFlores, alt: "Plantio de canteiro de flores coloridas" },
  { src: poda2, alt: "Poda de galhos com serrote manual no jardim" },
  { src: horta, alt: "Seleção de mudas de temperos e ervas em viveiro" },
  { src: cerca, alt: "Corte e nivelamento de cerca viva com podador de altura" },
  { src: limpeza, alt: "Limpeza de folhas e resíduos do jardim com soprador" },
  { src: poda, alt: "Poda de árvore cítrica com tesoura de jardinagem" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-28 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
            Portfólio
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Serviços que realizamos
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PHOTOS.map((p) => (
            <li key={p.alt} className="overflow-hidden rounded-lg">
              <img
                src={p.src}
                alt={p.alt}
                width={800}
                height={800}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}