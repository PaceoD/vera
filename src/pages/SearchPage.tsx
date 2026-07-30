import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FileText,
  BookOpen,
  SlidersHorizontal,
  Clock,
  Calendar,
  History,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { motion, AnimatePresence } from "motion/react";
import { useNavigation } from "@/context/NavigationContext";

// Mock Database of Scientific Corpus
export interface SearchItem {
  id: string;
  title: string;
  category: "Articles" | "Myths" | "Conditions" | "Symptoms" | "Research Papers" | "Collections";
  badge: string;
  strength: 1 | 2 | 3 | 4 | 5;
  source: string;
  readTime: string;
  updated: string;
  snippet: string;
  popularity: number; // for sorting
  dateTimestamp: number;
}

const mockSearchCorpus: SearchItem[] = [
  {
    id: "1",
    title: "PCOS & Insulin Resistance: Comprehensive Clinical Trial Review",
    category: "Conditions",
    badge: "Systematic Review",
    strength: 5,
    source: "ACOG & NIH Guidelines",
    readTime: "6 min read",
    updated: "Jan 2026",
    snippet: "Recent randomized controlled trials confirm that improving insulin sensitivity significantly regulates ovulation cycles and reduces androgen levels in PCOS patients.",
    popularity: 98,
    dateTimestamp: 1769731200000,
  },
  {
    id: "2",
    title: "Does Lemon Water Delay Periods? Clinical Evidence Breakdown",
    category: "Myths",
    badge: "Fact Check",
    strength: 5,
    source: "Peer-Reviewed Systematic Review",
    readTime: "3 min read",
    updated: "Feb 2026",
    snippet: "There is zero physiological mechanism by which citric acid delays uterine lining shedding. We evaluate the origin of this viral claim against endocrine data.",
    popularity: 95,
    dateTimestamp: 1772323200000,
  },
  {
    id: "3",
    title: "Perimenopause Brain Fog & Estrogen Receptor Modulation",
    category: "Symptoms",
    badge: "Cohort Study",
    strength: 4,
    source: "Journal of Endocrinology 2025",
    readTime: "5 min read",
    updated: "Dec 2025",
    snippet: "Neuroimaging studies demonstrate transient glucose metabolic shifts in the prefrontal cortex during perimenopausal estrogen fluctuations.",
    popularity: 88,
    dateTimestamp: 1767139200000,
  },
  {
    id: "4",
    title: "Magnesium Bioavailability for Primary Dysmenorrhea & Cramps",
    category: "Articles",
    badge: "RCT Meta-Analysis",
    strength: 4,
    source: "European Medical Journal",
    readTime: "4 min read",
    updated: "Jan 2026",
    snippet: "Daily magnesium glycinate supplementation inhibits prostaglandin F2α synthesis, significantly reducing smooth muscle contractions during menstruation.",
    popularity: 91,
    dateTimestamp: 1768867200000,
  },
  {
    id: "5",
    title: "Thyroid Autoimmunity & Ovarian Reserve Indicators",
    category: "Research Papers",
    badge: "Endocrine Review",
    strength: 5,
    source: "The Lancet Diabetes & Endocrinology",
    readTime: "8 min read",
    updated: "Jan 2026",
    snippet: "Anti-TPO antibodies correlate with subtle variations in anti-Müllerian hormone (AMH) levels, highlighting the interplay between autoimmunity and fertility.",
    popularity: 84,
    dateTimestamp: 1769126400000,
  },
  {
    id: "6",
    title: "Postpartum Depression & Hormonal Withdrawal Screening (ACOG 2026)",
    category: "Research Papers",
    badge: "Clinical Guideline",
    strength: 5,
    source: "ACOG Clinical Practice Bulletin",
    readTime: "5 min read",
    updated: "Jan 2026",
    snippet: "Updated guidance emphasizes immediate 2-week post-birth neurosteroid evaluation and structured support frameworks for postpartum mood shifts.",
    popularity: 89,
    dateTimestamp: 1769472000000,
  },
  {
    id: "7",
    title: "Gut Microbiome Diversity and Endometriosis Lesion Inflammation",
    category: "Articles",
    badge: "Observational",
    strength: 3,
    source: "Microbiome Medicine Journal",
    readTime: "7 min read",
    updated: "Nov 2025",
    snippet: "Estrobolome bacterial profiles influence circulating free estrogen concentrations, offering potential therapeutic targets for pelvic pain management.",
    popularity: 79,
    dateTimestamp: 1764547200000,
  },
  {
    id: "8",
    title: "Vitamin D3 Deficiency and Female Telogen Effluvium Hair Loss",
    category: "Symptoms",
    badge: "Clinical Trial",
    strength: 4,
    source: "Dermatology Research Bulletin",
    readTime: "4 min read",
    updated: "Feb 2026",
    snippet: "Serum 25-hydroxyvitamin D levels under 20 ng/mL correlate with prolonged hair follicle resting phases; supplementation restored normal growth cycles in 74% of participants.",
    popularity: 93,
    dateTimestamp: 1772409600000,
  },
  {
    id: "9",
    title: "Is Intense Exercise During Menstruation Harmful?",
    category: "Myths",
    badge: "Fact Check",
    strength: 5,
    source: "Sports Medicine Meta-Analysis",
    readTime: "3 min read",
    updated: "Jan 2026",
    snippet: "Sub-maximal aerobic exercise does not increase inflammation or menstrual flow. Light to moderate activity actually alleviates cramping via endorphin release.",
    popularity: 86,
    dateTimestamp: 1768521600000,
  },
  {
    id: "10",
    title: "Progesterone Effects on Slow-Wave Sleep & Circadian Architecture",
    category: "Symptoms",
    badge: "Neurobiology Study",
    strength: 4,
    source: "Sleep Medicine Reviews",
    readTime: "5 min read",
    updated: "Jan 2026",
    snippet: "Progesterone metabolites bind GABA-A receptors in the central nervous system, enhancing deep slow-wave sleep duration during the luteal phase.",
    popularity: 90,
    dateTimestamp: 1769212800000,
  },
  {
    id: "11",
    title: "HRT Safety Profile: 2026 Global Consensus Statement",
    category: "Collections",
    badge: "Consensus Report",
    strength: 5,
    source: "International Menopause Society",
    readTime: "9 min read",
    updated: "Jan 2026",
    snippet: "Transdermal estradiol and micronized progesterone show favorable cardiovascular and bone density outcomes when initiated within 10 years of menopause onset.",
    popularity: 96,
    dateTimestamp: 1769644800000,
  },
  {
    id: "12",
    title: "Pelvic Floor Muscle Dysfunction & Dyspareunia Evidence",
    category: "Conditions",
    badge: "Clinical Review",
    strength: 5,
    source: "Physical Therapy & Gynecological Review",
    readTime: "6 min read",
    updated: "Dec 2025",
    snippet: "Hypertonic pelvic floor muscles are the primary driver of persistent deep discomfort; targeted physical therapy achieves significant pain reduction in 88% of cases.",
    popularity: 82,
    dateTimestamp: 1766966400000,
  },
];

