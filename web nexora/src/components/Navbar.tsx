import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass"
    >
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0 pb-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg rotate-12 opacity-20 blur-sm" />
          <img src="/logo.png" alt="Nexora Logo" className="w-full h-full relative z-10 drop-shadow-lg object-contain scale-[1.3]" />
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-xl font-bold tracking-tighter text-white dark:text-white">Nexora</span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Intelligence Era</span>
        </div>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <Link to="/services" className="hover:text-foreground transition-colors">Services</Link>
        <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
          role="switch"
          aria-checked={theme === "dark"}
        >
          <span className="sr-only">Toggle theme</span>
          <span
            className={`pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform ${
              theme === "dark" ? "translate-x-3" : "-translate-x-3"
            }`}
          >
            {theme === "dark" ? (
              <Moon className="h-3.5 w-3.5" />
            ) : (
              <Sun className="h-3.5 w-3.5" />
            )}
          </span>
        </button>

        <Link
          to="/login"
          className="hidden sm:inline-flex rounded-full border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/10 dark:hover:bg-white/10"
        >
          Login
        </Link>
        <Link
          to="/admin"
          className="hidden sm:inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-300 transition hover:bg-purple-500/20"
        >
          Admin
        </Link>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white">
          Get Started
        </Button>
      </div>
    </motion.nav>
  );
}
