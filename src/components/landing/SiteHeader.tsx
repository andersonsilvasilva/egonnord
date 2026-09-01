import { useState } from "react";
import { Mail, MapPin, Phone, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/logo-dark.png";
import logoWhite from "@/assets/logo-white.png";
import { CONTACT, NAV_LINKS, WHATSAPP_URL } from "./site-data";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary-deep text-on-dark/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs sm:justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            {CONTACT.location}
          </span>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:underline">
            <Mail className="size-3.5 shrink-0" aria-hidden />
            {CONTACT.email}
          </a>
          <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-1.5 hover:underline">
            <Phone className="size-3.5 shrink-0" aria-hidden />
            {CONTACT.phone}
          </a>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between">
          <a href="#home" className="flex min-w-0 items-center">
            <img
              src={logoDark}
              alt="Egon Nord — Jardinagem e paisagismo"
              width={843}
              height={504}
              className="h-12 w-auto sm:h-14 dark:hidden"
            />
            <img
              src={logoWhite}
              alt=""
              aria-hidden
              width={843}
              height={504}
              className="hidden h-12 w-auto sm:h-14 dark:block"
            />
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button variant="whatsapp" size="lg" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden />
                Orçamento via WhatsApp
              </a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-10 place-items-center rounded-md border border-border text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <nav aria-label="Navegação móvel" className="border-t border-border bg-background lg:hidden">
            <ul className="mx-auto max-w-7xl px-4 py-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-sm font-medium text-foreground/80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <Button variant="whatsapp" className="w-full" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden />
                    Orçamento via WhatsApp
                  </a>
                </Button>
              </li>
              <li className="pt-1 pb-1">
                <ThemeToggle className="w-full justify-between" />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}