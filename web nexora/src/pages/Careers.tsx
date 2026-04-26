import { motion } from "motion/react";
import { Briefcase, Code, Cpu, Globe, Heart, Rocket, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const openPositions = [
  {
    id: 1,
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    icon: <Cpu className="w-5 h-5 text-blue-400" />
  },
  {
    id: 2,
    title: "Frontend Architect",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-Time",
    icon: <Code className="w-5 h-5 text-purple-400" />
  },
  {
    id: 3,
    title: "Product Manager, AI Systems",
    department: "Product",
    location: "New York, NY",
    type: "Full-Time",
    icon: <Briefcase className="w-5 h-5 text-green-400" />
  },
  {
    id: 4,
    title: "Lead Data Scientist",
    department: "Research",
    location: "Remote",
    type: "Full-Time",
    icon: <Zap className="w-5 h-5 text-yellow-400" />
  }
];

const benefits = [
  {
    title: "Work from Anywhere",
    description: "We are a remote-first company with flexible working hours.",
    icon: <Globe className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision insurance for you and your family.",
    icon: <Heart className="w-6 h-6 text-pink-400" />
  },
  {
    title: "Competitive Equity",
    description: "We believe in shared success. Generous stock options for all employees.",
    icon: <Rocket className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Top-Tier Talent",
    description: "Collaborate daily with brilliant minds pushing the boundaries of AI.",
    icon: <Users className="w-6 h-6 text-indigo-400" />
  }
];

export default function Careers() {
  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] -z-10 pointer-events-none -translate-x-1/2" />
      <div className="absolute top-3/4 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none translate-x-1/3" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            Build the Future of <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">Intelligence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto font-light"
          >
            Join the team at Nexora and help us create the most advanced neural decision engines in the world. We are looking for pioneers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none px-8 py-6 text-lg rounded-full">
              View Open Roles
            </Button>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-32"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Why Join Nexora?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Open Positions</h2>
              <p className="text-muted-foreground">Find your next defining career move.</p>
            </div>
            {/* Simple department filter mockup placeholder */}
            <div className="mt-4 md:mt-0 flex gap-2 overflow-x-auto pb-2 md:pb-0">
               <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm whitespace-nowrap cursor-pointer">All Roles</span>
               <span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-muted-foreground whitespace-nowrap cursor-pointer hover:bg-white/10 transition-colors">Engineering</span>
               <span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-muted-foreground whitespace-nowrap cursor-pointer hover:bg-white/10 transition-colors">Product</span>
            </div>
          </div>

          <div className="space-y-4">
            {openPositions.map((post, index) => (
              <div 
                key={post.id}
                className="group glass p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="hidden sm:flex w-14 h-14 rounded-full bg-white/5 border border-white/10 items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    {post.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">{post.department}</span>
                      <span>•</span>
                      <span>{post.location}</span>
                      <span>•</span>
                      <span>{post.type}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 border-white/20 hover:bg-blue-600 hover:text-white hover:border-blue-600">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center glass py-12 px-6 rounded-3xl border border-dashed border-white/20">
            <h3 className="text-xl font-bold mb-3">Don't see a fit?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We're always looking for exceptional talent. Send your resume and tell us how you can contribute to Nexora.
            </p>
            <Button variant="secondary" className="rounded-full">
              Submit General Application
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
