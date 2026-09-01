import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT, SERVICE_NAMES, WHATSAPP_NUMBER, WHATSAPP_URL } from "./site-data";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len === 0) return "";
  if (len <= 2) return `(${digits}`;
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (len <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function Contact() {
  const [sending, setSending] = useState(false);
  const [phone, setPhone] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    const data = new FormData(event.currentTarget);
    const message =
      `Olá! Sou ${data.get("nome")}.\n` +
      `Serviço: ${data.get("servico")}\n` +
      `E-mail: ${data.get("email")}\n` +
      `Telefone: ${data.get("telefone")}\n\n` +
      `${data.get("mensagem")}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    toast.success("Pedido preparado! Finalize o envio pelo WhatsApp.");
    event.currentTarget.reset();
    setPhone("");
    setSending(false);
  }

  return (
    <section id="contato" className="scroll-mt-28 bg-secondary/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
              Contato
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Vamos planejar o seu jardim
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Fale com a nossa equipe e receba um orçamento sem compromisso. Atendemos residências,
              condomínios e empresas.
            </p>

            <ul className="mt-9 space-y-5">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span className="text-sm text-muted-foreground">{CONTACT.location}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {CONTACT.phone}
                </a>
              </li>
            </ul>

            <Button variant="whatsapp" size="xl" className="mt-9" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden />
                Conversar pelo WhatsApp
              </a>
            </Button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" required placeholder="Seu nome completo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="voce@email.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  required
                  placeholder="(00) 90000-0000"
                  inputMode="tel"
                  maxLength={15}
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="servico">Serviço desejado</Label>
                <select
                  id="servico"
                  name="servico"
                  required
                  defaultValue=""
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {SERVICE_NAMES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  required
                  placeholder="Conte um pouco sobre o seu espaço e o que você deseja."
                />
              </div>
            </div>
            <Button type="submit" size="xl" className="mt-7 w-full" disabled={sending}>
              <Send aria-hidden />
              Solicitar orçamento
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}