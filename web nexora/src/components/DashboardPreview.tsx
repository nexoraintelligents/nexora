import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1100 },
];

const barData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 99 },
];

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-gradient-to-b from-white/0 via-purple-500/5 to-white/0 dark:from-black/0 dark:via-purple-900/10 dark:to-black/0">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Command Center <span className="gradient-text">Intelligence</span></h2>
          <p className="text-muted-foreground">A unified view of your entire business ecosystem, powered by real-time AI.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto p-4 md:p-8 rounded-3xl glass border-white/5 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Revenue", value: "$1.2M", icon: DollarSign, trend: "+12.5%", color: "text-green-400" },
              { label: "Active Users", value: "45.2K", icon: Users, trend: "+8.2%", color: "text-blue-400" },
              { label: "Conversion", value: "3.4%", icon: Activity, trend: "+2.1%", color: "text-purple-400" },
              { label: "Growth Score", value: "94/100", icon: TrendingUp, trend: "+5.0%", color: "text-orange-400" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white/5 border-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-[10px] font-bold text-green-400">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2 bg-white/5 border-white/5">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Revenue Growth
                  <Badge variant="outline" className="text-[10px] bg-purple-500/10 border-purple-500/20">Real-time</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#000", border: "1px solid #ffffff10", borderRadius: "8px", fontSize: "12px" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-white/5 border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Weekly Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> AI Insight
                </h4>
                <p className="text-xs text-purple-100/80 leading-relaxed">
                  "Based on current trends, scaling ad spend by 15% in the APAC region will likely yield a 2.4x ROI increase next quarter."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
