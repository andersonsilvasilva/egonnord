import { NAV_LINKS } from "./site-data";
import logoWhite from "@/assets/logo-white.png";

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep py-10 text-on-dark/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
        <a href="#home" className="flex items-center">
          <img
            src={logoWhite}
            alt="Egon Nord — Jardinagem e paisagismo"
            width={843}
            height={504}
            loading="lazy"
            className="h-14 w-auto"
          />
        </a>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="hover:text-on-dark">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs">
          © 2026{" "}
          <a
            href="https://hightechtecnologia.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-on-dark"
          >
            HighTech Tecnologia Ltda.
          </a>{" "}
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}