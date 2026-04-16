import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, ShieldCheck, Users } from "lucide-react";

const faqs = [
  {
    question: "How does Nexora convert data into decisions?",
    answer:
      "Nexora uses AI to analyze complex signals, surface the highest-impact metrics, and turn them into clear next steps for creators and business teams.",
    icon: Sparkles,
  },
  {
    question: "Can creators use Nexora for content analytics?",
    answer:
      "Yes — creators get a unified view of audience behavior, engagement signals, and monetization trends in one intelligent dashboard.",
    icon: Users,
  },
  {
    question: "What kind of signals can I surface instantly?",
    answer:
      "From revenue momentum and campaign performance to retention alerts and growth opportunities, Nexora delivers actionable signals in real time.",
    icon: Zap,
  },
  {
    question: "Is the dashboard updated in real time?",
    answer:
      "Absolutely — the platform refreshes metrics continuously so you can make fast decisions based on the latest signals and trends.",
    icon: ShieldCheck,
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Badge variant="secondary" className="mb-4 uppercase tracking-[0.4em] text-[10px]">
            GAQ
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions for <span className="gradient-text">Data-Driven Teams</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Get fast clarity on how Nexora turns your analytics into business-ready signals and strategic actions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.question} className="bg-slate-950/80 border border-white/10 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
                <CardHeader className="gap-4 px-6 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-purple-500/10 text-purple-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-white">{item.question}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
