import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saudação | Bom dia, boa tarde ou boa noite" },
      {
        name: "description",
        content:
          "Tela inicial que exibe uma saudação personalizada conforme o horário: bom dia, boa tarde ou boa noite.",
      },
      { property: "og:title", content: "Saudação do dia" },
      {
        property: "og:description",
        content: "Uma saudação amigável baseada no horário atual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return { text: "Bom dia", emoji: "☀️" };
  if (hour >= 12 && hour < 18) return { text: "Boa tarde", emoji: "🌤️" };
  return { text: "Boa noite", emoji: "🌙" };
}

function Index() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const greeting = getGreeting(now?.getHours() ?? 0);
  const timeLabel = now
    ? now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted px-6">
      <section className="max-w-xl text-center">
        <div className="text-6xl" aria-hidden>
          {now ? greeting.emoji : "✨"}
        </div>
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          {now ? `${greeting.text}!` : "Olá!"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {now
            ? `São ${timeLabel} — que seu dia seja incrível.`
            : "Carregando horário..."}
        </p>
      </section>
    </main>
  );
}
