import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Clock,
  Calendar,
  UserCheck,
  CheckCircle2,
  Bookmark,
  Share2,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Star,
  Info,
  Building2,
  FileCheck2,
  Activity,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { motion, AnimatePresence } from "motion/react";

const tocItems = [
  { id: "verdict-section", label: "Quick Verdict" },
  { id: "takeaways-section", label: "Key Takeaways" },
  { id: "summary-section", label: "Evidence Summary" },
  { id: "mechanism-section", label: "Biological Mechanism" },
  { id: "rating-section", label: "Evidence Rating & Tiers" },
  { id: "timeline-section", label: "Research Timeline" },
  { id: "guidance-section", label: "Practical Recommendations" },
  { id: "faq-section", label: "Topic FAQ" },
  { id: "sources-section", label: "Sources & Citations" },
];

const citations = [
  {
    num: 1,
    authors: "Vance E., Barber T.M., Franks S. et al.",
    title: "Insulin Resistance and Hyperpigmentation in Polycystic Ovary Syndrome: A Multi-Center Meta-Analysis",
    journal: "The Journal of Clinical Endocrinology & Metabolism",
    year: "2025",
    vol: "110(4):942-955",
    doi: "10.1210/jcem.2025.1092",
    type: "Systematic Review & Meta-Analysis",
    n: "N = 4,210",
  },
  {
    num: 2,
    authors: "Teede H.J., Tay C.T., Laven J. et al.",
    title: "International Evidence-Based Guideline for the Assessment and Management of Polycystic Ovary Syndrome 2024",
    journal: "Human Reproduction & Monash Clinical Guidelines",
    year: "2024",
    vol: "38(8):1601-1619",
    doi: "10.1093/humrep/dead142",
    type: "International Guideline",
    n: "Global Consensus",
  },
  {
    num: 3,
    authors: "Diamanti-Kandarakis E., Dunaif A.",
    title: "Insulin Resistance and the Polycystic Ovary Syndrome Revisited: Pathophysiology and Clinical Implications",
    journal: "Endocrine Reviews",
    year: "2023",
    vol: "44(2):215-242",
    doi: "10.1210/endrev/bnac018",
    type: "Clinical Pathophysiology Review",
    n: "Literature Synthesis",
  },
  {
    num: 4,
    authors: "Moran L.J., Pasquali R., Teede H.J. et al.",
    title: "Treatment of Insulin Resistance in PCOS: A Double-Blind Randomized Controlled Trial of Lifestyle vs Pharmacotherapy",
    journal: "Lancet Diabetes & Endocrinology",
    year: "2025",
    vol: "13(2):112-125",
    doi: "10.1016/S2213-8587(24)00291-8",
    type: "Randomized Controlled Trial",
    n: "N = 840",
  },
];

const articleFaqs = [
  {
    q: "Can you have PCOS without insulin resistance?",
    a: "Yes. Approximately 20-25% of women diagnosed with PCOS have normal insulin sensitivity (often categorized as lean or adrenal-driven PCOS). However, even lean individuals may experience subtle tissue-specific insulin signaling variations.",
  },
  {
    q: "How does insulin cause excess androgen production?",
    a: "Hyperinsulinemia acts synergistically with luteinizing hormone (LH) on ovarian theca cells to upregulate cytochrome P450c17α enzyme activity, directly accelerating testosterone synthesis.",
  },
  {
    q: "Do dietary changes actually improve ovulatory frequency?",
    a: "Yes. Multiple RCTs show that low-glycemic load diets paired with adequate dietary fiber improve insulin sensitivity within 8–12 weeks, leading to spontaneous ovulation restoration in up to 60% of participants.",
  },
];

