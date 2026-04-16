import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { AIMovingLines } from "../components/AIMovingLines";
import { fetchApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // POST to our local express api (proxied to port 4000)
      const data = await fetchApi<{ user: any; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      // Update global context
      login(data.user);
      
      // Redirect to dashboard or home
      navigate("/");
    } catch (err: any) {
      setErrors({ general: err.message || "Failed to log in" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-background text-white relative overflow-hidden">
      <AIMovingLines backgroundColor="transparent" particleColor="#7c3aed" lineColor="rgba(124,58,237," />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_25%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[320px] p-8 rounded-[1rem] border border-white/10 bg-slate-950/90 shadow-[0_0_40px_rgba(124,58,237,0.3)] backdrop-blur-3xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">Login</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
            />
            {errors.email ? <p className="text-sm text-pink-400">{errors.email}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20"
            />
            {errors.password ? <p className="text-sm text-pink-400">{errors.password}</p> : null}
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500" />
              Remember me
            </label>
            <Link to="#" className="text-purple-400 hover:text-purple-200 transition-colors">
              Forgot Password?
            </Link>
          </div>

          {errors.general && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
              <p className="text-sm text-red-500 text-center">{errors.general}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link
          to="/signup"
          className="mt-8 inline-flex w-full justify-center text-center text-sm text-slate-400 font-semibold text-white transition duration-200 ease-out hover:text-purple-300 active:scale-95 active:text-purple-200"
        >
          Don’t have an account? Sign Up
        </Link>
      </motion.div>
    </div>
  );
}
