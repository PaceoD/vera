import React, { useState, useMemo } from "react";
import {
  Search,
  ArrowRight,
  Sparkles,
  Droplets,
  Activity,
  Sprout,
  Apple,
  Brain,
  Heart,
  Wind,
  Moon,
  Compass,
  BookOpen,
  FileText,
  ShieldCheck,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNavigation } from "@/context/NavigationContext";

// Quick filter chips
const filterChips = [
  "All",
  "Evidence",
  "Myths",
  "Conditions",
  "Symptoms",
  "Nutrition",
  "Lifestyle",
];

// Featured topics (10 core topics)
const featuredTopics = [
  {
    name: "Periods",
    slug: "periods",
    category: "Symptoms",
    desc: "Cycle tracking, dysmenorrhea, and hormonal fluctuation science.",
    count: 124,
    icon: Droplets,
  },
  {
    name: "PCOS",
    slug: "pcos",
    category: "Conditions",
    desc: "Polycystic Ovary Syndrome diagnosis, insulin management, and RCTs.",
    count: 86,
    icon: Activity,
  },
  {
    name: "Nutrition",
    slug: "nutrition",
    category: "Nutrition",
    desc: "Micronutrient absorption, anti-inflammatory diets, and metabolic health.",
    count: 198,
    icon: Apple,
  },
  {
    name: "Mental Health",
    slug: "mental-health",
    category: "Symptoms",
    desc: "Hormonal mood shifts, anxiety correlation, and neuroendocrine studies.",
    count: 156,
    icon: Brain,
  },
  {
    name: "Hormones",
    slug: "hormones",
    category: "Evidence",
    desc: "Estrogen, progesterone, cortisol, and endocrine system pathways.",
    count: 168,
    icon: Sparkles,
  },
  {
    name: "Hair & Skin",
    slug: "hair-skin",
    category: "Symptoms",
    desc: "Dermatologist-reviewed guidance on hormonal acne, alopecia, and barrier care.",
    count: 112,
    icon: Compass,
  },
  {
    name: "Fertility",
    slug: "fertility",
    category: "Evidence",
    desc: "Ovarian reserve, ovulation tracking, and reproductive science.",
    count: 142,
    icon: Sprout,
  },
  {
    name: "Menopause",
    slug: "menopause",
    category: "Conditions",
    desc: "Perimenopause transition, HRT clinical evidence, and bone density.",
    count: 175,
    icon: Wind,
  },
  {
    name: "Sexual Health",
    slug: "sexual-health",
    category: "Lifestyle",
    desc: "Pelvic floor wellness, libido factors, and non-judgmental medical facts.",
    count: 134,
    icon: Heart,
  },
  {
    name: "Sleep",
    slug: "sleep",
    category: "Lifestyle",
    desc: "Circadian rhythms, progesterone sleep effects, and insomnia research.",
    count: 105,
    icon: Moon,
  },
];

// Myth Verdict List for Myths Filter
const mythList = [
  {
    title: "Does Lemon Water Delay Periods?",
    verdict: "FALSE — 96% Scientific Confidence",
    desc: "Comprehensive evaluation of 34 peer-reviewed clinical studies examining citric acid metabolism & luteal phase timing.",
    slug: "lemon-water-delays-periods",
  },
  {
    title: "Does Cold Water Cause Severe Menstrual Cramps?",
    verdict: "FALSE — 94% Scientific Confidence",
    desc: "Analyzing uterine arterial hemodynamics and smooth muscle contractility against digestive temperature shifts.",
    slug: "lemon-water-delays-periods",
  },
  {
    title: "Is Intense Exercise During Menstruation Harmful?",
    verdict: "FALSE — 98% Scientific Confidence",
    desc: "Meta-analysis proving aerobic activity reduces prostaglandin-mediated dysmenorrhea.",
    slug: "lemon-water-delays-periods",
  },
];

// Trending Search Chips
const trendingTopics = [
  { term: "PCOS & Insulin Resistance", count: 142, slug: "pcos" },
  { term: "Perimenopause Brain Fog", count: 98, slug: "menopause" },
  { term: "Sleep Quality & Hormones", count: 164, slug: "sleep" },
  { term: "Magnesium & Menstrual Cramps", count: 86, slug: "periods" },
  { term: "Thyroid vs Fertility", count: 112, slug: "fertility" },
  { term: "Postpartum Mental Health", count: 130, slug: "mental-health" },
  { term: "Gut Microbiome & Estrogen", count: 94, slug: "nutrition" },
];

