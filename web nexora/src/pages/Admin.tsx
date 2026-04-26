import { useState } from "react";
import { motion } from "motion/react";
import {
  LayoutDashboard, Users, FileText, DollarSign, Settings,
  TrendingUp, TrendingDown, Activity, Bell, Search, LogOut,
  Eye, MoreHorizontal, ArrowUpRight, Cpu, Shield, Zap,
  BarChart3, PieChart, Globe, ChevronDown, Menu, X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* ─── Mock Data ──────────────────────────────────────────────── */
const STATS = [
  { label: "Total Revenue", value: "$2.4M", change: "+18.2%", up: true, icon: DollarSign, color: "from-purple-500 to-violet-600" },
  { label: "Active Users", value: "14,832", change: "+9.1%", up: true, icon: Users, color: "from-blue-500 to-cyan-500" },
  { label: "API Calls Today", value: "9.7M", change: "+34.5%", up: true, icon: Activity, color: "from-emerald-500 to-teal-500" },
  { label: "Avg Latency", value: "87ms", change: "-12.4%", up: false, icon: Zap, color: "from-orange-500 to-amber-500" },
];

const RECENT_USERS = [
  { name: "Aryan Mehta", email: "aryan@acuity.io", plan: "Enterprise", status: "Active", joined: "Apr 15", avatar: "AM", grad: "from-purple-500 to-blue-500" },
  { name: "Priya Nair", email: "priya@wavelet.com", plan: "Pro", status: "Active", joined: "Apr 13", avatar: "PN", grad: "from-blue-500 to-cyan-500" },
  { name: "James Kwon", email: "james@fincorp.io", plan: "Enterprise", status: "Active", joined: "Apr 10", avatar: "JK", grad: "from-emerald-500 to-teal-500" },
  { name: "Sofia Torres", email: "sofia@datalab.ai", plan: "Starter", status: "Trial", joined: "Apr 9", avatar: "ST", grad: "from-violet-500 to-purple-500" },
  { name: "Dev Patel", email: "dev@novatech.in", plan: "Pro", status: "Active", joined: "Apr 7", avatar: "DP", grad: "from-orange-500 to-pink-500" },
  { name: "Lena Koch", email: "lena@securex.de", plan: "Enterprise", status: "Active", joined: "Apr 5", avatar: "LK", grad: "from-red-500 to-rose-500" },
];

const RECENT_ACTIVITY = [
  { action: "New Enterprise signup", user: "ClearPath Inc.", time: "2m ago", type: "signup" },
  { action: "Plan upgrade to Enterprise", user: "Priya Nair", time: "18m ago", type: "upgrade" },
  { action: "API limit increased", user: "Acuity Finance", time: "1h ago", type: "api" },
  { action: "Payment received", user: "WaveLet Corp.", time: "2h ago", type: "payment" },
  { action: "Support ticket resolved", user: "DataLab AI", time: "3h ago", type: "support" },
  { action: "New blog post published", user: "Admin", time: "5h ago", type: "blog" },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "Blog", icon: FileText, path: "/blog" },
  { label: "Revenue", icon: DollarSign, path: "/admin/revenue" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Security", icon: Shield, path: "/admin/security" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

/* ─── Bar Chart (pure CSS) ───────────────────────────────────── */
const CHART_DATA = [
  { month: "Oct", value: 65 }, { month: "Nov", value: 75 },
  { month: "Dec", value: 55 }, { month: "Jan", value: 80 },
  { month: "Feb", value: 70 }, { month: "Mar", value: 90 },
  { month: "Apr", value: 85 },
];

const TRAFFIC_DATA = [
  { label: "Organic", value: 42, color: "bg-purple-500" },
  { label: "Direct", value: 28, color: "bg-blue-500" },
  { label: "Referral", value: 18, color: "bg-cyan-500" },
  { label: "Social", value: 12, color: "bg-pink-500" },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">

      {/* ── Sidebar ──────────────────────────────── */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 z-40 flex flex-col border-r border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-xl"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
          <div className="w-10 h-10 shrink-0">
            <img src="/logo.png" alt="Nexora Logo" className="w-full h-full object-contain scale-[1.3]" />
          </div>
          <div>
            <p className="font-bold text-white text-sm tracking-tight">Nexora</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Admin Panel</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-muted-foreground hover:text-white lg:hidden">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label); if (item.path.startsWith("/blog") || item.path === "/") navigate(item.path); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeNav === item.label
                  ? "bg-gradient-to-r from-purple-600/30 to-blue-600/20 text-white border border-purple-500/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${activeNav === item.label ? "text-purple-400" : ""}`} />
              {item.label}
              {item.label === "Users" && (
                <span className="ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full border border-purple-500/20">14.8k</span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin user */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Admin</p>
              <p className="text-muted-foreground text-[10px] truncate">admin@nexora.ai</p>
            </div>
            <Link to="/" className="text-muted-foreground hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-white/50 dark:bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main Content ──────────────────────────── */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>

        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-xl">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users, plans, logs..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-[10px]">AD</div>
              <span className="text-white text-xs font-medium">Admin</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">

          {/* Page title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Welcome back, Admin. Here's what's happening with Nexora today.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 text-xs text-muted-foreground">
              <Globe className="w-3.5 h-3.5" />
              Live · Apr 18, 2026
            </div>
          </div>

          {/* ── Stat Cards ─────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative glass border border-white/10 rounded-2xl p-5 overflow-hidden group hover:border-white/20 transition-all"
              >
                <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity blur-xl`} />
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-muted-foreground text-xs mb-1">{s.label}</p>
                <p className="text-white text-2xl font-bold mb-1">{s.value}</p>
                <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-emerald-400" : "text-red-400"}`}>
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {s.change} <span className="text-muted-foreground font-normal ml-1">vs last month</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Charts Row ─────────────────────────── */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Revenue Bar Chart */}
            <div className="lg:col-span-2 glass border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold">Monthly Revenue</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">Last 7 months</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" /> +24.8%
                </div>
              </div>
              <div className="flex items-end gap-2 h-36">
                {CHART_DATA.map((d, i) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.value}%` }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-blue-500 relative group cursor-pointer"
                      style={{ height: `${d.value}%` }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/10 text-white text-[10px] px-1.5 py-0.5 rounded hidden group-hover:block whitespace-nowrap">
                        ${(d.value * 4).toFixed(0)}k
                      </div>
                    </motion.div>
                    <span className="text-muted-foreground text-[10px]">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Pie */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-white font-semibold">Traffic Sources</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">This month</p>
                </div>
                <PieChart className="w-4 h-4 text-muted-foreground" />
              </div>
              {/* Donut chart (CSS) */}
              <div className="flex items-center justify-center mb-5">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffffff08" strokeWidth="3" />
                    {/* Segments */}
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="3"
                      strokeDasharray="42 58" strokeDashoffset="0" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3"
                      strokeDasharray="28 72" strokeDashoffset="-42" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#06b6d4" strokeWidth="3"
                      strokeDasharray="18 82" strokeDashoffset="-70" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ec4899" strokeWidth="3"
                      strokeDasharray="12 88" strokeDashoffset="-88" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-white font-bold text-lg leading-none">100%</p>
                    <p className="text-muted-foreground text-[9px]">Total</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                {TRAFFIC_DATA.map((t) => (
                  <div key={t.label} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${t.color} shrink-0`} />
                    <span className="text-muted-foreground text-xs flex-1">{t.label}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <div className="h-1.5 rounded-full bg-white/5 flex-1">
                        <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.value}%` }} />
                      </div>
                      <span className="text-white text-xs font-medium w-6 text-right">{t.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Row ─────────────────────────── */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Users Table */}
            <div className="lg:col-span-2 glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h3 className="text-white font-semibold">Recent Users</h3>
                <button className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  View all <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-3 text-muted-foreground text-xs font-medium">User</th>
                      <th className="text-left px-4 py-3 text-muted-foreground text-xs font-medium">Plan</th>
                      <th className="text-left px-4 py-3 text-muted-foreground text-xs font-medium">Status</th>
                      <th className="text-left px-4 py-3 text-muted-foreground text-xs font-medium">Joined</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_USERS.map((u, i) => (
                      <motion.tr
                        key={u.email}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.06 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${u.grad} flex items-center justify-center text-white font-bold text-[10px] shrink-0`}>
                              {u.avatar}
                            </div>
                            <div>
                              <p className="text-white text-xs font-medium">{u.name}</p>
                              <p className="text-muted-foreground text-[10px]">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            u.plan === "Enterprise" ? "bg-purple-500/15 text-purple-300 border-purple-500/20" :
                            u.plan === "Pro" ? "bg-blue-500/15 text-blue-300 border-blue-500/20" :
                            "bg-white/5 text-muted-foreground border-white/10"
                          }`}>{u.plan}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-emerald-400" : "bg-amber-400"}`} />
                            <span className="text-xs text-muted-foreground">{u.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{u.joined}</td>
                        <td className="px-4 py-3">
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="glass border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <h3 className="text-white font-semibold">Recent Activity</h3>
                <Cpu className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="px-5 py-3 space-y-1 divide-y divide-white/5">
                {RECENT_ACTIVITY.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    className="flex items-start gap-3 py-3"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                      a.type === "signup" ? "bg-emerald-400" :
                      a.type === "upgrade" ? "bg-purple-400" :
                      a.type === "payment" ? "bg-blue-400" :
                      a.type === "api" ? "bg-cyan-400" :
                      a.type === "blog" ? "bg-pink-400" : "bg-amber-400"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{a.action}</p>
                      <p className="text-muted-foreground text-[10px]">{a.user}</p>
                    </div>
                    <span className="text-muted-foreground text-[10px] shrink-0">{a.time}</span>
                  </motion.div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-white/5">
                <button className="w-full flex items-center justify-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium py-1">
                  <Eye className="w-3.5 h-3.5" /> View full log
                </button>
              </div>
            </div>
          </div>

          {/* ── System Status ──────────────────────── */}
          <div className="glass border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">System Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "API Gateway", status: "Operational", pct: 99.98 },
                { label: "Neural Engine", status: "Operational", pct: 100 },
                { label: "Database Cluster", status: "Operational", pct: 99.94 },
                { label: "CDN Edge", status: "Degraded", pct: 97.2 },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <span className={`w-2 h-2 rounded-full ${s.status === "Operational" ? "bg-emerald-400" : "bg-amber-400"}`} />
                  </div>
                  <p className="text-white font-bold text-lg">{s.pct}%</p>
                  <p className={`text-xs font-medium ${s.status === "Operational" ? "text-emerald-400" : "text-amber-400"}`}>{s.status}</p>
                  <div className="mt-2 h-1 rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${s.status === "Operational" ? "bg-emerald-500" : "bg-amber-500"}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
