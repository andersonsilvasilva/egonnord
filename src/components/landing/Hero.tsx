import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-oficial.jpg";
import logoWhite from "@/assets/logo-white.png";
import { WHATSAPP_URL } from "./site-data";

export function Hero() {
  return (
    <section id="home" className="relative isolate scroll-mt-32 overflow-hidden">
      <img
        src={heroImage}
        alt="Profissional cuidando de um jardim residencial florido"
        width={1344}
        height={800}
        className="absolute inset-0 -z-10 size-full object-cover object-[center_35%]"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="mx-auto max-w-4xl px-4 py-28 text-center sm:py-40">
        <div className="mt-5">
          <h1 className="sr-only">
            Egon Nord — Jardinagem e Paisagismo em Curitiba e Região
          </h1>
          <img
            src={logoWhite}
            alt="Egon Nord — Jardinagem e paisagismo"
            width={843}
            height={504}
            className="mx-auto h-28 w-auto object-contain sm:h-36"
          />
        </div>
        <p className="mx-auto mt-6 max-w-xl text-base text-on-dark/85 sm:text-lg">
          Transformamos espaços verdes com criatividade, inovação e o cuidado que seu jardim merece.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="heroOutline" size="xl" asChild>
            <a href="#servicos">
              Conheça Nossos Serviços
              <ArrowRight aria-hidden />
            </a>
          </Button>
          <Button variant="whatsapp" size="xl" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden />
              Chamar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}