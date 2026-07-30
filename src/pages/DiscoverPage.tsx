import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  Calendar,
  Flame,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Compass,
  FileCheck2,
  Droplets,
  Activity,
  Brain,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { useNavigation } from "@/context/NavigationContext";
import { motion } from "motion/react";

// Featured Story Data
const featuredStory = {
  title: "The Neuroendocrine Axis: How Stress, Cortisol, and Progesterone Intersect",
  category: "Cover Feature &middot; Endocrine Science",
  readTime: "8 min read",
  evidence: "Level 1 Systematic Review",
  updated: "Issue 04 &middot; Feb 2026",
  summary: "A deep dive into how chronic hypothalamic-pituitary-adrenal (HPA) activation alters progesterone synthesis, luteal phase consistency, and circadian sleep architecture in women.",
  author: "Dr. Elena Vance, MD & Dr. Sophia Lin, PhD",
  slug: "does-lemon-water-delay-periods",
};

// Trending This Week (6 Core Topics)
const trendingThisWeek = [
  {
    topic: "Vitamin D & Ovarian Reserve",
    tag: "Clinical Research",
    count: "4.8k reads",
    desc: "Serum 25(OH)D status correlation with AMH levels and follicular maturation.",
    icon: Sun,
    slug: "pcos",
  },
  {
    topic: "PCOS & Metabolic Flexibility",
    tag: "Metabolic Health",
    count: "6.2k reads",
    desc: "Evaluating inositol supplementation vs. metformin in 14 randomized controlled trials.",
    icon: Activity,
    slug: "pcos",
  },
  {
    topic: "Hormonal Alopecia Protocols",
    tag: "Dermatology",
    count: "3.9k reads",
    desc: "Androgen sensitivity in hair follicles and evidence-based topical treatments.",
    icon: Compass,
    slug: "pcos",
  },
  {
    topic: "Menstrual Cycle Syncing",
    tag: "Lifestyle Science",
    count: "5.1k reads",
    desc: "What clinical trials say about matching exercise intensity to cycle phases.",
    icon: Droplets,
    slug: "periods",
  },
  {
    topic: "Gut Microbiome & Estrogen",
    tag: "Estrobolome",
    count: "4.3k reads",
    desc: "How beta-glucuronidase producing bacteria influence circulating estrogen levels.",
    icon: Brain,
    slug: "nutrition",
  },
  {
    topic: "Progesterone & Sleep Architecture",
    tag: "Neuroscience",
    count: "3.7k reads",
    desc: "The GABA-A receptor agonist properties of natural progesterone metabolites.",
    icon: Sparkles,
    slug: "sleep",
  },
];

// Editor's Picks (Horizontal Cards)
const editorsPicks = [
  {
    title: "Understanding Anovulatory Cycles in Early Perimenopause",
    category: "Reproductive Health",
    readTime: "6 min read",
    strength: 5 as const,
    source: "ACOG Clinical Bulletin",
    updated: "Feb 2026",
    summary: "Recognizing early hormonal signals when progesterone drops before estrogen begins to fluctuate.",
    slug: "does-lemon-water-delay-periods",
  },
  {
    title: "Iron Deficiency Anemia vs. Ferritin Depletion in Active Women",
    category: "Hematology & Nutrition",
    readTime: "5 min read",
    strength: 5 as const,
    source: "Lancet Haematology",
    updated: "Jan 2026",
    summary: "Why normal hemoglobin levels can mask low iron storage, causing fatigue and brain fog.",
    slug: "does-lemon-water-delay-periods",
  },
  {
    title: "The Micronutrient Guide to Premenstrual Dysphoric Disorder (PMDD)",
    category: "Mental Health",
    readTime: "7 min read",
    strength: 4 as const,
    source: "Systematic Meta-Analysis",
    updated: "Feb 2026",
    summary: "Evidence-backed nutritional strategies evaluating B6, Calcium, and Magnesium for luteal mood stability.",
    slug: "does-lemon-water-delay-periods",
  },
];

