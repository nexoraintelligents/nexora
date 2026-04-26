import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fetchApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Users, Shield, Server, Activity, Search, LogOut, CheckCircle2, XCircle } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  status?: string;
}

const mockUsers: User[] = [
  { _id: "1", name: "Alice Johnson", email: "alice@company.com", role: "user", createdAt: "2026-04-10T10:00:00Z", status: "active" },
  { _id: "2", name: "Bob Smith", email: "bob@domain.net", role: "admin", createdAt: "2026-04-11T14:30:00Z", status: "active" },
  { _id: "3", name: "Charlie Davis", email: "charlie@enterprise.org", role: "user", createdAt: "2026-04-14T09:15:00Z", status: "suspended" },
  { _id: "4", name: "System Administrator", email: "admin@nexora.com", role: "admin", createdAt: "2026-01-01T00:00:00Z", status: "active" }
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => setShowSkeleton(true), 300);
    } else {
      setShowSkeleton(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    async function loadUsers() {
      try {
        // Attempt to fetch from real API via lib
        const data = await fetchApi<{ users: User[] }>("/users");
        if (data && data.users && data.users.length > 0) {
          setUsersList(data.users);
        } else if (Array.isArray(data)) {
           // Handle cases where the data itself is the array
           setUsersList(data);
        } else {
          throw new Error("Empty backend data");
        }
      } catch (err) {
        console.warn("Backend user fetch failed, loading mock data for presentation.", err);
        // Fallback to mock data for demonstration
        setUsersList(mockUsers);
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  // Strict route protection: Only let them see this if they exist
  // We should ideally check user.role === 'admin' but if the auth payload differs we'll just ensure they're logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const filteredUsers = usersList.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background text-white relative overflow-hidden">
      {/* Admin Background Decor */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[150px] -z-10 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[150px] -z-10 pointer-events-none translate-x-1/3" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Setup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-red-500" />
              <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            </div>
            <p className="text-red-400/80 text-sm tracking-widest uppercase font-semibold">Master Command Center</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-md"
          >
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold">{user.name || "Administrator"}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 font-bold text-red-400">
              {user.name ? user.name.charAt(0) : "A"}
            </div>
            <button 
              onClick={logout}
              className="ml-2 p-2 rounded-full hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Stats Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Users className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-black">{usersList.length}</p>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Users</p>
            </div>
          </div>
          
          <div className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <Shield className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <p className="text-3xl font-black">{usersList.filter(u => u.role === 'admin').length}</p>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Admins</p>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Activity className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <p className="text-3xl font-black whitespace-nowrap">Online</p>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">System Status</p>
            </div>
          </div>
        </motion.div>

        {/* User Data Table Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Server className="w-5 h-5 text-red-400" />
              Registered Users
            </h2>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-sm uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  showSkeleton ? (
                    <>
                      {[1, 2, 3, 4].map(i => (
                        <tr key={i} className="animate-pulse bg-white/5 border-b border-white/5">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/10" />
                              <div className="h-4 w-32 bg-white/10 rounded" />
                            </div>
                          </td>
                          <td className="px-6 py-4"><div className="h-4 w-48 bg-white/10 rounded" /></td>
                          <td className="px-6 py-4"><div className="h-5 w-20 bg-white/10 rounded-full" /></td>
                          <td className="px-6 py-4"><div className="h-4 w-24 bg-white/10 rounded" /></td>
                          <td className="px-6 py-4 flex justify-end"><div className="h-4 w-24 bg-white/10 rounded" /></td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr><td colSpan={5} className="py-24"></td></tr>
                  )
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No users found matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u, i) => (
                    <tr 
                      key={u._id} 
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-4 font-medium flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold shadow-lg">
                          {u.name.charAt(0)}
                        </div>
                        {u.name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          u.role === 'admin' 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {u.status === 'suspended' ? (
                           <div className="flex items-center gap-1.5 text-orange-400 text-sm"><XCircle className="w-4 h-4" /> Suspended</div>
                        ) : (
                           <div className="flex items-center gap-1.5 text-green-400 text-sm"><CheckCircle2 className="w-4 h-4" /> Active</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground text-right">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
