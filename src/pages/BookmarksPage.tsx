import React, { useState, useMemo } from "react";
import {
  Bookmark,
  Search,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  Trash2,
  BookOpen,
  Sprout,
  Activity,
  Layers,
  FileCheck2,
  RefreshCw,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { useNavigation } from "@/context/NavigationContext";
import { motion, AnimatePresence } from "motion/react";

export interface BookmarkItem {
  id: string;
  title: string;
  type: "Articles" | "Myths" | "Research" | "Collections";
  category: string;
  readTime?: string;
  updated: string;
  savedDate: string;
  progress?: number;
  evidenceStrength?: 1 | 2 | 3 | 4 | 5;
  evidenceSource?: string;
  verdict?: string;
  confidence?: string;
  itemsCount?: number;
  snippet: string;
  slug: string;
}

const initialBookmarks: BookmarkItem[] = [
  {
    id: "bm-1",
    title: "The Neuroendocrine Axis: How Stress, Cortisol, and Progesterone Intersect",
    type: "Articles",
    category: "Endocrine Science",
    readTime: "8 min read",
    updated: "Feb 2026",
    savedDate: "2026-02-18",
    progress: 65,
    evidenceStrength: 5,
    evidenceSource: "Systematic Review",
    snippet: "Deep dive into how chronic HPA axis activation alters progesterone synthesis and luteal phase consistency.",
    slug: "does-lemon-water-delay-periods",
  },
  {
    id: "bm-2",
    title: "Does Drinking Lemon Water Delay Your Menstrual Period?",
    type: "Myths",
    category: "Fact Check",
    readTime: "3 min read",
    updated: "Feb 2026",
    savedDate: "2026-02-19",
    verdict: "FALSE",
    confidence: "96%",
    evidenceStrength: 5,
    evidenceSource: "ACOG & NIH Index",
    snippet: "Zero physiological mechanism exists for oral citric acid to alter uterine lining shedding or luteal phase timing.",
    slug: "lemon-water-delays-periods",
  },
  {
    id: "bm-3",
    title: "Polycystic Ovary Syndrome (PCOS) Diagnostic & Treatment Hub",
    type: "Collections",
    category: "Condition Hub",
    updated: "Jan 2026",
    savedDate: "2026-02-15",
    itemsCount: 86,
    snippet: "Rotterdam diagnostic criteria, insulin sensitivity management, and inositol clinical trials.",
    slug: "pcos",
  },
  {
    id: "bm-4",
    title: "Continuous Glucose Monitoring in Non-Diabetic Women with PCOS",
    type: "Research",
    category: "Metabolic Health",
    readTime: "6 min read",
    updated: "Jan 2026",
    savedDate: "2026-02-10",
    evidenceStrength: 5,
    evidenceSource: "RCT Trial (N=1,420)",
    snippet: "Postprandial glucose variability correlates directly with androgen production in subclinical metabolic shifts.",
    slug: "does-lemon-water-delay-periods",
  },
  {
    id: "bm-5",
    title: "Does Cold Water Cause Severe Menstrual Cramps?",
    type: "Myths",
    category: "Fact Check",
    readTime: "4 min read",
    updated: "Feb 2026",
    savedDate: "2026-02-12",
    verdict: "FALSE",
    confidence: "94%",
    evidenceStrength: 4,
    evidenceSource: "PubMed Synthesis",
    snippet: "Gastric fluid temperature has no vascular or neural connection to uterine smooth muscle contractions.",
    slug: "lemon-water-delays-periods",
  },
  {
    id: "bm-6",
    title: "Iron Deficiency Anemia vs. Ferritin Depletion in Active Women",
    type: "Articles",
    category: "Hematology & Nutrition",
    readTime: "5 min read",
    updated: "Jan 2026",
    savedDate: "2026-02-05",
    evidenceStrength: 5,
    evidenceSource: "Lancet Haematology",
    snippet: "Why normal hemoglobin levels can mask low iron storage, leading to fatigue and brain fog.",
    slug: "does-lemon-water-delay-periods",
  },
];

type FilterType = "All" | "Articles" | "Myths" | "Research" | "Collections";
type SortType = "Recently Saved" | "Recently Updated" | "Alphabetical";

export function BookmarksPage() {
  const { navigate } = useNavigation();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(initialBookmarks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [sortBy, setSortBy] = useState<SortType>("Recently Saved");

  const removeBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  // Filter & Sort Logic
  const processedBookmarks = useMemo(() => {
    return bookmarks
      .filter((item) => {
        const matchesFilter = activeFilter === "All" || item.type === activeFilter;
        const matchesSearch =
          searchQuery.trim() === "" ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "Recently Saved") {
          return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
        }
        if (sortBy === "Recently Updated") {
          return a.updated.localeCompare(b.updated);
        }
        return a.title.localeCompare(b.title);
      });
  }, [bookmarks, searchQuery, activeFilter, sortBy]);

  // Find most recent unfinished item for "Continue Reading" section
  const unfinishedItem = useMemo(() => {
    return bookmarks.find((b) => b.progress && b.progress > 0 && b.progress < 100);
  }, [bookmarks]);

  return (
    <div className="min-h-screen bg-[#FCF8F4] text-t-primary pt-[110px] pb-[140px] selection:bg-rose/20 relative">
      {/* Background Paper Texture & Subtle Watermark */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none -z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1280 1200" fill="none" stroke="#2C2623" strokeWidth="0.8">
          <path d="M 100 150 C 200 300, 300 450, 150 600 M 1120 180 C 1040 380, 1150 650, 1020 900" strokeDasharray="4 4" />
          <text x="105" y="140" fontSize="10" fontFamily="serif" fill="#2C2623">PERSONAL KNOWLEDGE CORPUS — SAVED ENTRIES</text>
        </svg>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-[32px] space-y-[64px]">
        {/* 1. Hero */}
        <header className="text-center max-w-[760px] mx-auto pt-[24px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F1EB] border border-[#E5DCD3] text-t-muted text-[13px] font-mono uppercase tracking-widest mb-[20px]">
            <Bookmark className="w-3.5 h-3.5 text-rose fill-rose/20" />
            Personal Library & Journal &middot; {bookmarks.length} Saved Entries
          </div>

          <h1 className="font-serif text-[48px] md:text-[64px] font-semibold text-t-primary leading-[1.1] mb-[18px] tracking-tight">
            Bookmarks
          </h1>

          <p className="text-[18px] md:text-[20px] text-t-secondary leading-[1.6] font-light max-w-[620px] mx-auto">
            Your personal library of evidence-based knowledge, curated studies, and medical myth verdicts.
          </p>
        </header>

        {/* 4. Continue Reading (Top Featured Item) */}
        {unfinishedItem && (
          <section className="max-w-[1000px] mx-auto">
            <div className="p-8 md:p-10 rounded-[32px] bg-[#F7F1EB] border-2 border-[#D6B46D]/60 shadow-[0_8px_32px_rgba(44,38,35,0.05)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_14px_44px_rgba(44,38,35,0.08)] group">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="text-[12px] font-mono font-semibold uppercase tracking-widest text-rose bg-rose/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose" />
                  Continue Reading
                </span>
                <span className="text-[13px] text-t-muted font-medium">
                  Opened 2 days ago &middot; {unfinishedItem.readTime}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <h2 className="font-serif text-[28px] md:text-[34px] font-semibold text-t-primary leading-tight group-hover:text-rose transition-colors">
                  {unfinishedItem.title}
                </h2>
                <p className="text-[16px] text-t-secondary leading-relaxed max-w-[780px]">
                  {unfinishedItem.snippet}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E5DCD3]">
                <div className="flex items-center justify-between text-[13px] font-medium text-t-muted">
                  <span>Reading Progress</span>
                  <span className="font-mono text-t-primary">{unfinishedItem.progress}% Completed</span>
                </div>
                <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose transition-all duration-500 ease-out"
                    style={{ width: `${unfinishedItem.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-t-muted font-mono">
                    Category: {unfinishedItem.category}
                  </div>
                  <Button
                    size="lg"
                    onClick={() => navigate(`/articles/${unfinishedItem.slug}`)}
                    className="px-6 h-[48px]"
                  >
                    Resume Reading <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2 & 3. Search Bar, Filter Chips & Sorting */}
        <section className="max-w-[1000px] mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex items-center w-full bg-[#F7F1EB] border border-[#E5DCD3] rounded-[22px] shadow-sm p-2 focus-within:ring-2 focus-within:ring-rose/30 focus-within:border-rose transition-all">
              <div className="pl-3.5 pr-2 text-t-muted">
                <Search className="w-5 h-5 stroke-[1.8]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your saved articles..."
                className="w-full h-[44px] bg-transparent outline-none text-t-primary text-[16px] placeholder:text-t-muted/80 font-normal pr-4"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-t-muted hover:text-t-primary px-2.5 py-1 bg-black/5 rounded-full mr-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="relative shrink-0 w-full sm:w-auto">
              <div className="flex items-center gap-2 px-4 py-3 rounded-[22px] bg-[#F7F1EB] border border-[#E5DCD3] text-[14px] text-t-secondary font-medium">
                <SlidersHorizontal className="w-4 h-4 text-t-muted" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="bg-transparent text-t-primary font-semibold outline-none cursor-pointer"
                >
                  <option value="Recently Saved">Recently Saved</option>
                  <option value="Recently Updated">Recently Updated</option>
                  <option value="Alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {(["All", "Articles", "Myths", "Research", "Collections"] as FilterType[]).map((chip) => {
              const isActive = activeFilter === chip;
              const count =
                chip === "All"
                  ? bookmarks.length
                  : bookmarks.filter((b) => b.type === chip).length;

              return (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#2C2623] text-white shadow-sm font-semibold"
                      : "bg-[#F7F1EB] border border-[#E5DCD3] text-t-secondary hover:border-[#D6B46D] hover:bg-[#FAF4EE] hover:text-t-primary"
                  }`}
                >
                  <span>{chip}</span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-black/5 text-t-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 5, 6, 7. Saved Items Content Grid */}
        <section className="max-w-[1000px] mx-auto">
          {processedBookmarks.length === 0 ? (
            /* 9. Empty State */
            <div className="p-16 text-center rounded-[32px] bg-[#F7F1EB] border border-[#E5DCD3] space-y-6 max-w-[640px] mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-[#FFF8F3] border border-[#E5DCD3] flex items-center justify-center text-t-muted mx-auto shadow-xs">
                <Bookmark className="w-8 h-8 stroke-[1.2] text-rose" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-[26px] font-semibold text-t-primary">
                  {bookmarks.length === 0 ? "Your library is currently empty" : "No saved items found"}
                </h3>
                <p className="text-[16px] text-t-secondary leading-relaxed max-w-[480px] mx-auto">
                  {bookmarks.length === 0
                    ? "Bookmark articles, clinical trial reviews, and myth verdicts across Vera to build your personalized medical research journal."
                    : `No bookmarks match "${searchQuery}" under "${activeFilter}". Try clearing your filter or search query.`}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {bookmarks.length === 0 ? (
                  <Button size="lg" onClick={() => navigate("/explore")}>
                    Explore Library <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("All");
                    }}
                  >
                    Reset Search & Filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {processedBookmarks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => {
                      if (item.type === "Myths") {
                        navigate(`/myths/${item.slug}`);
                      } else if (item.type === "Collections") {
                        navigate(`/topics/${item.slug}`);
                      } else {
                        navigate(`/articles/${item.slug}`);
                      }
                    }}
                    className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-[0_4px_20px_rgba(44,38,35,0.03)] hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:shadow-[0_10px_30px_rgba(44,38,35,0.07)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between relative"
                  >
                    <div>
                      {/* Item Top Bar */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              item.type === "Myths"
                                ? "bg-rose/15 text-rose"
                                : item.type === "Collections"
                                ? "bg-[#D6B46D]/20 text-[#8C6D2B]"
                                : "bg-sage/15 text-sage"
                            }`}
                          >
                            {item.type === "Myths" ? `VERDICT: ${item.verdict}` : item.type}
                          </span>
                          <span className="text-[12px] text-t-muted font-medium">
                            {item.category}
                          </span>
                        </div>

                        {/* Remove Bookmark Action */}
                        <button
                          onClick={(e) => removeBookmark(item.id, e)}
                          title="Remove bookmark"
                          className="p-1.5 rounded-full text-t-muted hover:text-rose hover:bg-rose/10 transition-colors"
                        >
                          <Bookmark className="w-4 h-4 fill-rose text-rose" />
                        </button>
                      </div>

                      <h3 className="font-serif text-[22px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-3 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[14.5px] text-t-secondary leading-relaxed mb-6">
                        {item.snippet}
                      </p>
                    </div>

                    {/* Footer Details */}
                    <div className="space-y-3 pt-4 border-t border-[#E5DCD3]/60">
                      {item.evidenceStrength && (
                        <EvidenceDNA strength={item.evidenceStrength} source={item.evidenceSource || "Peer Reviewed"} />
                      )}

                      <div className="flex items-center justify-between text-[13px] text-t-muted pt-1">
                        <span>
                          {item.readTime ? item.readTime : `${item.itemsCount || 0} items`} &middot; Updated {item.updated}
                        </span>
                        <span className="text-rose font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {item.type === "Myths" ? "View Verdict" : item.type === "Collections" ? "Explore Hub" : "Read Article"} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
