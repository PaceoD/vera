import React, { useState } from "react";
import {
  User,
  BookOpen,
  Bookmark,
  FileText,
  Flame,
  Award,
  Settings,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Bell,
  Eye,
  Download,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  FileCheck2,
  Sun,
  Activity,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { useNavigation } from "@/context/NavigationContext";
import { motion, AnimatePresence } from "motion/react";

// User Profile State
const userProfile = {
  name: "Dr. Sarah Jenkins",
  role: "Health & Science Researcher",
  memberSince: "Member since Jan 2026",
  avatarUrl: "", // Initials fallback
  email: "sarah.jenkins@verahealth.org",
};

// Quick Stats
const quickStats = [
  { label: "Articles Read", value: "48", icon: BookOpen, sub: "+6 this week" },
  { label: "Saved Bookmarks", value: "16", icon: Bookmark, sub: "Across 4 collections" },
  { label: "Research Papers", value: "32", icon: FileText, sub: "Level 1 Systematic Reviews" },
  { label: "Learning Streak", value: "14 Days", icon: Flame, sub: "Personal record!" },
];

// Continue Reading Item
const continueReadingItem = {
  title: "The Neuroendocrine Axis: How Stress, Cortisol, and Progesterone Intersect",
  category: "Endocrine Science",
  readTime: "8 min read",
  timeLeft: "3 min left",
  progress: 65,
  updated: "Feb 2026",
  slug: "does-lemon-water-delay-periods",
};

// Bookmarks Categories Data
const savedArticles = [
  {
    title: "Iron Deficiency Anemia vs. Ferritin Depletion in Active Women",
    category: "Hematology",
    readTime: "5 min read",
    strength: 5 as const,
    source: "Lancet Haematology",
    slug: "does-lemon-water-delay-periods",
  },
  {
    title: "Understanding Anovulatory Cycles in Early Perimenopause",
    category: "Reproductive Health",
    readTime: "6 min read",
    strength: 5 as const,
    source: "ACOG Clinical Bulletin",
    slug: "does-lemon-water-delay-periods",
  },
];

const savedMyths = [
  {
    title: "Does Drinking Lemon Water Delay Your Menstrual Period?",
    verdict: "FALSE",
    confidence: "96%",
    strength: 5 as const,
    source: "ACOG & NIH Index",
    slug: "lemon-water-delays-periods",
  },
  {
    title: "Does Cold Water Cause Severe Menstrual Cramps?",
    verdict: "FALSE",
    confidence: "94%",
    strength: 4 as const,
    source: "PubMed Central",
    slug: "lemon-water-delays-periods",
  },
];

const savedCollections = [
  {
    name: "Polycystic Ovary Syndrome (PCOS) Hub",
    itemsCount: 86,
    desc: "Rotterdam diagnostic criteria, insulin resistance, and RCTs.",
    slug: "pcos",
  },
  {
    name: "Evidence Collections & Editor's Picks",
    itemsCount: 24,
    desc: "Hand-curated reference sets designed for scientific research.",
    slug: "pcos",
  },
];

// Reading History Timeline
const readingHistory = [
  {
    date: "Today, Feb 2026",
    items: [
      {
        title: "Does Drinking Lemon Water Delay Your Menstrual Period?",
        type: "Myth Fact Check",
        time: "10:14 AM",
        slug: "lemon-water-delays-periods",
      },
      {
        title: "The Neuroendocrine Axis: How Stress & Cortisol Intersect",
        type: "Article Guide",
        time: "8:30 AM",
        slug: "does-lemon-water-delay-periods",
      },
    ],
  },
  {
    date: "Yesterday",
    items: [
      {
        title: "Polycystic Ovary Syndrome (PCOS) Diagnostic Hub",
        type: "Topic Hub",
        time: "4:45 PM",
        slug: "pcos",
      },
    ],
  },
  {
    date: "Feb 17, 2026",
    items: [
      {
        title: "Vitamin D & Ovarian Reserve Correlation Study",
        type: "Research Paper",
        time: "2:15 PM",
        slug: "does-lemon-water-delay-periods",
      },
    ],
  },
];

// Achievements & Milestones
const achievements = [
  {
    title: "First Article Read",
    desc: "Started your evidence-based health journey.",
    date: "Unlocked Jan 15",
    icon: CheckCircle2,
    badgeColor: "bg-sage/15 text-sage",
  },
  {
    title: "Evidence Explorer",
    desc: "Viewed 25+ Level 1 Systematic Reviews.",
    date: "Unlocked Feb 2",
    icon: Sparkles,
    badgeColor: "bg-rose/15 text-rose",
  },
  {
    title: "7-Day Learning Streak",
    desc: "Maintained a consistent daily reading habit.",
    date: "Unlocked Feb 10",
    icon: Flame,
    badgeColor: "bg-[#D6B46D]/20 text-[#8C6D2B]",
  },
  {
    title: "50 Articles Milestone",
    desc: "Deep health literacy progression (48/50 Completed).",
    date: "In Progress (96%)",
    icon: Award,
    badgeColor: "bg-[#8A71B5]/15 text-[#8A71B5]",
  },
];

interface ProfilePageProps {
  defaultTab?: "overview" | "bookmarks" | "history" | "achievements" | "settings";
}

export function ProfilePage({ defaultTab = "overview" }: ProfilePageProps) {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<"overview" | "bookmarks" | "history" | "achievements" | "settings">(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("mybookmarks") || path.startsWith("/bookmarks") || window.location.hash === "#bookmarks") {
      return "bookmarks";
    }
    return defaultTab;
  });
  const [activeBookmarkTab, setActiveBookmarkTab] = useState<"articles" | "myths" | "collections">("articles");
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleTabChange = (tabId: "overview" | "bookmarks" | "history" | "achievements" | "settings") => {
    setActiveTab(tabId);
    try {
      if (tabId === "bookmarks") {
        window.history.pushState({}, "", "/profile/MyBookmarks");
      } else {
        window.history.pushState({}, "", "/profile");
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F4] text-t-primary pt-[110px] pb-[140px] selection:bg-rose/20 relative">
      {/* Background Paper Texture & Subtle Watermark */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none -z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1280 1400" fill="none" stroke="#2C2623" strokeWidth="0.8">
          <path d="M 140 160 C 240 320, 320 480, 180 640 M 1100 220 C 1020 420, 1150 700, 1020 950" strokeDasharray="4 4" />
          <text x="145" y="150" fontSize="10" fontFamily="serif" fill="#2C2623">VERA LEARNING DASHBOARD — PERSONAL LIBRARY CORPUS</text>
        </svg>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-[32px] space-y-[48px]">
        {/* 1. Profile Header */}
        <header className="p-8 md:p-10 rounded-[36px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-[0_8px_32px_rgba(44,38,35,0.04)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#2C2623] text-white flex items-center justify-center font-serif text-[32px] font-semibold shadow-md border-2 border-[#D6B46D]/60 shrink-0">
              SJ
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-[32px] md:text-[38px] font-semibold text-t-primary leading-none">
                  {userProfile.name}
                </h1>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose bg-rose/10 px-2.5 py-0.5 rounded-full font-semibold">
                  Verified Scholar
                </span>
              </div>
              <p className="text-[15px] text-t-secondary">
                {userProfile.role} &middot; <span className="text-t-muted font-mono">{userProfile.memberSince}</span>
              </p>
              <p className="text-[14px] text-t-muted italic pt-0.5">
                "Welcome back to your evidence-based health knowledge library."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <Button
              variant="secondary"
              onClick={() => setActiveTab("settings")}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-rose hover:bg-rose/10"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* 2. Primary Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5DCD3] pb-1 overflow-x-auto">
          {[
            { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
            { id: "bookmarks", label: "My Bookmarks (16)", icon: Bookmark },
            { id: "history", label: "Reading History", icon: Clock },
            { id: "achievements", label: "Milestones", icon: Award },
            { id: "settings", label: "Account Settings", icon: Settings },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`px-5 py-3 rounded-2xl text-[14px] font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#2C2623] text-white shadow-sm font-semibold"
                    : "text-t-secondary hover:bg-[#F7F1EB] hover:text-t-primary"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-[48px]">
            {/* Quick Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {quickStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[24px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] font-medium text-t-muted uppercase tracking-wider">{stat.label}</span>
                    <div className="w-9 h-9 rounded-full bg-[#FFF8F3] border border-[#E5DCD3] flex items-center justify-center text-t-primary">
                      <stat.icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                  </div>

                  <div>
                    <div className="font-serif text-[36px] font-semibold text-t-primary leading-none mb-2">
                      {stat.value}
                    </div>
                    <span className="text-[12px] font-mono text-sage font-medium">{stat.sub}</span>
                  </div>
                </div>
              ))}
            </section>

            {/* 3. Continue Reading */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-rose" />
                  <h2 className="font-serif text-[28px] font-semibold text-t-primary">
                    Continue Reading
                  </h2>
                </div>
                <span className="text-[13px] text-t-muted">Recently Opened Guide</span>
              </div>

              <div className="p-8 rounded-[32px] bg-[#F7F1EB] border-2 border-[#D6B46D]/60 shadow-[0_8px_32px_rgba(44,38,35,0.04)] hover:shadow-[0_12px_40px_rgba(44,38,35,0.07)] transition-all group">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-rose bg-rose/10 px-3 py-1 rounded-full">
                    {continueReadingItem.category}
                  </span>
                  <span className="text-[13px] text-t-muted font-medium">
                    {continueReadingItem.readTime} &middot; {continueReadingItem.timeLeft}
                  </span>
                </div>

                <h3 className="font-serif text-[26px] md:text-[30px] font-semibold text-t-primary leading-snug group-hover:text-rose transition-colors mb-3">
                  {continueReadingItem.title}
                </h3>

                <div className="space-y-3 pt-4 border-t border-[#E5DCD3]">
                  <div className="flex items-center justify-between text-[13px] font-medium text-t-muted">
                    <span>Reading Progress</span>
                    <span className="font-mono text-t-primary">{continueReadingItem.progress}% Completed</span>
                  </div>
                  <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose transition-all duration-300"
                      style={{ width: `${continueReadingItem.progress}%` }}
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button size="lg" onClick={() => navigate(`/articles/${continueReadingItem.slug}`)} className="px-6 h-[46px]">
                      Resume Reading <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Bookmarks Preview */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-[28px] font-semibold text-t-primary">
                  Recent Saved Bookmarks
                </h2>
                <button
                  onClick={() => setActiveTab("bookmarks")}
                  className="text-xs text-rose font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  View All Bookmarks (16) <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {savedArticles.map((art, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/articles/${art.slug}`)}
                    className="p-6 rounded-[24px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose font-semibold bg-rose/10 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                        {art.category}
                      </span>
                      <h4 className="font-serif text-[20px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-2 leading-snug">
                        {art.title}
                      </h4>
                    </div>
                    <div className="pt-3 border-t border-[#E5DCD3]/60 text-[13px] text-t-muted flex items-center justify-between">
                      <span>{art.readTime}</span>
                      <span className="text-rose font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Bookmarks */}
        {activeTab === "bookmarks" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Saved Bookmarks Library
              </h2>

              <div className="flex items-center gap-2 bg-[#F7F1EB] p-1 rounded-2xl border border-[#E5DCD3]">
                <button
                  onClick={() => setActiveBookmarkTab("articles")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeBookmarkTab === "articles" ? "bg-[#2C2623] text-white" : "text-t-secondary hover:text-t-primary"
                  }`}
                >
                  Saved Articles (8)
                </button>
                <button
                  onClick={() => setActiveBookmarkTab("myths")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeBookmarkTab === "myths" ? "bg-[#2C2623] text-white" : "text-t-secondary hover:text-t-primary"
                  }`}
                >
                  Myth Verdicts (4)
                </button>
                <button
                  onClick={() => setActiveBookmarkTab("collections")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeBookmarkTab === "collections" ? "bg-[#2C2623] text-white" : "text-t-secondary hover:text-t-primary"
                  }`}
                >
                  Collections (4)
                </button>
              </div>
            </div>

            {activeBookmarkTab === "articles" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedArticles.map((art, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/articles/${art.slug}`)}
                    className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose font-semibold bg-rose/10 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                        {art.category}
                      </span>
                      <h3 className="font-serif text-[22px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-3 leading-snug">
                        {art.title}
                      </h3>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-[#E5DCD3]/60">
                      <EvidenceDNA strength={art.strength} source={art.source} />
                      <div className="flex items-center justify-between text-[13px] text-t-muted">
                        <span>{art.readTime}</span>
                        <span className="text-rose font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Guide <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeBookmarkTab === "myths" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedMyths.map((m, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/myths/${m.slug}`)}
                    className="p-7 rounded-[28px] bg-[#F7F1EB] border-2 border-[#D6B46D]/40 shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D] hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-semibold uppercase bg-rose/15 text-rose px-3 py-1 rounded-full mb-3 inline-block">
                        VERDICT: {m.verdict} ({m.confidence})
                      </span>
                      <h3 className="font-serif text-[22px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-3 leading-snug">
                        "{m.title}"
                      </h3>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-[#E5DCD3]/60">
                      <EvidenceDNA strength={m.strength} source={m.source} />
                      <div className="flex items-center justify-between text-[13px] text-rose font-semibold">
                        <span>View Verdict Breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeBookmarkTab === "collections" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedCollections.map((col, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/topics/${col.slug}`)}
                    className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif text-[24px] font-semibold text-t-primary group-hover:text-rose transition-colors">
                          {col.name}
                        </h3>
                        <span className="text-xs font-mono text-t-muted bg-[#FFF8F3] px-2.5 py-1 rounded-full border border-[#E5DCD3]">
                          {col.itemsCount} items
                        </span>
                      </div>
                      <p className="text-[14px] text-t-secondary leading-relaxed mb-4">
                        {col.desc}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#E5DCD3]/60 text-[13px] text-rose font-semibold flex items-center justify-between">
                      <span>Explore Topic Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Reading History Timeline */}
        {activeTab === "history" && (
          <div className="space-y-6 max-w-[800px]">
            <h2 className="font-serif text-[32px] font-semibold text-t-primary">
              Reading History Timeline
            </h2>

            <div className="space-y-8 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E5DCD3]">
              {readingHistory.map((group, idx) => (
                <div key={idx} className="relative pl-10 space-y-3">
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-rose border-2 border-[#FCF8F4]" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-t-muted">
                    {group.date}
                  </span>

                  <div className="space-y-3">
                    {group.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        onClick={() => navigate(`/articles/${item.slug}`)}
                        className="p-5 rounded-2xl bg-[#F7F1EB] border border-[#E5DCD3] hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-[11px] font-mono text-rose font-semibold uppercase tracking-wider">
                            {item.type}
                          </span>
                          <h4 className="font-serif text-[18px] font-semibold text-t-primary group-hover:text-rose transition-colors">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-t-muted shrink-0 ml-4">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Achievements & Milestones */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <h2 className="font-serif text-[32px] font-semibold text-t-primary">
              Learning Milestones & Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm flex items-start gap-5"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${ach.badgeColor}`}>
                    <ach.icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-[20px] font-semibold text-t-primary">
                        {ach.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-t-secondary leading-relaxed">
                      {ach.desc}
                    </p>
                    <span className="text-xs font-mono text-t-muted pt-2 inline-block font-semibold">
                      {ach.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Account Settings */}
        {activeTab === "settings" && (
          <div className="space-y-8 max-w-[800px]">
            <h2 className="font-serif text-[32px] font-semibold text-t-primary">
              Account Settings & Preferences
            </h2>

            <div className="space-y-6">
              {/* Profile Details */}
              <div className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] space-y-4">
                <h3 className="font-serif text-[22px] font-semibold text-t-primary flex items-center gap-2">
                  <User className="w-5 h-5 text-rose" /> Profile Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-xs text-t-muted font-mono uppercase">Full Name</label>
                    <input
                      type="text"
                      defaultValue={userProfile.name}
                      className="w-full mt-1 p-3 rounded-xl bg-[#FFF8F3] border border-[#E5DCD3] text-t-primary outline-none focus:border-rose"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-t-muted font-mono uppercase">Email Address</label>
                    <input
                      type="email"
                      defaultValue={userProfile.email}
                      className="w-full mt-1 p-3 rounded-xl bg-[#FFF8F3] border border-[#E5DCD3] text-t-primary outline-none focus:border-rose"
                    />
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] space-y-4">
                <h3 className="font-serif text-[22px] font-semibold text-t-primary flex items-center gap-2">
                  <Bell className="w-5 h-5 text-rose" /> Dispatch & Notifications
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-t-primary">Monthly Research Dispatch</div>
                    <div className="text-xs text-t-muted">Receive peer-reviewed paper syntheses once per month.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.checked)}
                    className="w-5 h-5 accent-rose cursor-pointer"
                  />
                </div>
              </div>

              {/* Privacy & Download */}
              <div className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] space-y-4">
                <h3 className="font-serif text-[22px] font-semibold text-t-primary flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-rose" /> Privacy & Data Export
                </h3>
                <p className="text-xs text-t-secondary leading-relaxed">
                  Your reading history and saved bookmarks are stored securely and never shared with third parties.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download Personal Archive (JSON)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper icon
import { LayoutDashboard } from "lucide-react";
