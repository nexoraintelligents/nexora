import { motion } from "motion/react";

const founderImage = "/assets/founder.png";

const leaders = [
  {
    name: "Abhisek Roy",
    role: "Founder & CEO",
    bio: "Visionary leader building innovative digital solutions.",
    highlight: true,
    image: founderImage,
  },
  {
    name: "Prasant Kumar",
    role: "Co-Founder & CTO",
    bio: "Expert in technology and system architecture.",
    highlight: false,
    image: "/assets/co-founder.jpg",
  },
  {
    name: "Aditya Kumar",
    role: "Managing Director",
    bio: "Driving operations and strategic growth with a focus on delivering executive leadership and business impact.",
    highlight: false,
    image: "/assets/aditya%20kumar%20MD.jpeg",
  }
];

export function LeadershipTeam() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.35em] text-purple-300/70 mb-3">Team</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Leadership Team</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
            Meet the executive team powering our premium AI platform with deep expertise in business, engineering, and growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {leaders.map((member) => (
            <motion.div
              key={member.name}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-[30px] border border-black/10 dark:border-white/10 p-8 bg-white/80 dark:bg-slate-950/80 shadow-[0_25px_80px_rgba(15,23,42,0.1)] dark:shadow-[0_25px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-500 ${member.highlight ? "scale-[1.03] border-purple-400/40 shadow-[0_0_80px_rgba(124,58,237,0.1)] dark:shadow-[0_0_80px_rgba(124,58,237,0.22)]" : "hover:border-blue-400/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]"}`}
            >
              <div className={`absolute inset-0 rounded-[30px] opacity-0 transition-opacity duration-500 ${member.highlight ? "group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" : "group-hover:opacity-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10"}`} />
              <div className="relative flex flex-col items-center text-center gap-6">
                <div className={`relative flex h-32 w-32 items-center justify-center rounded-full border-2 ${member.highlight ? "border-purple-500" : "border-blue-500/50"} bg-white/90 dark:bg-slate-950/90 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-600 dark:text-purple-300/70">{member.role}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
