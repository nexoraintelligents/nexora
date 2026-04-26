import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight,
  BookOpen,
} from "lucide-react";

/* ─── Shared post data (single source of truth) ─────────────── */
export const POSTS = [
  {
    id: 1,
    title: "How Nexora's Neural Engine Processes 10M Data Points in Real-Time",
    excerpt:
      "A deep-dive into the distributed inference architecture powering Nexora's sub-100ms decision pipeline — and why it changes everything for enterprise analytics.",
    category: "Engineering",
    author: "Aryan Mehta",
    authorRole: "Lead ML Engineer",
    authorBio:
      "Aryan leads the ML infrastructure team at Nexora, where he designs distributed inference systems capable of processing billions of events per day. Previously at Google Brain and DeepMind.",
    avatar: "AM",
    avatarGrad: "from-purple-500 to-blue-500",
    date: "Apr 15, 2026",
    readTime: "8 min read",
    image: "/blog-ai.png",
    featured: true,
    tag: "Deep Dive",
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    content: [
      {
        type: "lead",
        text: "When Nexora first set out to build a real-time decision engine, the engineering challenge wasn't just speed — it was maintaining accuracy at scale while keeping latency under 100 milliseconds.",
      },
      {
        type: "h2",
        text: "The Architecture Challenge",
      },
      {
        type: "p",
        text: "Traditional analytics pipelines were built batch-first. Data would arrive, be collected for minutes or hours, and then processed. By the time insights surfaced, the moment had passed. Nexora needed to flip this model entirely.",
      },
      {
        type: "p",
        text: "Our neural engine is built on a distributed streaming architecture where each data point is evaluated the moment it arrives. The system uses a three-tier approach: ingestion, inference, and emission, each running in independent clusters that can scale horizontally.",
      },
      {
        type: "h2",
        text: "The Inference Layer",
      },
      {
        type: "p",
        text: "At the heart of the system is our inference layer — a fleet of GPU-accelerated nodes running quantized transformer models. We use INT8 quantization to reduce model size by 4× without any measurable accuracy loss, enabling us to fit 8 model replicas per GPU.",
      },
      {
        type: "callout",
        text: "At peak load during Q1 2026, the Nexora neural engine processed 10.4 million data points per second with a p99 latency of 87ms — a new internal benchmark.",
      },
      {
        type: "h2",
        text: "Handling Backpressure",
      },
      {
        type: "p",
        text: "One of the biggest challenges in streaming systems is backpressure — what happens when data arrives faster than it can be processed? We implemented an adaptive rate-limiting layer that dynamically adjusts the ingestion rate based on downstream queue depth, preventing cascade failures during traffic spikes.",
      },
      {
        type: "p",
        text: "We also use a priority queue system where business-critical signals are always processed first. Tier 1 events (payment transactions, fraud signals) get processed with strict SLA guarantees, while Tier 3 telemetry events are processed opportunistically.",
      },
      {
        type: "h2",
        text: "What This Means for Enterprise Customers",
      },
      {
        type: "p",
        text: "The implications are significant. Customers can now act on insights before the window closes. A retailer can adjust pricing in response to competitor changes in real-time. A financial firm can flag suspicious transactions before they clear. A logistics company can reroute shipments as conditions change.",
      },
      {
        type: "p",
        text: "This is the core promise of Nexora: not just faster analytics, but analytics that arrive while they're still actionable.",
      },
    ],
  },
  {
    id: 2,
    title: "Nexora Signal v2.0: What's New in Our Flagship Analytics Suite",
    excerpt:
      "From adaptive forecasting to anomaly detection at scale — here's every feature that shipped in the biggest release of the year.",
    category: "Product",
    author: "Priya Nair",
    authorRole: "Head of Product",
    authorBio:
      "Priya has led product strategy at Nexora for 3 years, shaping the vision for Signal and overseeing the launches of Nexora's core analytics features. Former PM at Stripe and Notion.",
    avatar: "PN",
    avatarGrad: "from-blue-500 to-cyan-500",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    image: "/blog-product.png",
    featured: false,
    tag: "Release",
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    content: [
      {
        type: "lead",
        text: "Signal v2.0 is the most significant release in Nexora's history. After 14 months of development, 3 design sprints, and feedback from 200+ enterprise customers, it's finally here.",
      },
      {
        type: "h2",
        text: "Adaptive Forecasting Engine",
      },
      {
        type: "p",
        text: "The headline feature of v2.0 is our new Adaptive Forecasting Engine. Unlike traditional time-series forecasting that uses fixed models, AFE continuously retrains on the last 30 days of your data, automatically adjusting for seasonality, trend shifts, and structural breaks in your business.",
      },
      {
        type: "callout",
        text: "In beta testing, AFE reduced forecast error by an average of 34% compared to static models — across all 47 beta customers.",
      },
      {
        type: "h2",
        text: "Anomaly Detection at Scale",
      },
      {
        type: "p",
        text: "Signal v2.0 ships a fully revamped anomaly detection module. The new system uses a multivariate approach, looking at correlated metrics simultaneously rather than in isolation — this dramatically reduces false positives that plagued the v1 alert system.",
      },
      {
        type: "h2",
        text: "Collaborative Dashboards",
      },
      {
        type: "p",
        text: "Teams can now annotate directly on charts, leave threaded comments on data points, and @mention colleagues. Combined with the new role-based sharing model, Signal v2.0 transforms dashboards from read-only reports into living, collaborative workspaces.",
      },
      {
        type: "h2",
        text: "What's Next",
      },
      {
        type: "p",
        text: "We're already working on v2.1, which will bring natural language querying to every dashboard — ask questions about your data in plain English and get instant answers. Stay tuned.",
      },
    ],
  },
  {
    id: 3,
    title: "From 3 Days to 12 Minutes: Acuity Finance Cuts Reporting with Nexora",
    excerpt:
      "A Fortune 500 financial firm replaced their entire legacy BI stack and eliminated manual reporting overnight.",
    category: "Case Studies",
    author: "James Kwon",
    authorRole: "Solutions Architect",
    authorBio:
      "James works with enterprise customers to design and deploy Nexora solutions. He has 10 years of experience in financial technology and data architecture.",
    avatar: "JK",
    avatarGrad: "from-emerald-500 to-teal-500",
    date: "Apr 5, 2026",
    readTime: "6 min read",
    image: "/blog-casestudy.png",
    featured: false,
    tag: "Case Study",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    content: [
      {
        type: "lead",
        text: "Acuity Finance is a $4.2B asset management firm with 1,400 employees across 8 countries. Before Nexora, their weekly portfolio risk report took a team of 6 analysts three full days to produce.",
      },
      {
        type: "h2",
        text: "The Problem",
      },
      {
        type: "p",
        text: "The risk reporting process was a patchwork of Excel models, manual data pulls from 11 different systems, and a Friday afternoon scramble to merge everything. Errors were frequent, revisions were constant, and by the time the report reached the investment committee, the data was already 72 hours old.",
      },
      {
        type: "callout",
        text: "\"We were making Monday decisions with Friday data. In volatile markets, that's not a gap — it's a chasm.\" — CIO, Acuity Finance",
      },
      {
        type: "h2",
        text: "The Nexora Deployment",
      },
      {
        type: "p",
        text: "Acuity deployed Nexora Signal over 6 weeks with a phased migration strategy. We connected to all 11 source systems via our pre-built connectors, established a unified data model, and rebuilt their risk dashboard as a live, auto-refreshing Signal workspace.",
      },
      {
        type: "h2",
        text: "The Results",
      },
      {
        type: "p",
        text: "The weekly risk report now generates in 12 minutes — automatically, every Monday at 7am, before the investment committee meeting. The 6 analysts who previously built the report now spend their time on analysis and strategy instead of data wrangling.",
      },
      {
        type: "p",
        text: "In the first quarter after deployment, Acuity identified a correlated risk exposure across three positions that would have been invisible under the old system. Early action saved an estimated $18M.",
      },
    ],
  },
  {
    id: 4,
    title: "The Ethics of Black-Box AI in High-Stakes Decision Making",
    excerpt:
      "As AI takes on mission-critical decisions, explainability is no longer optional. We explore how Nexora bakes transparency into every inference.",
    category: "AI & ML",
    author: "Sofia Torres",
    authorRole: "Research Lead",
    authorBio:
      "Sofia leads AI ethics and interpretability research at Nexora. She holds a PhD in Machine Learning from MIT and has published 14 papers on explainable AI.",
    avatar: "ST",
    avatarGrad: "from-violet-500 to-purple-500",
    date: "Mar 28, 2026",
    readTime: "10 min read",
    image: "/blog-ai.png",
    featured: false,
    tag: "Research",
    tagColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    content: [
      {
        type: "lead",
        text: "Every day, AI systems make decisions that affect people's lives — loan approvals, medical triage, hiring scores, fraud flags. The question of whether those systems can explain themselves is no longer academic.",
      },
      {
        type: "h2",
        text: "The Black-Box Problem",
      },
      {
        type: "p",
        text: "Modern deep learning models achieve remarkable accuracy by learning complex, non-linear patterns across millions of parameters. But this power comes at a cost: the reasoning behind each decision is opaque — even to the engineers who built the model.",
      },
      {
        type: "callout",
        text: "A model that's right 95% of the time but can't explain its decisions is not trustworthy for high-stakes applications. Correctness and explainability are both required.",
      },
      {
        type: "h2",
        text: "Nexora's Approach: Layered Explainability",
      },
      {
        type: "p",
        text: "We built explainability into Nexora at three levels. At the feature level, we use SHAP values to show which input features most influenced a decision. At the model level, we maintain parallel interpretable surrogates that approximate the main model's behavior. At the system level, we log every decision with a full audit trail.",
      },
      {
        type: "h2",
        text: "Regulatory Implications",
      },
      {
        type: "p",
        text: "The EU AI Act, now in force, mandates explainability for high-risk AI applications. Financial services, healthcare, and HR applications all fall under this umbrella. Nexora's explainability layer was designed with these requirements in mind, and we provide built-in compliance reports for all regulated use cases.",
      },
    ],
  },
  {
    id: 5,
    title: "Real-Time Dashboards That Scale: Lessons from 500M Events/Day",
    excerpt:
      "Building dashboards is easy. Keeping them fast under load is a different beast. Here's what we learned pushing Nexora to its limits.",
    category: "Analytics",
    author: "Dev Patel",
    authorRole: "Senior Engineer",
    authorBio:
      "Dev is a senior infrastructure engineer at Nexora focused on query performance and distributed systems. He was previously at Cloudflare and Databricks.",
    avatar: "DP",
    avatarGrad: "from-orange-500 to-pink-500",
    date: "Mar 20, 2026",
    readTime: "7 min read",
    image: "/blog-analytics.png",
    featured: false,
    tag: "Scalability",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    content: [
      {
        type: "lead",
        text: "When one of our customers started pushing 500 million events per day through their Nexora dashboard, we discovered things at that scale that simply don't appear in any benchmark.",
      },
      {
        type: "h2",
        text: "The Challenge of Live Aggregations",
      },
      {
        type: "p",
        text: "Most BI tools handle scale by pre-aggregating data. That works fine if your queries are predictable. But Nexora dashboards support ad-hoc exploration — users can slice any dimension at any time. Pre-aggregation can't cover the full query space.",
      },
      {
        type: "p",
        text: "Our solution was a hybrid: we pre-compute aggregations for the 50 most-queried dimension combinations (which we discover automatically through query analysis), and serve everything else through our vectorized query engine.",
      },
      {
        type: "callout",
        text: "After optimization, p50 query latency dropped from 4.2 seconds to 180ms. p99 went from 28 seconds to 1.4 seconds.",
      },
      {
        type: "h2",
        text: "Caching Strategy",
      },
      {
        type: "p",
        text: "We implemented a two-level cache: an in-memory LRU cache for hot queries and a Redis cluster for warm queries. Cache key design was critical — we hash the full logical query plan, not the raw SQL string, so semantically equivalent queries share cache entries.",
      },
      {
        type: "h2",
        text: "Lessons Learned",
      },
      {
        type: "p",
        text: "The biggest lesson: don't trust synthetic benchmarks. Real workloads have hotspots, skewed key distributions, and temporal patterns that no benchmark captures. The only way to build a system that scales is to instrument everything and let real traffic tell you where the bottlenecks are.",
      },
    ],
  },
  {
    id: 6,
    title: "Zero-Trust Data Pipelines: Securing Analytics at the Edge",
    excerpt:
      "How Nexora implements end-to-end encryption, audit trails, and RBAC without compromising pipeline throughput.",
    category: "Engineering",
    author: "Lena Koch",
    authorRole: "Security Engineer",
    authorBio:
      "Lena leads security engineering at Nexora, specializing in data pipeline security and compliance architecture. She holds CISSP and CISM certifications.",
    avatar: "LK",
    avatarGrad: "from-red-500 to-rose-500",
    date: "Mar 12, 2026",
    readTime: "9 min read",
    image: "/blog-security.png",
    featured: false,
    tag: "Security",
    tagColor: "bg-red-500/20 text-red-300 border-red-500/30",
    content: [
      {
        type: "lead",
        text: "In a zero-trust security model, no component trusts any other by default — not even components inside your own network. Applying this to a high-throughput analytics pipeline presents unique challenges.",
      },
      {
        type: "h2",
        text: "Why Zero-Trust for Analytics",
      },
      {
        type: "p",
        text: "Traditional perimeter security assumes that everything inside the network is safe. But data breaches increasingly come from within — compromised credentials, malicious insiders, or lateral movement from an initially small breach. Zero-trust eliminates the concept of a trusted interior.",
      },
      {
        type: "callout",
        text: "Nexora pipelines authenticate every inter-service call using mTLS with rotating certificates. No service trusts any other without cryptographic proof of identity.",
      },
      {
        type: "h2",
        text: "Encryption Without the Tax",
      },
      {
        type: "p",
        text: "The common objection to pervasive encryption in data pipelines is performance. We addressed this by using hardware-accelerated AES-256-GCM encryption via CPU AES-NI instructions, reducing the encryption overhead to under 2% of total pipeline throughput.",
      },
      {
        type: "h2",
        text: "Audit Trails and Compliance",
      },
      {
        type: "p",
        text: "Every query, every data access, every schema change is logged to an append-only audit ledger. These logs are cryptographically signed to prevent tampering and are automatically exported to customers' SIEM systems. Combined with our RBAC layer, we can answer exactly who accessed what data and when.",
      },
      {
        type: "h2",
        text: "The Performance Results",
      },
      {
        type: "p",
        text: "After full zero-trust implementation, our end-to-end pipeline latency increased by just 3.1ms — a negligible cost for the security guarantees provided. We now hold SOC 2 Type II, ISO 27001, and HIPAA compliance certifications.",
      },
    ],
  },
];

