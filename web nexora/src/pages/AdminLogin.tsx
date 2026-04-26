import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAuth, User } from "../context/AuthContext";
import { Shield, Lock, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate authentication for the Admin Panel
    setTimeout(() => {
      if (email === "admin@nexora.ai" && password === "admin123") {
        const adminUser: User = {
          id: "admin-1",
          name: "Nexora Admin",
          email: email,
          role: "admin",
        };
        login(adminUser);
        navigate("/admin");
      } else {
        setError("Invalid admin credentials");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="glass border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-red-900/20">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-red-500/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">System Restricted</h1>
            <p className="text-sm text-muted-foreground">Authenticate to access the Nexora Admin Console</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admin Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexora.ai"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Passcode</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-red-500/50 transition-colors"
                />
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                <p className="text-red-400 text-xs font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded-xl py-3.5 text-sm hover:opacity-90 hover:-translate-y-1 duration-300 transition-all disabled:opacity-50 disabled:hover:translate-y-0 shadow-lg shadow-red-900/30 overflow-hidden group"
            >
              {isLoading ? "Authenticating..." : "Authorize Access"}
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-white text-xs transition-colors">
            ← Return to public site
          </button>
        </div>
      </motion.div>
    </div>
  );
}