// Life Stages
const lifeStages = [
  {
    stage: "Puberty",
    range: "Ages 9–17",
    desc: "Early endocrine shifts, first cycle guidance, and adolescent health.",
    count: 42,
  },
  {
    stage: "Periods",
    range: "Monthly Cycles",
    desc: "Regularity, flow variations, PMS management, and cycle tracking.",
    count: 124,
  },
  {
    stage: "Reproductive Years",
    range: "Ages 18–40",
    desc: "Fertility awareness, contraception science, and hormonal balance.",
    count: 186,
  },
  {
    stage: "Pregnancy",
    range: "Trimesters 1–3",
    desc: "Trimester-by-trimester clinical evidence, prenatal care, and nutrition.",
    count: 215,
  },
  {
    stage: "Postpartum",
    range: "Fourth Trimester",
    desc: "Recovery science, fourth trimester care, lactation, and mood.",
    count: 118,
  },
  {
    stage: "Perimenopause",
    range: "Transition Phase",
    desc: "Navigating early hormonal changes, hot flashes, and sleep shifts.",
    count: 132,
  },
  {
    stage: "Menopause",
    range: "Post-Transition",
    desc: "Long-term bone density, cardiovascular health, and HRT options.",
    count: 175,
  },
];

// Evidence Collections
const evidenceCollections = [
  {
    title: "Editor's Picks",
    badge: "Curated",
    badgeColor: "bg-[#96B59A]/15 text-[#6B8E6F]",
    desc: "Hand-selected systematic reviews and high-impact clinical trials.",
    itemsCount: 18,
    icon: BookOpen,
    updated: "Updated yesterday",
  },
  {
    title: "Research Roundups",
    badge: "Monthly Digest",
    badgeColor: "bg-[#C48A91]/15 text-[#B77A82]",
    desc: "Monthly summaries of peer-reviewed literature across top medical journals.",
    itemsCount: 24,
    icon: FileText,
    updated: "Updated this week",
  },
  {
    title: "Beginner Guides",
    badge: "Foundational",
    badgeColor: "bg-[#D6B46D]/15 text-[#B59146]",
    desc: "Clear, jargon-free introductions to complex hormonal and endocrine systems.",
    itemsCount: 15,
    icon: CheckCircle2,
    updated: "Essential Reading",
  },
  {
    title: "Recently Updated",
    badge: "2026 Guidelines",
    badgeColor: "bg-[#B8A5D6]/15 text-[#8A71B5]",
    desc: "Articles recently revised with the latest 2026 medical practice guidelines.",
    itemsCount: 30,
    icon: ShieldCheck,
    updated: "3 days ago",
  },
  {
    title: "Most Read",
    badge: "Popular",
    badgeColor: "bg-sage/15 text-sage",
    desc: "The most accessed evidence explanations by women and clinicians worldwide.",
    itemsCount: 22,
    icon: Flame,
    updated: "Top 1%",
  },
  {
    title: "Myth Collection",
    badge: "Fact-Checked",
    badgeColor: "bg-[#C48A91]/15 text-[#B77A82]",
    desc: "Comprehensive breakdowns debunking popular social media health claims.",
    itemsCount: 40,
    icon: Sparkles,
    updated: "Verified Studies",
  },
];

