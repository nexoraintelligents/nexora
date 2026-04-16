import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    content: "Nexora transformed how we handle our data pipeline. The AI insights are scarily accurate.",
    image: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    name: "Marcus Thorne",
    role: "Founder of Velocity",
    content: "The decision engine saved us months of trial and error in our market expansion strategy.",
    image: "https://picsum.photos/seed/marcus/100/100"
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Growth at Bloom",
    content: "Finally, an AI platform that doesn't just show charts but actually tells you what to do next.",
    image: "https://picsum.photos/seed/elena/100/100"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by <span className="gradient-text">Visionaries</span></h2>
          <p className="text-muted-foreground">Join the leaders who are shaping the future of business.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl glass border-white/5 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border-2 border-purple-500/30">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic mb-6 leading-relaxed">
                "{t.content}"
              </p>
              <h4 className="font-bold">{t.name}</h4>
              <span className="text-xs text-purple-400 font-medium">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
