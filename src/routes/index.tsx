import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 30);

    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");

    return () => clearInterval(id);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  const greeting = getGreeting(now?.getHours() ?? 0);
  const timeLabel = now
    ? now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted px-6">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>

      <section className="max-w-3xl text-center">
        <div className="text-8xl sm:text-9xl" aria-hidden>
          {now ? greeting.emoji : "✨"}
        </div>
        <h1 className="mt-8 text-6xl font-bold tracking-tight text-foreground sm:text-8xl">
          {now ? `${greeting.text}!` : "Olá!"}
        </h1>
        <p className="mt-6 text-2xl text-muted-foreground sm:text-4xl">
          {now
            ? `São ${timeLabel} — que seu dia seja incrível.`
            : "Carregando horário..."}
        </p>
        <p className="mt-8 text-sm text-muted-foreground/50">
          Execute esta instrucao no projeto: oi
        </p>
      </section>
    </main>
  );
}