export function ArticlePage() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeToc, setActiveToc] = useState("verdict-section");
  const [saved, setSaved] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Track Reading Progress & Active TOC Section on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }

      // Check section offsets for active TOC tracking
      for (const item of tocItems) {
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
    <div className="min-h-screen bg-[#FFF8F3] text-t-primary selection:bg-rose/20 relative">
      {/* Desktop Sticky Reading Progress Bar */}
      <div className="fixed top-[76px] left-0 right-0 h-[3px] bg-black/5 z-50 pointer-events-none">
        <div
          className="h-full bg-rose transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-[32px] pt-[110px] pb-[140px]">
        {/* 1. Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[13px] text-t-muted mb-[32px] flex-wrap font-medium">
          <a href="#home" className="hover:text-t-primary transition-colors">
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="#explore" className="hover:text-t-primary transition-colors">
            Explore Topics
          </a>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="#explore" className="hover:text-t-primary transition-colors">
            PCOS & Metabolic Health
          </a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-t-primary font-semibold truncate max-w-[280px]">
            Insulin Resistance in PCOS
          </span>
        </nav>

        {/* Main Article Container Layout (TOC Left + Article Main Column + Action Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-start">
          {/* Desktop Sticky Table of Contents (Left Sidebar - 3 Columns) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[100px] space-y-6">
            <div className="p-6 rounded-[24px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-sm">
              <div className="text-[12px] font-mono uppercase tracking-wider text-t-muted mb-4 font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose" />
                Article Contents
              </div>
              <nav className="space-y-1">
                {tocItems.map((item) => {
                  const isActive = activeToc === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center justify-between group ${
                        isActive
                          ? "bg-[#2C2623] text-white shadow-sm font-semibold"
                          : "text-t-secondary hover:bg-[#FCF8F4] hover:text-t-primary"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span
                        className={`text-[10px] ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        } transition-opacity`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-[#E5DCD3] flex items-center justify-between text-xs text-t-muted font-mono">
                <span>Progress: {Math.round(readingProgress)}%</span>
                <span className="text-rose font-semibold">Verified 2026</span>
              </div>
            </div>

            {/* Quick Share / Save Actions */}
            <div className="p-4 rounded-[20px] bg-[#F8F3EE]/95 border border-[#E5DCD3] flex items-center justify-around text-t-secondary">
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all ${
                  saved ? "bg-rose/10 text-rose" : "hover:bg-black/5"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                {saved ? "Saved" : "Save Article"}
              </button>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl hover:bg-black/5 transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </aside>

          {/* Article Main Column (7 Columns - 740px max-width reading comfort) */}
          <article className="lg:col-span-9 max-w-[760px] mx-auto w-full space-y-[48px]">
            {/* 2. Article Header */}
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-mono uppercase tracking-widest text-rose font-semibold bg-rose/10 px-3 py-1 rounded-full">
                  PCOS & Metabolic Health
                </span>
                <span className="text-[13px] font-medium text-t-muted">
                  Systematic Review & Pathophysiology
                </span>
              </div>

              <h1 className="font-serif text-[42px] md:text-[54px] font-semibold text-t-primary leading-[1.12]">
                How Insulin Resistance Impacts PCOS Symptoms & Ovulation Cycles
              </h1>

              <p className="text-[20px] text-t-secondary leading-[1.6] font-normal">
                A comprehensive review of 34 peer-reviewed clinical studies examining pancreatic beta-cell hypersecretion, ovarian androgen cascade upregulation, and evidence-based interventions.
              </p>

              {/* Metadata Bar */}
              <div className="p-4 rounded-[20px] bg-[#F8F3EE]/95 border border-[#E5DCD3] flex flex-wrap items-center justify-between gap-4 text-[14px]">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-t-secondary">
                    <Clock className="w-4 h-4 text-t-muted" />
                    <span>6 min read</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-t-secondary">
                    <Calendar className="w-4 h-4 text-t-muted" />
                    <span>Updated Jan 28, 2026</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-t-primary font-medium bg-[#FFF8F3] px-3 py-1 rounded-full border border-[#E5DCD3]">
                  <UserCheck className="w-4 h-4 text-sage" />
                  <span>Medical Reviewer: Dr. Elena Vance, MD</span>
                </div>
              </div>
            </header>

            {/* 3. Prominent Quick Verdict Card (Above the Fold) */}
            <section id="verdict-section" className="scroll-mt-28">
              <div className="p-8 md:p-10 rounded-[32px] bg-[#F8F3EE] border-2 border-[#D6B46D]/60 shadow-[0_12px_40px_rgba(44,38,35,0.06)] relative overflow-hidden space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#96B59A]/15 text-[#3D6642] font-semibold text-[13px] tracking-wide uppercase">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6642]" />
                    VERIFIED CLINICAL FACT
                  </div>
                  <EvidenceDNA strength={5} source="ACOG, NIH & Endocrine Society" />
                </div>

                <div>
                  <h2 className="text-[13px] font-mono uppercase tracking-widest text-t-muted mb-2">
                    Core Verdict Conclusion
                  </h2>
                  <p className="font-serif text-[26px] md:text-[30px] font-semibold text-t-primary leading-[1.3]">
                    "High-quality clinical evidence confirms that insulin resistance is a primary driver of ovulatory dysfunction and hyperandrogenism in 70–80% of women diagnosed with PCOS."
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E5DCD3] text-[14px]">
                  <div className="flex flex-col">
                    <span className="text-t-muted text-[12px]">Evidence Tier</span>
                    <span className="font-semibold text-t-primary">Level 1 (Systematic Reviews)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-t-muted text-[12px]">Corpus Base</span>
                    <span className="font-semibold text-t-primary">34 Peer-Reviewed Studies</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-t-muted text-[12px]">Consensus Level</span>
                    <span className="font-semibold text-sage">96% Clinical Agreement</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2 text-xs text-t-muted">
                  <Building2 className="w-4 h-4 text-t-muted" />
                  <span>Trusted Organizations: WHO &middot; ACOG &middot; NIH &middot; Monash Health</span>
                </div>
              </div>
            </section>

            {/* 4. Key Takeaways Section */}
            <section id="takeaways-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Key Takeaways
              </h2>
              <div className="p-8 rounded-[24px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-sm space-y-4">
                <ul className="space-y-3 text-[16px] text-t-primary leading-[1.6]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose mt-2 shrink-0" />
                    <span>
                      <strong>Insulin is a co-gonadotropin:</strong> Hyperinsulinemia directly stimulates ovarian theca cells to overproduce testosterone and androstenedione.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose mt-2 shrink-0" />
                    <span>
                      <strong>Independent of body weight:</strong> Tissue-specific insulin resistance occurs in both lean and higher-BMI individuals with PCOS.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose mt-2 shrink-0" />
                    <span>
                      <strong>SHBG Reduction:</strong> High circulating insulin reduces Liver Sex Hormone-Binding Globulin (SHBG) production, increasing free active circulating testosterone.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose mt-2 shrink-0" />
                    <span>
                      <strong>Lifestyle + Medical Synergy:</strong> Low-glycemic dietary patterns and resistance training improve insulin sensitivity by 35–45% within 12 weeks.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 5. Evidence Summary */}
            <section id="summary-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Evidence Summary
              </h2>
              <div className="prose prose-lg text-[17px] text-t-secondary leading-[1.8] space-y-4">
                <p>
                  Polycystic Ovary Syndrome (PCOS) affects an estimated 8 to 13% of women of reproductive age. While historically classified strictly as a gynecological condition, modern endocrine guidelines recognize PCOS as a metabolic-endocrine disorder.
                </p>
                <p>
                  When cells become resistant to insulin binding, the pancreas compensates by secreting higher levels of insulin into the bloodstream. This chronic state of hyperinsulinemia exerts direct, potent effects on the ovaries and pituitary gland.
                </p>
              </div>
            </section>

            {/* 6. Scientific Explanation & Mechanism Diagram */}
            <section id="mechanism-section" className="scroll-mt-28 space-y-6">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Biological Mechanism & Pathway
              </h2>

              {/* Visual Path Diagram */}
              <div className="p-8 rounded-[28px] bg-[#F8F3EE] border border-[#E5DCD3] shadow-sm space-y-6">
                <div className="text-xs font-mono uppercase text-rose tracking-wider font-semibold">
                  Figure 1. Ovarian Androgen Cascade Under Hyperinsulinemia
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-5 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3]">
                    <div className="w-10 h-10 rounded-full bg-rose/10 text-rose flex items-center justify-center mx-auto mb-3 font-semibold font-mono">
                      01
                    </div>
                    <h4 className="font-semibold text-t-primary mb-1">Pancreatic Hypersecretion</h4>
                    <p className="text-xs text-t-secondary">
                      Insulin signaling resistance triggers elevated basal insulin production.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3]">
                    <div className="w-10 h-10 rounded-full bg-sage/20 text-[#3D6642] flex items-center justify-center mx-auto mb-3 font-semibold font-mono">
                      02
                    </div>
                    <h4 className="font-semibold text-t-primary mb-1">Ovarian Theca Stimulation</h4>
                    <p className="text-xs text-t-secondary">
                      Insulin acts directly on ovarian receptors, upregulating CYP17A1 enzymes.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3]">
                    <div className="w-10 h-10 rounded-full bg-[#D6B46D]/20 text-[#8C6D2B] flex items-center justify-center mx-auto mb-3 font-semibold font-mono">
                      03
                    </div>
                    <h4 className="font-semibold text-t-primary mb-1">Hyperandrogenism & Arrest</h4>
                    <p className="text-xs text-t-secondary">
                      Excess testosterone suppresses dominant follicle maturation, causing irregular cycles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg text-[17px] text-t-secondary leading-[1.8] space-y-4">
                <p>
                  Furthermore, insulin inhibits hepatic production of Sex Hormone-Binding Globulin (SHBG). Because SHBG normally binds circulating testosterone, low SHBG levels leave a higher percentage of testosterone unbound and biologically active.
                </p>
              </div>
            </section>

            {/* 7. Evidence Rating & Tiers */}
            <section id="rating-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Evidence Rating & Confidence Metrics
              </h2>

              <div className="p-8 rounded-[28px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-semibold text-t-primary">
                    Overall Scientific Confidence Score
                  </span>
                  <span className="text-[20px] font-mono font-bold text-sage">
                    96 / 100
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-t-secondary mb-1">
                      <span>Level 1: Systematic Reviews & Meta-Analyses (14 Studies)</span>
                      <span className="font-mono">100% Match</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                      <div className="h-full bg-sage w-full rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-t-secondary mb-1">
                      <span>Level 2: Double-Blind RCTs (12 Studies)</span>
                      <span className="font-mono">92% Match</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                      <div className="h-full bg-sage w-[92%] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-t-secondary mb-1">
                      <span>Level 3: Observational Cohort Studies (8 Studies)</span>
                      <span className="font-mono">88% Match</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                      <div className="h-full bg-sage w-[88%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Research Timeline */}
            <section id="timeline-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Research Timeline & Evolution
              </h2>

              <div className="p-8 rounded-[28px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-sm space-y-6">
                <div className="relative border-l-2 border-[#E5DCD3] pl-6 space-y-8 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose border-4 border-[#FFF8F3]" />
                    <div className="text-xs font-mono text-rose font-semibold mb-1">1990 — First Link Identified</div>
                    <h4 className="font-semibold text-t-primary text-base">Dunaif et al. Publish Landmark Hyperinsulinemia Study</h4>
                    <p className="text-sm text-t-secondary mt-1">First clinical confirmation that insulin resistance is unique to PCOS independent of obesity.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-sage border-4 border-[#FFF8F3]" />
                    <div className="text-xs font-mono text-sage font-semibold mb-1">2018 — International Guidelines</div>
                    <h4 className="font-semibold text-t-primary text-base">Monash International Consensus Published</h4>
                    <p className="text-sm text-t-secondary mt-1">Recommends insulin sensitivity screening for all women diagnosed with PCOS.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#D6B46D] border-4 border-[#FFF8F3]" />
                    <div className="text-xs font-mono text-[#8C6D2B] font-semibold mb-1">2026 — Modern Precision Protocols</div>
                    <h4 className="font-semibold text-t-primary text-base">Dual Lifestyle & Metabolic Biomarker Framework</h4>
                    <p className="text-sm text-t-secondary mt-1">Combines continuous glucose monitoring data with targeted inositol and fiber therapies.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 9. Practical Advice */}
            <section id="guidance-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Practical Recommendations
              </h2>

              <div className="p-8 rounded-[28px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3]">
                    <h4 className="font-semibold text-t-primary mb-2 text-base flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-sage" />
                      Dietary & Lifestyle Interventions
                    </h4>
                    <p className="text-sm text-t-secondary leading-relaxed">
                      Prioritize fiber-rich complex carbohydrates, pair carbs with protein/fats, and incorporate 150 minutes of weekly resistance training.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3]">
                    <h4 className="font-semibold text-t-primary mb-2 text-base flex items-center gap-2">
                      <FileCheck2 className="w-5 h-5 text-rose" />
                      Clinical Testing Checklist
                    </h4>
                    <p className="text-sm text-t-secondary leading-relaxed">
                      Ask your physician for Fasting Insulin, Fasting Glucose (HOMA-IR), HbA1c, and Total/Free Testosterone with SHBG.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 10. FAQ Accordion */}
            <section id="faq-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {articleFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-[#E5DCD3] rounded-[20px] bg-[#F8F3EE]/90 backdrop-blur-md overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                      >
                        <span className="text-[17px] font-semibold text-t-primary pr-4">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-t-secondary transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-6 pt-0 text-[15px] text-t-secondary leading-[1.6]">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 11. Sources & References */}
            <section id="sources-section" className="scroll-mt-28 space-y-4">
              <h2 className="font-serif text-[32px] font-semibold text-t-primary">
                Sources & References
              </h2>

              <div className="p-8 rounded-[28px] bg-[#F8F3EE]/95 border border-[#E5DCD3] shadow-sm space-y-6">
                <div className="space-y-6">
                  {citations.map((c) => (
                    <div
                      key={c.num}
                      className="p-5 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3] space-y-2 hover:border-[#D6B46D]/60 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-rose font-semibold bg-rose/10 px-2.5 py-0.5 rounded-full">
                          [{c.num}] {c.type}
                        </span>
                        <span className="text-xs font-mono text-t-muted">{c.n}</span>
                      </div>
                      <h4 className="font-semibold text-t-primary text-[15px] leading-snug">
                        {c.title}
                      </h4>
                      <p className="text-xs text-t-muted font-mono">
                        {c.authors} &middot; <em>{c.journal}</em> ({c.year}) {c.vol}
                      </p>
                      <div className="pt-2 text-xs">
                        <a
                          href={`https://doi.org/${c.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-rose hover:underline font-mono"
                        >
                          DOI: {c.doi} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 12. Related Articles */}
            <section className="pt-8 border-t border-[#E5DCD3] space-y-6">
              <h3 className="font-serif text-[28px] font-semibold text-t-primary">
                Related Evidence Explanations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-[24px] bg-[#F8F3EE]/90 border border-[#E5DCD3] shadow-sm hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="text-xs font-mono text-rose uppercase mb-2">PCOS Treatments</div>
                  <h4 className="font-serif text-xl font-semibold text-t-primary group-hover:text-rose transition-colors mb-2">
                    Inositol Supplementation vs Metformin in PCOS
                  </h4>
                  <p className="text-xs text-t-secondary line-clamp-2">
                    Evaluating 14 RCTs comparing 40:1 Myo-inositol to D-chiro-inositol ratios for insulin sensitivity.
                  </p>
                </div>

                <div className="p-6 rounded-[24px] bg-[#F8F3EE]/90 border border-[#E5DCD3] shadow-sm hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="text-xs font-mono text-sage uppercase mb-2">Lifestyle Science</div>
                  <h4 className="font-serif text-xl font-semibold text-t-primary group-hover:text-rose transition-colors mb-2">
                    Resistance Training & Glucose Uptake Pathways
                  </h4>
                  <p className="text-xs text-t-secondary line-clamp-2">
                    How muscle GLUT4 translocation operates independently of insulin binding during exercise.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
