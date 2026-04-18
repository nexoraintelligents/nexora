import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass"
    >
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg rotate-12 opacity-20 blur-sm" />
          <svg viewBox="0 0 100 100" className="w-8 h-8 relative z-10 drop-shadow-lg">
            <path 
              d="M20 80 L20 20 L50 50 L80 20 L80 80" 
              fill="none" 
              stroke="url(#logo-grad)" 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-xl font-bold tracking-tighter text-white">Nexora</span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Intelligence Era</span>
        </div>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <Link to="/services" className="hover:text-foreground transition-colors">Services</Link>
        <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-medium text-white">{user?.name}</span>
              <span className="text-[10px] text-muted-foreground">{user?.email}</span>
            </div>
            <Button 
              onClick={() => logout()}
              variant="outline"
              className="rounded-full border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Login
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
