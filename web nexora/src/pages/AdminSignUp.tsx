import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { AIMovingLines } from "../components/AIMovingLines";
import { fetchApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState(""); // extra security for admin signup
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; adminCode?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const nextErrors: { name?: string; email?: string; password?: string; adminCode?: string } = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!adminCode.trim()) {
      nextErrors.adminCode = "Registration code is required to become an admin.";
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
      // In a real app we'd pass adminCode to verify admin intent
      const data = await fetchApi<{ user: any; token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role: "admin", adminCode }),
      });
      
      login(data.user);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setErrors({ general: err.message || "Registration failed or invalid admin code" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-background text-white relative overflow-hidden">
      <AIMovingLines backgroundColor="transparent" particleColor="#ef4444" lineColor="rgba(239,68,68," />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(153,27,27,0.1),_transparent_25%)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] p-8 rounded-[1rem] border border-red-500/20 bg-slate-950/90 shadow-[0_0_50px_rgba(220,38,38,0.2)] backdrop-blur-3xl"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
            <ShieldCheck className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Registration</h1>
          <p className="text-sm text-red-400 mt-2">Initialize new master account.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="System Administrator"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            />
            {errors.name ? <p className="text-sm text-red-400">{errors.name}</p> : null}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Admin Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@nexora.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            />
            {errors.email ? <p className="text-sm text-red-400">{errors.email}</p> : null}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Master Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create secure password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            />
            {errors.password ? <p className="text-sm text-red-400">{errors.password}</p> : null}
          </div>

          <div className="space-y-1">
            <label htmlFor="adminCode" className="block text-sm font-medium text-red-300">
              Security Registration Code
            </label>
            <input
              id="adminCode"
              name="adminCode"
              type="password"
              value={adminCode}
              onChange={(event) => setAdminCode(event.target.value)}
              placeholder="Required for admin role"
              className="w-full rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-white placeholder:text-red-900/50 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            />
            {errors.adminCode ? <p className="text-sm text-red-400">{errors.adminCode}</p> : null}
          </div>

          {errors.general && (
            <div className="rounded-xl bg-red-500/20 border border-red-500/40 p-3">
              <p className="text-sm text-red-100 text-center">{errors.general}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-red-500/30 transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Provisioning..." : "Create Admin Account"}
          </button>
        </form>

        <Link
          to="/admin/login"
          className="mt-6 inline-flex w-full justify-center text-center text-sm text-slate-400 font-medium transition duration-200 ease-out hover:text-red-400 active:scale-95"
        >
          Already have master access? Login
        </Link>
      </motion.div>
    </div>
  );
}