const filterTabs = [
  "All",
  "Articles",
  "Myths",
  "Conditions",
  "Symptoms",
  "Research Papers",
  "Collections",
] as const;

type SortOption = "Most Relevant" | "Newest" | "Highest Evidence" | "Most Read";

export function SearchPage() {
  const { navigate } = useNavigation();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof filterTabs)[number]>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Most Relevant");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "PCOS insulin resistance",
    "lemon water myth",
    "magnesium sleep",
    "Vitamin D hair loss",
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        window.scrollTo({ top: 120, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

interface GroupedSuggestions {
  Myths: SearchItem[];
  Conditions: SearchItem[];
  Symptoms: SearchItem[];
  Articles: SearchItem[];
  "Research Papers": SearchItem[];
}

  // Grouped Live Search Suggestions
  const liveSuggestions = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    const matches = mockSearchCorpus.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );

    const grouped: GroupedSuggestions = {
      Myths: matches.filter((i) => i.category === "Myths").slice(0, 2),
      Conditions: matches.filter((i) => i.category === "Conditions").slice(0, 2),
      Symptoms: matches.filter((i) => i.category === "Symptoms").slice(0, 2),
      Articles: matches.filter((i) => i.category === "Articles").slice(0, 2),
      "Research Papers": matches.filter((i) => i.category === "Research Papers").slice(0, 2),
    };

    const hasAny = Object.values(grouped).some((arr) => arr.length > 0);
    return hasAny ? grouped : null;
  }, [query]);

  // Main Filtered & Sorted Search Results
  const results = useMemo(() => {
    let list = mockSearchCorpus.filter((item) => {
      const matchesTab = activeTab === "All" || item.category === activeTab;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesTab && matchesQuery;
    });

    if (sortBy === "Newest") {
      list.sort((a, b) => b.dateTimestamp - a.dateTimestamp);
    } else if (sortBy === "Highest Evidence") {
      list.sort((a, b) => b.strength - a.strength);
    } else if (sortBy === "Most Read") {
      list.sort((a, b) => b.popularity - a.popularity);
    }

    return list;
  }, [query, activeTab, sortBy]);

  const handleSearchSubmit = (searchTerm: string) => {
    setQuery(searchTerm);
    setIsFocused(false);
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches((prev) => [searchTerm, ...prev.slice(0, 4)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-t-primary pt-[110px] pb-[140px] selection:bg-rose/20 relative">
      {/* Background paper texture & botanical accent line art watermark */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none -z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1280 1200" fill="none" stroke="#2C2623" strokeWidth="0.8">
          <path d="M 120 100 Q 180 300 120 500 M 1160 200 Q 1100 450 1160 700" strokeDasharray="4 4" />
          <text x="125" y="90" fontSize="10" fontFamily="serif" fill="#2C2623">
            PUBMED & CLINICAL INDEX — VERA SEARCH ENGINE
          </text>
        </svg>
      </div>

      <div className="w-full max-w-[1100px] mx-auto px-[32px]">
        {/* 1. Minimal Hero */}
        <header className="text-center max-w-[760px] mx-auto mb-[40px] pt-[20px]">
          <span className="inline-block text-[13px] font-medium text-t-muted uppercase tracking-widest mb-[12px]">
            Evidence-Based Search Engine
          </span>
          <h1 className="font-serif text-[48px] md:text-[56px] font-semibold text-t-primary leading-[1.1] mb-[16px]">
            Search Evidence
          </h1>
          <p className="text-[18px] text-t-secondary leading-[1.6]">
            Search thousands of peer-reviewed clinical studies, verified medical guidelines, and plain-language evidence explanations.
          </p>
        </header>

        {/* 2. Large Centered Sticky Search Bar Container */}
        <section className="relative z-30 max-w-[840px] mx-auto mb-[32px]">
          <div
            className={`relative flex items-center w-full bg-[#F8F3EE]/95 border rounded-[24px] shadow-[0_8px_32px_rgba(44,38,35,0.06)] p-2 transition-all duration-300 ${
              isFocused
                ? "border-rose ring-2 ring-rose/20 bg-[#FCF8F4] shadow-[0_12px_40px_rgba(44,38,35,0.10)]"
                : "border-[#E5DCD3]"
            }`}
          >
            <div className="pl-4 pr-2 text-t-muted">
              <Search className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit(query);
                }
              }}
              placeholder="Search myths, symptoms, conditions or research..."
              className="w-full h-[52px] bg-transparent outline-none text-t-primary text-[17px] placeholder:text-t-muted/75 font-normal pr-3"
            />

            {query ? (
              <button
                onClick={() => setQuery("")}
                className="p-2 text-t-muted hover:text-t-primary rounded-full hover:bg-black/5 mr-1"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-t-muted bg-[#FFF8F3] px-2.5 py-1 rounded-md border border-[#E5DCD3] mr-2">
                <kbd className="font-sans">⌘</kbd>K
              </div>
            )}

            <Button
              size="lg"
              onClick={() => handleSearchSubmit(query)}
              className="shrink-0 px-6 h-[52px]"
            >
              Search
            </Button>
          </div>

          {/* 4. Live Search Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && liveSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[105%] left-0 right-0 bg-[#F8F3EE]/95 backdrop-blur-xl border border-[#E5DCD3] rounded-[24px] shadow-[0_16px_48px_rgba(44,38,35,0.12)] p-6 z-50 overflow-hidden space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[#E5DCD3] pb-3 text-xs font-mono text-t-muted uppercase tracking-wider">
                  <span>Live Index Suggestions</span>
                  <span>Press Enter to search all</span>
                </div>

                {(Object.entries(liveSuggestions) as [string, SearchItem[]][]).map(
                  ([groupName, items]) =>
                    items.length > 0 && (
                      <div key={groupName} className="space-y-2">
                        <div className="text-[12px] font-semibold text-rose uppercase tracking-wider">
                          {groupName}
                        </div>
                        <div className="space-y-1">
                          {items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSearchSubmit(item.title)}
                              className="w-full text-left p-3 rounded-xl hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 border border-transparent transition-all flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-4 h-4 text-t-muted group-hover:text-rose transition-colors" />
                                <span className="text-[15px] font-medium text-t-primary group-hover:text-rose transition-colors">
                                  {item.title}
                                </span>
                              </div>
                              <span className="text-[12px] text-t-muted group-hover:translate-x-1 transition-transform">
                                →
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 3. Recent & Popular Searches */}
        <section className="max-w-[840px] mx-auto mb-[48px] space-y-4">
          {recentSearches.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 text-[13px]">
              <div className="flex items-center gap-1.5 text-t-muted font-medium">
                <History className="w-4 h-4 text-t-muted" />
                <span>Recent:</span>
              </div>
              {recentSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearchSubmit(term)}
                  className="px-3.5 py-1.5 rounded-full bg-[#F8F3EE] border border-[#E5DCD3] text-t-secondary hover:text-t-primary hover:border-[#D6B46D] transition-all"
                >
                  {term}
                </button>
              ))}
              <button
                onClick={clearRecentSearches}
                className="text-xs text-t-muted hover:text-rose underline ml-auto"
              >
                Clear history
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 text-[13px]">
            <div className="flex items-center gap-1.5 text-t-muted font-medium">
              <TrendingUp className="w-4 h-4 text-rose" />
              <span>Popular:</span>
            </div>
            {["PCOS & Insulin", "Lemon water myth", "Perimenopause HRT", "Magnesium cramps", "Vitamin D hair"].map(
              (term, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearchSubmit(term)}
                  className="px-3.5 py-1.5 rounded-full bg-[#F8F3EE] border border-[#E5DCD3] text-t-primary hover:border-[#D6B46D] hover:bg-[#FCF8F4] transition-all font-medium"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </section>

        {/* 5. Sticky Filter Chips & 7. Sorting Header */}
        <section className="mb-[36px] sticky top-[76px] z-20 bg-[#FFF8F3]/95 backdrop-blur-md py-4 border-b border-[#E5DCD3]/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-[14px] font-medium whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "bg-[#2C2623] text-white shadow-sm"
                        : "bg-[#F8F3EE] border border-[#E5DCD3] text-t-secondary hover:border-[#D6B46D] hover:bg-[#FCF8F4] hover:text-t-primary"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-t-muted" />
              <span className="text-[13px] text-t-muted font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#F8F3EE] border border-[#E5DCD3] rounded-full px-3 py-1.5 text-[13px] font-semibold text-t-primary outline-none cursor-pointer hover:border-[#D6B46D]"
              >
                <option value="Most Relevant">Most Relevant</option>
                <option value="Newest">Newest</option>
                <option value="Highest Evidence">Highest Evidence</option>
                <option value="Most Read">Most Read</option>
              </select>
            </div>
          </div>
        </section>

        {/* 6. Search Results Grid (Premium Editorial Cards) */}
        <section>
          {results.length === 0 ? (
            /* 8. Elegant Empty and No-Result State */
            <div className="p-12 md:p-16 text-center bg-[#F8F3EE]/95 rounded-[32px] border border-[#E5DCD3] shadow-sm max-w-[800px] mx-auto my-8">
              <div className="w-16 h-16 rounded-full bg-rose/10 text-rose flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-[28px] font-semibold text-t-primary mb-3">
                No verified evidence found for "{query}"
              </h3>
              <p className="text-[16px] text-t-secondary max-w-[500px] mx-auto mb-8 leading-relaxed">
                We couldn't find exact matches under "{activeTab}". Try checking spelling, clearing filters, or exploring related clinical topics below.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery("");
                    setActiveTab("All");
                  }}
                >
                  Clear Search Query
                </Button>
                <Button onClick={() => setQuery("PCOS")}>Browse PCOS Evidence</Button>
                <Button onClick={() => setQuery("Menopause")}>Browse Menopause Evidence</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-[14px] text-t-muted font-medium mb-4">
                Showing {results.length} verified research results
              </div>

              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.category === "Myths") {
                      navigate("/myths/lemon-water-delays-periods");
                    } else if (item.category === "Conditions") {
                      navigate("/topics/pcos");
                    } else {
                      navigate("/articles/does-lemon-water-delay-periods");
                    }
                  }}
                  className="group p-8 rounded-[28px] bg-[#F8F3EE]/95 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-rose font-semibold bg-rose/10 px-3 py-1 rounded-full">
                          {item.badge}
                        </span>
                        <span className="text-[13px] font-medium text-t-muted">
                          {item.category}
                        </span>
                      </div>
                      <EvidenceDNA strength={item.strength} source={item.source} />
                    </div>

                    <h3 className="font-serif text-[26px] md:text-[28px] font-semibold text-t-primary group-hover:text-rose transition-colors leading-[1.2] mb-3">
                      {item.title}
                    </h3>

                    <p className="text-t-secondary text-[16px] leading-[1.6] mb-6">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E5DCD3]/60 text-[13px] text-t-muted">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.updated}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-rose font-medium group-hover:translate-x-1.5 transition-transform">
                      Read Analysis <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