// Seasonal Collections
const seasonalCollections = [
  {
    season: "Winter & Early Spring",
    title: "Winter Skin Barrier Science",
    items: "12 Curated Articles",
    desc: "Combatting trans-epidermal water loss and hormonal dryness through lipid barrier restoration.",
    badge: "Seasonal Focus",
    badgeColor: "bg-[#8A71B5]/15 text-[#8A71B5]",
  },
  {
    season: "Spring & Wellness",
    title: "Monsoon & Circadian Rhythm",
    items: "15 Curated Articles",
    desc: "Optimizing morning sunlight exposure, melatonin synthesis, and seasonal affective adjustments.",
    badge: "Circadian Health",
    badgeColor: "bg-sage/15 text-sage",
  },
  {
    season: "Summer Nutrition",
    title: "Electrolyte Hydration & Hormones",
    items: "10 Curated Articles",
    desc: "Understanding sodium-potassium pumps, aldosterone shifts, and heat stress on hormone production.",
    badge: "Hydration Science",
    badgeColor: "bg-[#D6B46D]/15 text-[#B59146]",
  },
  {
    season: "Year-Round",
    title: "Mental Wellness & Neuroendocrinology",
    items: "18 Curated Articles",
    desc: "How neurosteroids modulate anxiety, resilience, and stress response across life stages.",
    badge: "Neuroscience",
    badgeColor: "bg-rose/15 text-rose",
  },
];

// Learn by Collection (Learning Paths)
const learningPaths = [
  {
    title: "Hormone Basics",
    steps: "4 Guides &middot; 25 min total",
    desc: "Master the fundamentals of estrogen, progesterone, FSH, LH, and cortisol pathways.",
    icon: Sparkles,
  },
  {
    title: "Beginner's Women's Health Guide",
    steps: "5 Guides &middot; 30 min total",
    desc: "A essential foundation covering pelvic health, cycle tracking, and annual screening guidelines.",
    icon: BookOpen,
  },
  {
    title: "Fertility Essentials",
    steps: "6 Guides &middot; 40 min total",
    desc: "Ovarian reserve markers, ovulation detection, cervical mucus interpretation, and preconception care.",
    icon: Sprout,
  },
  {
    title: "Nutrition Fundamentals",
    steps: "5 Guides &middot; 35 min total",
    desc: "Anti-inflammatory dietary patterns, blood sugar balance, and gut-microbiome optimization.",
    icon: Apple,
  },
  {
    title: "Skin Science & Dermatological Health",
    steps: "4 Guides &middot; 22 min total",
    desc: "Hormonal acne mechanisms, retinoids, sunscreen filters, and barrier lipid synthesis.",
    icon: Compass,
  },
  {
    title: "Menopause Transition Guide",
    steps: "6 Guides &middot; 45 min total",
    desc: "Hormone Replacement Therapy (HRT) evidence, vasomotor symptoms, and long-term bone density.",
    icon: Wind,
  },
];

// Helper icons for Learning Paths
import { Sprout, Apple, Wind } from "lucide-react";

// Latest Research Highlights
const researchHighlights = [
  {
    year: "2026",
    title: "Continuous Glucose Monitoring (CGM) in Non-Diabetic Women with PCOS",
    source: "Journal of Clinical Endocrinology",
    level: "Randomized Controlled Trial",
    summary: "Postprandial glucose variability correlates directly with free androgen index, offering new dietary intervention targets.",
  },
  {
    year: "2025",
    title: "HRT Timing Hypothesis: 10-Year Follow-up Meta-Analysis",
    source: "NEJM & ACOG Synthesis",
    level: "Systematic Review (N = 18,400)",
    summary: "Initiating Menopausal Hormone Therapy within 10 years of menopause onset yields significant cardiovascular protection.",
  },
  {
    year: "2025",
    title: "Pelvic Floor Muscle Training for Stress Urinary Incontinence",
    source: "Cochrane Database of Systematic Reviews",
    level: "Level 1 Meta-Analysis",
    summary: "Supervised pelvic floor physiotherapy shows 84% resolution rate compared to passive containment strategies.",
  },
];

// Popular Myth Reviews
const popularMyths = [
  {
    question: "Does Drinking Lemon Water Delay Your Menstrual Period?",
    verdict: "FALSE",
    confidence: "96%",
    summary: "Zero physiological mechanism exists for citric acid to alter endometrial shedding or progesterone withdrawal.",
    slug: "lemon-water-delays-periods",
  },
  {
    question: "Does Cold Water Cause Severe Menstrual Cramps?",
    verdict: "FALSE",
    confidence: "94%",
    summary: "Gastric fluid temperature has no vascular or neural connection to uterine smooth muscle contractions.",
    slug: "lemon-water-delays-periods",
  },
  {
    question: "Can You Get Pregnant During Your Period?",
    verdict: "TRUE",
    confidence: "99%",
    summary: "Sperm survival up to 5 days combined with early ovulation makes pregnancy biologically possible during menses.",
    slug: "lemon-water-delays-periods",
  },
];

