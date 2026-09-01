import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Portfolio } from "@/components/landing/Portfolio";
import { Marquee } from "@/components/landing/Marquee";
import { Contact } from "@/components/landing/Contact";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { CONTACT, SITE_URL, WHATSAPP_NUMBER } from "@/components/landing/site-data";

const title = "Egon Nord | Jardinagem e paisagismo";
const description =
  "Projeto, implantação e manutenção de jardins com criatividade e cuidado. Orçamento rápido pelo WhatsApp."
const ogImage = `${SITE_URL}/og-image.jpg`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Egon Nord - Jardinagem & Paisagismo",
  description,
  image: ogImage,
  url: SITE_URL,
  telephone: `+${WHATSAPP_NUMBER}`,
  email: CONTACT.email,
  areaServed: "Curitiba e Cidades Vizinhas",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <About />
        <Services />
        <Portfolio />
        <Marquee />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