export function ExplorePage() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(() => {
    return featuredTopics.filter((topic) => {
      const matchesFilter =
        activeFilter === "All" ||
        topic.category.toLowerCase() === activeFilter.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === "" ||
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-t-primary pt-[110px] pb-[120px] selection:bg-rose/20 relative">
      {/* Background paper texture & botanical accent watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1280 1200" fill="none" stroke="#2C2623" strokeWidth="0.8">
          <path d="M 80 120 C 140 240, 220 360, 140 480 M 1180 300 C 1120 480, 1060 660, 1120 840" strokeDasharray="4 4" />
          <text x="85" y="110" fontSize="10" fontFamily="serif" fill="#2C2623">LIB. REF — VERIFIED CLINICAL CORPUS</text>
        </svg>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-[32px]">
        {/* 1. Minimal Hero */}
        <header className="text-center max-w-[800px] mx-auto mb-[48px] pt-[24px]">
          <span className="inline-block text-[13px] font-medium text-t-muted uppercase tracking-widest mb-[16px]">
            Scientific Library & Knowledge Base
          </span>
          <h1 className="font-serif text-[48px] md:text-[60px] font-semibold text-t-primary leading-[1.1] mb-[20px]">
            Explore Women's Health
          </h1>
          <p className="text-[18px] text-t-secondary leading-[1.6] max-w-[660px] mx-auto">
            Navigate verified clinical studies, expert reviews, and evidence-based guidance curated like a modern scientific library.
          </p>
        </header>

        {/* 2. Large Search Bar & Filter Chips */}
        <section className="max-w-[840px] mx-auto mb-[72px]">
          <div className="relative flex items-center w-full bg-[#F8F3EE]/95 border border-[#E5DCD3] rounded-[24px] shadow-[0_8px_32px_rgba(44,38,35,0.06)] p-2 focus-within:ring-2 focus-within:ring-rose/30 focus-within:border-rose transition-all duration-300 mb-[24px]">
            <div className="pl-4 pr-2 text-t-muted">
              <Search className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search myths, symptoms, conditions or research..."
              className="w-full h-[52px] bg-transparent outline-none text-t-primary text-[17px] placeholder:text-t-muted/80 font-normal pr-4"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-t-muted hover:text-t-primary px-3 py-1 bg-black/5 rounded-full mr-2"
              >
                Clear
              </button>
            )}
            <Button size="lg" onClick={() => navigate("/search")} className="shrink-0 px-6 h-[52px]">
              Search Library
            </Button>
          </div>

          {/* Quick filter chips */}
          <div className="flex flex-wrap items-center justify-center gap-[10px]">
            {filterChips.map((chip) => {
              const isActive = activeFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={`px-[18px] py-[9px] rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#2C2623] text-white shadow-sm font-semibold"
                      : "bg-[#F8F3EE] border border-[#E5DCD3] text-t-secondary hover:border-[#D6B46D] hover:bg-[#FCF8F4] hover:text-t-primary"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Trending Topics */}
        <section className="mb-[80px]">
          <div className="flex items-center gap-3 mb-[20px]">
            <Flame className="w-5 h-5 text-rose" aria-hidden="true" />
            <h2 className="font-serif text-[22px] font-semibold text-t-primary">
              Trending Topics
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-[12px]">
            {trendingTopics.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/topics/${item.slug}`)}
                className="px-[20px] py-[10px] rounded-full bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] text-[14px] font-medium text-t-primary hover:border-[#D6B46D] hover:bg-[#FCF8F4] transition-all duration-250 shadow-sm flex items-center gap-2 group cursor-pointer"
              >
                <span>{item.term}</span>
                <span className="text-[12px] text-t-muted bg-black/5 px-2 py-0.5 rounded-full font-mono group-hover:bg-rose/10 group-hover:text-rose transition-colors">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. Featured Topics / Myth Cards Grid */}
        <section className="mb-[96px]">
          <div className="flex items-center justify-between mb-[32px]">
            <div>
              <h2 className="font-serif text-[36px] font-semibold text-t-primary mb-[8px]">
                {activeFilter === "Myths" ? "Fact-Checked Myth Verdicts" : "Featured Topics"}
              </h2>
              <p className="text-[16px] text-t-secondary">
                {activeFilter === "Myths"
                  ? "Explore verified medical breakdowns debunking popular health myths"
                  : `${filteredTopics.length} evidence-backed topic collections available`}
              </p>
            </div>
          </div>

          {activeFilter === "Myths" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {mythList.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/myths/${m.slug}`)}
                  className="p-8 rounded-[24px] bg-[#F8F3EE]/95 border-2 border-[#D6B46D]/40 shadow-sm hover:bg-[#FCF8F4] hover:border-[#D6B46D] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase bg-rose/15 text-rose px-3 py-1 rounded-full mb-4 inline-block">
                      {m.verdict}
                    </span>
                    <h3 className="font-serif text-[24px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-3 leading-snug">
                      "{m.title}"
                    </h3>
                    <p className="text-[15px] text-t-secondary leading-relaxed mb-6">
                      {m.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E5DCD3]/60 text-[14px] text-rose font-semibold">
                    <span>Read Full Verdict Review</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTopics.length === 0 ? (
            <div className="p-12 text-center bg-[#F8F3EE]/90 rounded-[24px] border border-[#E5DCD3]">
              <p className="text-[18px] text-t-secondary mb-4">
                No topics found matching "{searchQuery}" under "{activeFilter}".
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.name}
                  onClick={() => navigate(`/topics/${topic.slug}`)}
                  className="group relative p-[32px] flex flex-col items-start rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#FFF8F3] flex items-center justify-center text-t-primary mb-[20px] shadow-sm border border-[#E5DCD3]">
                    <topic.icon className="w-[22px] h-[22px] stroke-[1.5]" aria-hidden="true" />
                  </div>

                  <div className="mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose font-semibold bg-rose/10 px-2.5 py-1 rounded-full">
                      {topic.category}
                    </span>
                  </div>

                  <h3 className="text-[22px] font-semibold text-t-primary mb-[8px]">
                    {topic.name}
                  </h3>

                  <p className="text-t-secondary text-[15px] leading-relaxed mb-[28px] flex-grow">
                    {topic.desc}
                  </p>

                  <div className="flex items-center justify-between w-full mt-auto pt-[16px] border-t border-[#E5DCD3]/60">
                    <span className="text-[14px] font-medium text-t-muted">
                      {topic.count} verified articles
                    </span>
                    <ArrowRight
                      className="w-[18px] h-[18px] text-t-secondary transition-transform duration-250 ease-out group-hover:translate-x-[6px] group-hover:text-rose"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 5. Browse by Life Stage */}
        <section className="mb-[96px] bg-[#FAF4EE]/40 p-[40px] md:p-[48px] rounded-[32px] border border-[#E5DCD3]">
          <div className="mb-[40px]">
            <span className="inline-block text-[13px] font-medium text-rose uppercase tracking-widest mb-[8px]">
              Chronological Health Care
            </span>
            <h2 className="font-serif text-[36px] font-semibold text-t-primary mb-[8px]">
              Browse by Life Stage
            </h2>
            <p className="text-[16px] text-t-secondary">
              Evidence structured for every phase of a woman's health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {lifeStages.map((stage) => (
              <div
                key={stage.stage}
                onClick={() => navigate("/topics/pcos")}
                className="p-[28px] rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[20px] font-semibold text-t-primary">
                      {stage.stage}
                    </h3>
                    <span className="text-[12px] font-mono text-t-muted bg-[#FFF8F3] px-2.5 py-1 rounded-full border border-[#E5DCD3]">
                      {stage.range}
                    </span>
                  </div>
                  <p className="text-t-secondary text-[14px] leading-relaxed mb-4">
                    {stage.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E5DCD3]/60 text-[13px] text-t-muted">
                  <span>{stage.count} guides</span>
                  <ArrowRight className="w-4 h-4 text-t-secondary group-hover:translate-x-1.5 group-hover:text-rose transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Evidence Collections (Navigates to /myths/lemon-water-delays-periods or /articles/...) */}
        <section className="mb-[40px]">
          <div className="mb-[40px]">
            <span className="inline-block text-[13px] font-medium text-t-muted uppercase tracking-widest mb-[8px]">
              Curated Library Shelves
            </span>
            <h2 className="font-serif text-[36px] font-semibold text-t-primary mb-[8px]">
              Evidence Collections
            </h2>
            <p className="text-[16px] text-t-secondary">
              Hand-curated reference sets designed for deeper scientific research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {evidenceCollections.map((col, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (col.title === "Myth Collection") {
                    navigate("/myths/lemon-water-delays-periods");
                  } else {
                    navigate("/articles/does-lemon-water-delay-periods");
                  }
                }}
                className="p-[32px] rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300 group cursor-pointer flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#FFF8F3] flex items-center justify-center text-t-primary border border-[#E5DCD3]">
                    <col.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${col.badgeColor}`}>
                    {col.badge}
                  </span>
                </div>

                <h3 className="text-[20px] font-semibold text-t-primary mb-2">
                  {col.title}
                </h3>
                <p className="text-t-secondary text-[14px] leading-relaxed mb-6 flex-grow">
                  {col.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5DCD3]/60 text-[13px]">
                  <span className="text-t-muted">{col.itemsCount} curated items &middot; {col.updated}</span>
                  <ArrowRight className="w-4 h-4 text-t-secondary group-hover:translate-x-1.5 group-hover:text-rose transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
