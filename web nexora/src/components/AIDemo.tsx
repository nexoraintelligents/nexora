import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { generateInsight, AIInsight } from "@/src/lib/gemini";
import { Badge } from "@/components/ui/badge";

export function AIDemo() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<AIInsight | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await generateInsight(input);
    setInsight(result);
    setLoading(false);
  };

  return (
    <section id="demo" className="py-24 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience the <span className="gradient-text">Intelligence</span></h2>
            <p className="text-muted-foreground">Describe a business challenge and let Nexora generate strategic recommendations.</p>
          </div>

          <Card className="glass overflow-hidden border-purple-500/20">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Nexora Signal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-2 mb-8">
                <Input 
                  placeholder="Describe your problem (e.g., 'Customer churn is increasing in the EU market')" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-white/5 border-white/10 h-12"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading}
                  className="h-12 px-6 bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {insight && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-tighter text-purple-400">AI Analysis</span>
                        <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          Impact: {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-sm leading-relaxed text-purple-100/80 italic">
                        "{insight.analysis}"
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {insight.recommendations.map((rec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                          <span className="text-sm font-medium">{rec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {!insight && !loading && (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                    <p>Enter a problem above to see Nexora in action.</p>
                  </div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
