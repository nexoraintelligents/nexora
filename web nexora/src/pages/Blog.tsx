import { POSTS } from "./BlogPost";

const CATEGORIES = ["All", "AI & ML", "Analytics", "Engineering", "Product", "Case Studies"];

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, ArrowRight, ChevronRight, Search, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Component ─────────────────────────────────────────────── */
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const featured = POSTS[0];
  const rest = POSTS.slice(1).filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero Banner ─────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-700/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-6">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Nexora Blog</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-5 leading-[1]">
              Insights from the{" "}
              <span className="gradient-text">Intelligence Era</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Deep dives into AI, analytics, engineering, and the future of intelligent decision-making — straight from the Nexora team.
            </p>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass border border-white/10 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/60 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Post ────────────────────────── */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-purple-500 inline-block" /> Featured Story
          </p>
          <Link to={`/blog/${featured.id}`} className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer block">
            {/* BG image */}
            <div className="absolute inset-0">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/30 dark:from-black/95 dark:via-black/70 dark:to-black/30" />
            </div>

            <div className="relative z-10 p-8 md:p-14 grid md:grid-cols-2 gap-8 items-center min-h-[440px]">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${featured.tagColor}`}>
                    {featured.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-muted-foreground">
                    {featured.category}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-5 group-hover:text-purple-100 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-lg">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.readTime}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${featured.avatarGrad} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {featured.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{featured.author}</p>
                    <p className="text-muted-foreground text-xs">{featured.authorRole}</p>
                  </div>
                </div>
              </div>

              {/* Right CTA */}
              <div className="hidden md:flex flex-col items-end justify-end h-full">
                <button className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:-translate-y-1 duration-300 transition-transform shadow-xl shadow-purple-900/40">
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ── Category Filter ───────────────────────── */}
      <section className="container mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white shadow-lg shadow-purple-500/20"
                  : "glass border-white/10 text-muted-foreground hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Posts Grid ───────────────────────────── */}
      <section className="container mx-auto px-6 mb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {rest.length > 0 ? (
              rest.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                <Link
                  to={`/blog/${post.id}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 glass transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20 cursor-pointer h-full block"
                >
                  {/* Cover image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-600"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 dark:from-black/80 dark:via-black/20 to-transparent" />
                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${post.tagColor} backdrop-blur-sm`}>
                        {post.tag}
                      </span>
                    </div>
                    {/* Category */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/20 text-white/80 backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-purple-200 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.avatarGrad} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                          {post.avatar}
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold">{post.author}</p>
                          <div className="flex items-center gap-2 text-muted-foreground text-[10px]">
                            <span>{post.date}</span>
                            <span>·</span>
                            <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 text-muted-foreground">
                No articles found. Try a different search or category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Newsletter ───────────────────────────── */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-purple-600/20 blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl" />

          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-5">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Weekly Newsletter</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Stay ahead of the curve
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-base">
              Get the latest Nexora insights, product updates, and AI research delivered to your inbox every week. No spam, ever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full sm:flex-1 px-5 py-3.5 rounded-2xl glass border border-white/10 text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:border-purple-500/70 transition-colors"
              />
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:opacity-90 hover:-translate-y-1 duration-300 transition-all shadow-lg shadow-purple-900/40 whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Join 12,000+ engineers and analysts. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
