import React, { useState, useEffect } from "react";
import {
  Droplets,
  Activity,
  Sparkles,
  Wind,
  Brain,
  Moon,
  ArrowRight,
  ChevronRight,
  Clock,
  Calendar,
  Layers,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Building2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { useNavigation } from "@/context/NavigationContext";
import { motion } from "motion/react";

const topicTocItems = [
  { id: "overview-section", label: "Overview & Facts" },
  { id: "questions-section", label: "Common Questions" },
  { id: "symptoms-section", label: "Symptom Taxonomy" },
  { id: "guides-section", label: "Evidence-Based Guides" },
  { id: "myths-section", label: "Myth Verdicts" },
  { id: "research-section", label: "Latest Research Timeline" },
  { id: "related-section", label: "Related Conditions & Topics" },
];

const quickFacts = [
  {
    label: "Global Prevalence",
    value: "8–13%",
    sub: "Of women of reproductive age worldwide (WHO Data)",
  },
  {
    label: "Insulin Link",
    value: "70–80%",
    sub: "Exhibit tissue-specific insulin sensitivity shifts",
  },
  {
    label: "Subfertility Driver",
    value: "#1 Cause",
    sub: "Leading cause of anovulatory cycle variations",
  },
  {
    label: "Protocol Efficacy",
    value: "45% Reduction",
    sub: "In symptom severity via targeted metabolic protocols",
  },
];

const commonQuestions = [
  "Can you have PCOS with regular 28-day periods?",
  "How does inositol compare to metformin in RCTs?",
  "Does PCOS cause permanent ovarian damage?",
  "What is the difference between adrenal and insulin PCOS?",
  "How does sleep architecture affect progesterone in PCOS?",
];

const symptomGrid = [
  {
    name: "Irregular Cycles & Anovulation",
    icon: Droplets,
    desc: "Delayed or absent ovulation due to elevated luteinizing hormone (LH) to FSH ratios.",
    frequency: "Common (75%)",
  },
  {
    name: "Hyperandrogenism & Acne",
    icon: Sparkles,
    desc: "Persistent jawline or cystic breakout patterns triggered by unbound free testosterone.",
    frequency: "Very Common (82%)",
  },
  {
    name: "Hair Thinning / Alopecia",
    icon: Wind,
    desc: "Androgenic hair follicle miniaturization at the vertex and crown areas.",
    frequency: "Moderate (40%)",
  },
  {
    name: "Insulin & Metabolic Shifts",
    icon: Activity,
    desc: "Difficulty regulating blood glucose, post-prandial fatigue, and central weight changes.",
    frequency: "Common (70%)",
  },
  {
    name: "Hormonal Mood Fluctuations",
    icon: Brain,
    desc: "Anxiety and depressive symptoms secondary to neuroendocrine signaling shifts.",
    frequency: "Common (65%)",
  },
  {
    name: "Sleep Disruption & Fatigue",
    icon: Moon,
    desc: "Increased incidence of sleep apnea and delayed REM sleep architecture.",
    frequency: "Moderate (50%)",
  },
];

const topicGuides = [
  {
    title: "PCOS & Insulin Resistance: The Complete 2026 Clinical Breakdown",
    category: "Pathophysiology",
    readTime: "6 min read",
    updated: "Jan 2026",
    strength: 5 as const,
    source: "Systematic Review",
    snippet: "Detailed analysis of pancreatic beta-cell hypersecretion and how insulin directly stimulates ovarian theca cell testosterone synthesis.",
  },
  {
    title: "Myo-Inositol vs Metformin: Meta-Analysis of Ovulation Rates",
    category: "Treatment Evidence",
    readTime: "5 min read",
    updated: "Dec 2025",
    strength: 5 as const,
    source: "RCT Meta-Analysis",
    snippet: "Comparing 40:1 Myo-inositol to D-chiro-inositol ratios against 1500mg Metformin for menstrual cycle regularity.",
  },
  {
    title: "Dietary Fibers & Glycemic Load Impact on Ovarian Follicles",
    category: "Nutrition Science",
    readTime: "4 min read",
    updated: "Jan 2026",
    strength: 4 as const,
    source: "Clinical Study",
    snippet: "How high-solubility fiber interventions reduce postprandial glucose spikes and improve LH secretion patterns.",
  },
];

const topicMyths = [
  {
    statement: "PCOS means you can never get pregnant naturally.",
    verdict: "FALSE — 96% Scientific Confidence",
    strength: 5 as const,
    source: "ACOG & Monash Guidelines",
    expl: "PCOS causes ovulatory delay, not egg depletion. Ovulation induction and lifestyle protocols restore natural conception rates in over 75% of women.",
  },
  {
    statement: "You must completely eliminate all carbohydrates to manage PCOS.",
    verdict: "FALSE — 92% Scientific Confidence",
    strength: 4 as const,
    source: "Journal of Clinical Nutrition",
    expl: "Carbohydrate quality (low-glycemic, fiber-rich) and meal composition matter far more than extreme carbohydrate restriction.",
  },
];

export function TopicPage() {
  const { navigate, navigateTo } = useNavigation();
  const [activeToc, setActiveToc] = useState("overview-section");

  // Track active TOC on scroll
  useEffect(() => {
    const handleScroll = () => {
      for (const item of topicTocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 100) {
            setActiveToc(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-t-primary pt-[110px] pb-[140px] selection:bg-rose/20 relative">
      {/* Background line art watermark */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none -z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1280 1200" fill="none" stroke="#2C2623" strokeWidth="0.8">
          <circle cx="200" cy="200" r="140" strokeDasharray="4 4" />
          <path d="M 150 150 Q 250 250 150 350" strokeDasharray="3 3" />
          <text x="70" y="50" fontSize="10" fontFamily="serif" fill="#2C2623">
            VERA TOPIC INDEX — PCOS (CLINICAL CORPUS)
          </text>
        </svg>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-[32px]">
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[13px] text-t-muted mb-[28px] flex-wrap font-medium">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="hover:text-t-primary transition-colors">
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="/explore" onClick={(e) => { e.preventDefault(); navigate("/explore"); }} className="hover:text-t-primary transition-colors">
            Explore
          </a>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="/topics" onClick={(e) => { e.preventDefault(); navigate("/topics"); }} className="hover:text-t-primary transition-colors">
            Topics
          </a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-t-primary font-semibold">
            Polycystic Ovary Syndrome (PCOS)
          </span>
        </nav>

        {/* 2. Topic Hero */}
        <header className="mb-[48px] p-8 md:p-12 rounded-[32px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-[0_8px_32px_rgba(44,38,35,0.05)] relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-[12px] font-mono uppercase tracking-widest text-rose font-semibold bg-rose/10 px-3.5 py-1 rounded-full">
              Endocrine & Metabolic Knowledge Hub
            </span>
            <EvidenceDNA strength={5} source="ACOG & Monash Guidelines" />
          </div>

          <h1 className="font-serif text-[42px] md:text-[56px] font-semibold text-t-primary leading-[1.1] mb-[16px]">
            Polycystic Ovary Syndrome (PCOS)
          </h1>

          <p className="text-[18px] text-t-secondary max-w-[800px] leading-[1.6] mb-[28px]">
            A comprehensive evidence hub synthesizing 86 peer-reviewed clinical studies, diagnostic criteria (Rotterdam), metabolic interventions, and verified health myth breakdowns.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E5DCD3] text-[14px] text-t-muted font-medium">
            <span>📚 86 Verified Articles</span>
            <span>&middot;</span>
            <span>✨ 14 Myths Debunked</span>
            <span>&middot;</span>
            <span>📅 Last Updated: Jan 2026</span>
          </div>
        </header>

        {/* Layout Grid (Sticky Sidebar Left + Main Content Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-start">
          {/* Desktop Sticky Sidebar (3 Columns) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[100px] space-y-6">
            <div className="p-6 rounded-[24px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-sm">
              <div className="text-[12px] font-mono uppercase tracking-wider text-t-muted mb-4 font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose" />
                Hub Navigation
              </div>
              <nav className="space-y-1">
                {topicTocItems.map((item) => {
                  const isActive = activeToc === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all flex items-center justify-between group ${
                        isActive
                          ? "bg-[#2C2623] text-white shadow-sm font-semibold"
                          : "text-t-secondary hover:bg-[#FCF8F4] hover:text-t-primary"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span className={`text-[10px] ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                        →
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <Button
              variant="secondary"
              className="w-full justify-center gap-2"
              onClick={() => navigate("/search")}
            >
              <Search className="w-4 h-4" /> Search PCOS Studies
            </Button>
          </aside>

          {/* Main Content Column (9 Columns) */}
          <main className="lg:col-span-9 space-y-[64px]">
            {/* 3. Quick Facts (4 Statistic Cards) */}
            <section id="overview-section" className="scroll-mt-28 space-y-6">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Quick Facts & Key Metrics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[12px] font-mono uppercase text-t-muted font-semibold block mb-1">
                        {fact.label}
                      </span>
                      <span className="font-serif text-[36px] font-bold text-t-primary leading-tight block mb-2">
                        {fact.value}
                      </span>
                    </div>
                    <p className="text-[13px] text-t-secondary leading-snug">
                      {fact.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Overview text */}
              <div className="p-8 rounded-[28px] bg-[#F8F3EE]/95 border border-[#E5DCD3] space-y-4">
                <h3 className="font-serif text-[24px] font-semibold text-t-primary">
                  Understanding Polycystic Ovary Syndrome
                </h3>
                <p className="text-[16px] text-t-secondary leading-[1.7]">
                  PCOS is characterized by a combination of hyperandrogenism, ovulatory dysfunction, and polycystic ovarian morphology on ultrasound (Rotterdam Criteria requires 2 of 3). Insulin resistance plays a central pathophysiological role in both lean and higher-BMI presentations.
                </p>
                <div className="pt-2">
                  <Button onClick={() => navigate("/articles/does-lemon-water-delay-periods")}>
                    Read Full Diagnostic & Treatment Guide <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </section>

            {/* 5. Common Questions (Large Pill Buttons) */}
            <section id="questions-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Common Patient & Clinical Questions
              </h2>

              <div className="space-y-3">
                {commonQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate("/articles/does-lemon-water-delay-periods")}
                    className="w-full text-left p-5 rounded-[20px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-[17px] font-semibold text-t-primary group-hover:text-rose transition-colors">
                      "{q}"
                    </span>
                    <span className="text-[13px] text-rose font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Analysis <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* 6. Symptoms Section (Icon Grid) */}
            <section id="symptoms-section" className="scroll-mt-28 space-y-6">
              <div>
                <span className="text-[12px] font-mono text-rose uppercase tracking-widest font-semibold">
                  Diagnostic Markers
                </span>
                <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                  Symptom Taxonomy & Manifestations
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {symptomGrid.map((sym, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-sm hover:border-[#D6B46D]/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#FFF8F3] border border-[#E5DCD3] flex items-center justify-center text-t-primary">
                          <sym.icon className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <span className="text-[11px] font-mono text-t-muted bg-black/5 px-2.5 py-1 rounded-full">
                          {sym.frequency}
                        </span>
                      </div>
                      <h4 className="font-semibold text-t-primary text-[18px] mb-2">
                        {sym.name}
                      </h4>
                      <p className="text-[14px] text-t-secondary leading-relaxed mb-4">
                        {sym.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. Evidence-Based Guides */}
            <section id="guides-section" className="scroll-mt-28 space-y-6">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Curated Evidence Guides
              </h2>

              <div className="space-y-4">
                {topicGuides.map((guide, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate("/articles/does-lemon-water-delay-periods")}
                    className="p-7 rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-sm hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-rose font-semibold bg-rose/10 px-2.5 py-0.5 rounded-full">
                          {guide.category}
                        </span>
                        <EvidenceDNA strength={guide.strength} source={guide.source} />
                      </div>

                      <h3 className="font-serif text-[24px] font-semibold text-t-primary group-hover:text-rose transition-colors mb-2">
                        {guide.title}
                      </h3>

                      <p className="text-[15px] text-t-secondary leading-relaxed mb-4">
                        {guide.snippet}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E5DCD3]/60 text-[13px] text-t-muted">
                      <span>{guide.readTime} &middot; Updated {guide.updated}</span>
                      <span className="text-rose font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Guide <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Common Myths Section */}
            <section id="myths-section" className="scroll-mt-28 space-y-6">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                PCOS Myth Verdicts
              </h2>

              <div className="space-y-4">
                {topicMyths.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-7 rounded-[24px] bg-[#F8F3EE]/95 border-2 border-[#D6B46D]/40 shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold uppercase bg-rose/15 text-rose px-3 py-1 rounded-full">
                        {m.verdict}
                      </span>
                      <EvidenceDNA strength={m.strength} source={m.source} />
                    </div>

                    <h3 className="font-serif text-[22px] font-semibold text-t-primary">
                      "{m.statement}"
                    </h3>

                    <p className="text-[15px] text-t-secondary leading-relaxed">
                      {m.expl}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => navigate("/myths/lemon-water-delays-periods")}
                        className="text-sm font-semibold text-rose hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        Read Full Myth Review &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. Research Timeline */}
            <section id="research-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Recent Clinical Trial Timeline
              </h2>

              <div className="p-8 rounded-[28px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-sm space-y-6">
                <div className="relative border-l-2 border-[#E5DCD3] pl-6 space-y-6 ml-2">
                  <div>
                    <div className="text-xs font-mono text-rose font-semibold mb-1">Jan 2026 — Monash Guidelines Update</div>
                    <h4 className="font-semibold text-t-primary">Revised Fasting Insulin & Inositol Dosing Thresholds</h4>
                    <p className="text-sm text-t-secondary mt-1">Updated international panel consensus on early non-pharmacological first-line interventions.</p>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-sage font-semibold mb-1">Nov 2025 — RCT Meta-Analysis</div>
                    <h4 className="font-semibold text-t-primary">Continuous Glucose Monitoring in PCOS Management</h4>
                    <p className="text-sm text-t-secondary mt-1">Demonstrated 28% improvement in glycemic variability awareness and dietary adherence.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 11. Related Topics */}
            <section id="related-section" className="scroll-mt-28 space-y-4">
              <h3 className="font-serif text-[26px] font-semibold text-t-primary">
                Related Topics & Pathways
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {["Fertility", "Insulin Resistance", "Nutrition", "Hormone Balance", "Perimenopause", "Gut Microbiome"].map(
                  (topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate("/topics")}
                      className="px-5 py-2.5 rounded-full bg-[#F8F3EE] border border-[#E5DCD3] text-t-primary text-sm font-medium hover:border-[#D6B46D] hover:bg-[#FCF8F4] transition-all cursor-pointer shadow-sm"
                    >
                      {topic} &rarr;
                    </button>
                  )
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
