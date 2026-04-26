import { motion } from "motion/react";
import { Database, Search, Rocket } from "lucide-react";

const steps = [
  {
    title: "Connect Data",
    description: "Seamlessly integrate with your existing tech stack—Stripe, Shopify, HubSpot, and more.",
    icon: Database,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Analyze",
    description: "Our AI engine processes your data to identify hidden patterns and growth opportunities.",
    icon: Search,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Act",
    description: "Receive prioritized action items and execute them directly from the Nexora dashboard.",
    icon: Rocket,
    color: "from-orange-500 to-red-500"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Three Steps to <span className="gradient-text">Growth</span></h2>
          <p className="text-muted-foreground">From integration to implementation in minutes, not months.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} p-0.5 mb-6 shadow-lg shadow-black/20`}>
                  <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