/* ─── Reading Progress Bar ──────────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ─── Content Renderer ──────────────────────────────────────── */
function ContentBlock({ block }: { block: { type: string; text: string } }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-10 border-l-2 border-purple-500 pl-6">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-5">{block.text}</h2>
      );
    case "p":
      return (
        <p className="text-muted-foreground leading-8 mb-6 text-base md:text-lg">{block.text}</p>
      );
    case "callout":
      return (
        <div className="my-8 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/30 border border-purple-500/30 rounded-2xl" />
          <div className="relative px-7 py-6">
            <p className="text-white text-lg font-medium leading-relaxed italic">"{block.text}"</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

/* ─── Main Component ────────────────────────────────────────── */
export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const post = POSTS.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
        <h1 className="text-4xl font-bold text-white">Article Not Found</h1>
        <p className="text-muted-foreground">This article doesn't exist or has been removed.</p>
        <Link to="/blog" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity">
          Back to Blog
        </Link>
      </div>
    );
  }

  const h2Sections = post.content.filter((b) => b.type === "h2").map((b) => b.text);
  const related = POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);
  const otherRelated = POSTS.filter((p) => p.id !== post.id && p.category !== post.category).slice(0, 2 - related.length);
  const relatedPosts = [...related, ...otherRelated].slice(0, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <ReadingProgress />

      <article ref={articleRef} className="min-h-screen bg-background text-foreground">
        {/* ── Hero Image ─────────────────────────────── */}
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

          {/* Back button */}
          <div className="absolute top-24 left-6 md:left-12 z-10">
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </button>
          </div>

          {/* Category + Tag */}
          <div className="absolute bottom-10 left-6 md:left-1/2 md:-translate-x-1/2 flex items-center gap-3 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${post.tagColor} backdrop-blur-sm`}>
              {post.tag}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/20 text-white/80 backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────── */}
        <div className="container mx-auto px-6 -mt-10 relative z-10">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_280px] gap-12">

            {/* Main content column */}
            <div>
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6"
              >
                {post.title}
              </motion.h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${post.avatarGrad} flex items-center justify-center text-white font-bold text-sm`}>
                    {post.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{post.author}</p>
                    <p className="text-muted-foreground text-xs">{post.authorRole}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{post.content.filter(b => b.type === "p" || b.type === "lead").length * 80} words</span>
              </div>

              {/* Article content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {post.content.map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </motion.div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground font-medium">Share this article:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-sky-400" /> Twitter
                </a>
                <a
                  href={`https://linkedin.com/shareArticle?title=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                </a>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
                >
                  <Link2 className="w-4 h-4 text-purple-400" />
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>

              {/* Author card */}
              <div className="mt-12 rounded-2xl overflow-hidden border border-white/10">
                <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600" />
                <div className="p-7 glass flex gap-5 items-start">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${post.avatarGrad} flex items-center justify-center text-white font-bold text-xl shrink-0`}>
                    {post.avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{post.author}</p>
                    <p className="text-purple-300 text-sm mb-3">{post.authorRole} at Nexora</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{post.authorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {/* Table of Contents */}
                {h2Sections.length > 0 && (
                  <div className="glass border border-white/10 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">In this article</p>
                    <ul className="space-y-2">
                      {h2Sections.map((section, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground hover:text-white cursor-pointer transition-colors group">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="leading-snug">{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Share */}
                <div className="glass border border-white/10 rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Share</p>
                  <div className="flex flex-col gap-2">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl glass border border-white/10 text-sm text-white hover:bg-white/10 transition-colors">
                      <Twitter className="w-4 h-4 text-sky-400" /> Share on Twitter
                    </a>
                    <a href={`https://linkedin.com/shareArticle?title=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl glass border border-white/10 text-sm text-white hover:bg-white/10 transition-colors">
                      <Linkedin className="w-4 h-4 text-blue-400" /> Share on LinkedIn
                    </a>
                    <button onClick={handleCopy}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl glass border border-white/10 text-sm text-white hover:bg-white/10 transition-colors">
                      <Link2 className="w-4 h-4 text-purple-400" /> {copied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* ── Related Posts ─────────────────────────── */}
          {relatedPosts.length > 0 && (
            <div className="max-w-6xl mx-auto mt-20 mb-16">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6 flex items-center gap-2">
                <span className="w-6 h-px bg-purple-500 inline-block" /> More to read
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/blog/${p.id}`}
                    className="group flex gap-5 glass border border-white/10 hover:border-white/25 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="flex flex-col justify-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${p.tagColor} mb-2 w-fit`}>
                        {p.tag}
                      </span>
                      <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-purple-200 transition-colors line-clamp-2 mb-2">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground text-xs flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {p.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