// Continue Reading (Recently Viewed)
const continueReadingItems = [
  {
    title: "Polycystic Ovary Syndrome (PCOS) Diagnostic & Treatment Hub",
    progress: 65,
    timeLeft: "3 min left",
    category: "Condition Hub",
    slug: "pcos",
  },
  {
    title: "Does Drinking Lemon Water Delay Your Menstrual Period?",
    progress: 90,
    timeLeft: "1 min left",
    category: "Myth Review",
    slug: "lemon-water-delays-periods",
  },
];

export function DiscoverPage() {
  const { navigate } = useNavigation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F4] text-t-primary pt-[110px] pb-[140px] selection:bg-rose/20 relative">
      {/* Background Subtle Paper Texture & Botanical Accent */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none -z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1280 1400" fill="none" stroke="#2C2623" strokeWidth="0.8">
          <path d="M 120 180 C 220 300, 320 450, 180 600 M 1100 200 C 1020 400, 1180 700, 1050 950" strokeDasharray="4 4" />
          <circle cx="640" cy="400" r="320" strokeDasharray="2 6" />
          <text x="125" y="170" fontSize="10" fontFamily="serif" fill="#2C2623">VERA EDITORIAL MAG — ISSUE 04</text>
        </svg>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-[32px] space-y-[96px]">
        {/* 1. Editorial Hero */}
        <header className="text-center max-w-[840px] mx-auto pt-[24px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F1EB] border border-[#E5DCD3] text-t-muted text-[13px] font-mono uppercase tracking-widest mb-[20px]">
            <Sparkles className="w-3.5 h-3.5 text-rose" />
            Curated Editorial Edition &middot; Spring 2026
          </div>

          <h1 className="font-serif text-[52px] md:text-[68px] font-semibold text-t-primary leading-[1.08] mb-[20px] tracking-tight">
            Discover
          </h1>

          <p className="text-[19px] md:text-[21px] text-t-secondary leading-[1.6] max-w-[680px] mx-auto font-light">
            Explore curated collections, trending research, and editor-selected guides published like a modern scientific journal.
          </p>
        </header>

        {/* 2. Featured Story (Magazine Cover Feature) */}
        <section className="relative">
          <div className="p-8 md:p-12 rounded-[36px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-[0_12px_48px_rgba(44,38,35,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_18px_60px_rgba(44,38,35,0.09)] group">
            {/* Background Botanical Accent Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[12px] font-mono font-semibold uppercase tracking-widest text-rose bg-rose/10 px-3 py-1 rounded-full">
                    {featuredStory.category}
                  </span>
                  <span className="text-[13px] text-t-muted font-medium">
                    {featuredStory.updated}
                  </span>
                </div>

                <h2 className="font-serif text-[32px] md:text-[44px] font-semibold text-t-primary leading-[1.15] group-hover:text-rose transition-colors">
                  {featuredStory.title}
                </h2>

                <p className="text-[17px] text-t-secondary leading-[1.6]">
                  {featuredStory.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5DCD3]/70 text-[14px]">
                  <div className="flex items-center gap-4 text-t-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-t-muted" />
                      {featuredStory.readTime}
                    </span>
                    <EvidenceDNA strength={5} source={featuredStory.evidence} />
                  </div>

                  <Button
                    size="lg"
                    onClick={() => navigate(`/articles/${featuredStory.slug}`)}
                    className="px-7"
                  >
                    Read Story <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Cover Graphic / Artwork Box */}
              <div className="lg:col-span-5 relative">
                <div className="w-full aspect-[4/3] rounded-[28px] bg-[#FFF8F3] border border-[#E5DCD3] p-8 flex flex-col justify-between shadow-inner relative overflow-hidden">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-t-muted">COVER ILLUSTRATION</span>
                    <h3 className="font-serif text-[20px] font-semibold text-t-primary leading-tight">
                      HPA Axis & Neuroendocrine Pathways
                    </h3>
                  </div>

                  {/* Minimal Botanical/Endocrine Pathway Diagram SVG */}
                  <div className="w-full h-32 flex items-center justify-center my-2">
                    <svg className="w-full h-full" viewBox="0 0 300 120" fill="none" stroke="#2C2623" strokeWidth="1.2">
                      <circle cx="60" cy="60" r="28" stroke="#D6B46D" strokeWidth="1.8" fill="#FAF4EE" />
                      <circle cx="150" cy="60" r="34" stroke="#C48A91" strokeWidth="1.8" fill="#FFF8F3" />
                      <circle cx="240" cy="60" r="28" stroke="#6B8E6F" strokeWidth="1.8" fill="#FAF4EE" />
                      <path d="M 88 60 L 116 60 M 184 60 L 212 60" strokeDasharray="3 3" />
                      <text x="44" y="64" fontSize="10" fontFamily="sans-serif" fill="#2C2623">Brain</text>
                      <text x="130" y="64" fontSize="10" fontFamily="sans-serif" fill="#2C2623">Adrenal</text>
                      <text x="224" y="64" fontSize="10" fontFamily="sans-serif" fill="#2C2623">Ovary</text>
                    </svg>
                  </div>

                  <div className="text-[12px] text-t-muted font-mono flex items-center justify-between border-t border-[#E5DCD3] pt-3">
                    <span>By {featuredStory.author}</span>
                    <span className="text-rose font-semibold">VERA MAG NO. 04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Continue Reading (Recently Viewed) - Rendered early if available */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-rose" />
              <h2 className="font-serif text-[28px] font-semibold text-t-primary">
                Continue Reading
              </h2>
            </div>
            <span className="text-[13px] text-t-muted">Recently Opened Guides</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {continueReadingItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/topics/${item.slug}`)}
                className="p-6 rounded-[24px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose font-semibold bg-rose/10 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-t-muted">{item.timeLeft}</span>
                  </div>
                  <h3 className="font-serif text-[20px] font-semibold text-t-primary group-hover:text-rose transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#E5DCD3]/60">
                  <div className="flex items-center justify-between text-xs font-medium text-t-muted">
                    <span>Reading Progress</span>
                    <span className="font-mono text-t-primary">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-rose transition-all duration-300" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Trending This Week */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-rose" />
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Trending This Week
              </h2>
            </div>
            <span className="text-[14px] text-t-muted font-medium">Most Accessed Clinical Topics</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingThisWeek.map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/topics/${item.slug}`)}
                className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-[0_4px_20px_rgba(44,38,35,0.03)] hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:shadow-[0_10px_30px_rgba(44,38,35,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#FFF8F3] border border-[#E5DCD3] flex items-center justify-center text-t-primary">
                      <item.icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <span className="text-[12px] font-mono text-t-muted bg-black/5 px-2.5 py-1 rounded-full font-medium">
                      {item.count}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-rose font-semibold bg-rose/10 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                    {item.tag}
                  </span>

                  <h3 className="font-serif text-[22px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-2 leading-snug">
                    {item.topic}
                  </h3>

                  <p className="text-[14px] text-t-secondary leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5DCD3]/60 text-[13px] text-t-muted">
                  <span>Explore Topic</span>
                  <ArrowRight className="w-4 h-4 text-t-secondary group-hover:translate-x-1 group-hover:text-rose transition-all" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Editor's Picks (Curated Horizontal Cards) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-rose" />
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Editor's Picks
              </h2>
            </div>
            <span className="text-[14px] text-t-muted">Hand-selected by Vera Medical Panel</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editorsPicks.map((pick, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/articles/${pick.slug}`)}
                className="p-8 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose font-semibold bg-rose/10 px-2.5 py-0.5 rounded-full">
                      {pick.category}
                    </span>
                    <span className="text-xs font-mono text-t-muted">{pick.updated}</span>
                  </div>

                  <h3 className="font-serif text-[24px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-3 leading-snug">
                    {pick.title}
                  </h3>

                  <p className="text-[15px] text-t-secondary leading-relaxed mb-6">
                    {pick.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E5DCD3]/60">
                  <EvidenceDNA strength={pick.strength} source={pick.source} />
                  <div className="flex items-center justify-between text-[13px] text-t-muted pt-1">
                    <span>{pick.readTime}</span>
                    <span className="text-rose font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Pick <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Seasonal Collections */}
        <section className="space-y-6">
          <div>
            <span className="text-[12px] font-mono text-rose uppercase tracking-widest font-semibold">
              Chronological & Environmental Health
            </span>
            <h2 className="font-serif text-[32px] font-semibold text-t-primary">
              Seasonal Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seasonalCollections.map((col, idx) => (
              <div
                key={idx}
                onClick={() => navigate("/explore")}
                className="p-8 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${col.badgeColor}`}>
                      {col.badge}
                    </span>
                    <span className="text-[13px] font-mono text-t-muted">{col.items}</span>
                  </div>

                  <h3 className="font-serif text-[26px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-2">
                    {col.title}
                  </h3>

                  <p className="text-[15px] text-t-secondary leading-relaxed mb-6">
                    {col.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5DCD3]/60 text-[14px] text-t-muted">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-t-secondary group-hover:translate-x-1 group-hover:text-rose transition-all" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Learn by Collection (Learning Paths) */}
        <section className="space-y-6 bg-[#FAF4EE]/50 p-8 md:p-12 rounded-[36px] border border-[#E5DCD3]">
          <div>
            <span className="text-[12px] font-mono text-t-muted uppercase tracking-widest font-semibold">
              Structured Educational Tracks
            </span>
            <h2 className="font-serif text-[36px] font-semibold text-t-primary mb-2">
              Learn by Collection
            </h2>
            <p className="text-[16px] text-t-secondary max-w-[600px]">
              Step-by-step learning paths engineered to build deep scientific literacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, idx) => (
              <div
                key={idx}
                onClick={() => navigate("/explore")}
                className="p-7 rounded-[24px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FFF8F3] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-full bg-[#FFF8F3] border border-[#E5DCD3] flex items-center justify-center text-t-primary mb-4 shadow-xs">
                    <path.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-[22px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-1.5">
                    {path.title}
                  </h3>

                  <p className="text-[12px] font-mono text-t-muted mb-3" dangerouslySetInnerHTML={{ __html: path.steps }} />

                  <p className="text-[14px] text-t-secondary leading-relaxed mb-6">
                    {path.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5DCD3]/60 text-[13px] text-rose font-semibold">
                  <span>Start Learning Path</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Latest Research Highlights */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-[32px] font-semibold text-t-primary">
              Latest Clinical Research Highlights
            </h2>
            <span className="text-[14px] text-t-muted">2025–2026 Peer-Reviewed Index</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchHighlights.map((res, idx) => (
              <div
                key={idx}
                onClick={() => navigate("/articles/does-lemon-water-delay-periods")}
                className="p-7 rounded-[24px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-semibold bg-[#FFF8F3] px-2.5 py-1 rounded-full border border-[#E5DCD3]">
                      {res.year}
                    </span>
                    <span className="text-xs font-mono text-rose font-semibold bg-rose/10 px-2.5 py-1 rounded-full">
                      {res.level}
                    </span>
                  </div>

                  <h3 className="font-serif text-[20px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-[13px] text-t-muted font-mono mb-4">
                    <em>{res.source}</em>
                  </p>

                  <p className="text-[14px] text-t-secondary leading-relaxed mb-4">
                    {res.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5DCD3]/60 text-[13px] text-rose font-medium flex items-center justify-between">
                  <span>View Study Breakdown</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Popular Myth Reviews */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-[32px] font-semibold text-t-primary">
              Popular Myth Fact-Checks
            </h2>
            <span className="text-[14px] text-t-muted">Most Viewed Fact-Checks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularMyths.map((m, idx) => (
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
                    "{m.question}"
                  </h3>

                  <p className="text-[14px] text-t-secondary leading-relaxed mb-6">
                    {m.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5DCD3]/60 text-[13px] text-rose font-semibold">
                  <span>Read Full Medical Verdict</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Newsletter Section */}
        <section className="p-10 md:p-14 rounded-[36px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-[0_8px_32px_rgba(44,38,35,0.04)] text-center max-w-[920px] mx-auto space-y-6">
          <span className="inline-block text-[12px] font-mono uppercase tracking-widest text-rose font-semibold bg-rose/10 px-3.5 py-1 rounded-full">
            Vera Editorial Dispatch
          </span>

          <h2 className="font-serif text-[36px] md:text-[44px] font-semibold text-t-primary leading-tight">
            Stay Informed with Evidence-Based Science
          </h2>

          <p className="text-[17px] text-t-secondary leading-[1.6] max-w-[620px] mx-auto">
            Receive monthly curated digests of new systematic reviews, debunked myths, and clinical breakthroughs directly from our medical panel.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-2xl bg-sage/15 text-sage font-medium text-[15px] inline-flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Thank you! You are subscribed to Vera's monthly editorial dispatch.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[540px] mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full h-[52px] px-5 rounded-full bg-[#FFF8F3] border border-[#E5DCD3] text-t-primary text-[15px] outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition-all"
              />
              <Button type="submit" size="lg" className="w-full sm:w-auto shrink-0 px-8 h-[52px]">
                Subscribe to Dispatch
              </Button>
            </form>
          )}

          <p className="text-xs text-t-muted">
            No spam. Unsubscribe at any time. Peer-reviewed content only.
          </p>
        </section>
      </div>
    </div>
  );
}
