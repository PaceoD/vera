import React, { useState } from "react";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  UserCheck,
  FileCheck2,
  RefreshCw,
  Building2,
  Mail,
  MessageSquare,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Search,
  Scale,
  Send,
  HelpCircle,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { useNavigation } from "@/context/NavigationContext";
import { motion, AnimatePresence } from "motion/react";

// Editorial Process Workflow (7 Steps)
const editorialWorkflow = [
  { step: "01", name: "Medical Question", desc: "Formulated from real patient inquiries, viral health claims, or emerging clinical queries." },
  { step: "02", name: "Research Collection", desc: "Exhaustive PubMed, Cochrane Library, and Medline database retrieval." },
  { step: "03", name: "Evidence Review", desc: "Rigorous grading of trial methodologies, sample sizes, and potential bias." },
  { step: "04", name: "Medical Verification", desc: "Dual independent review by board-certified MDs and PhD researchers." },
  { step: "05", name: "Plain Language Writing", desc: "Translating complex biochemical jargon into clear, accessible editorial guides." },
  { step: "06", name: "Publication", desc: "Published with full DOI citations, reviewer seals, and evidence confidence ratings." },
  { step: "07", name: "Continuous Updates", desc: "Quarterly automated literature audits to integrate new trial findings." },
];

// Medical Review Board
const medicalBoard = [
  {
    name: "Dr. Elena Vance, MD",
    role: "Chief Medical Officer & Gynecological Endocrinologist",
    institution: "Johns Hopkins Medicine & Clinical Faculty",
    specialty: "Reproductive Endocrinology, PCOS & Insulin Resistance",
    avatar: "EV",
    bio: "Over 18 years of clinical practice and author of 40+ peer-reviewed papers on female endocrine regulation.",
  },
  {
    name: "Dr. Sophia Lin, PhD",
    role: "Lead Neuroendocrinologist",
    institution: "Stanford University School of Medicine",
    specialty: "HPA Axis Signaling, Cortisol & Circadian Rhythms",
    avatar: "SL",
    bio: "Focuses on stress hormone signaling pathways, sleep architecture, and neurosteroid modulation in women.",
  },
  {
    name: "Dr. Marcus Thorne, MD, FACOG",
    role: "Obstetrics & Maternal-Fetal Medicine Specialist",
    institution: "Harvard Medical School Teaching Hospital",
    specialty: "Maternal Health, Placental Physiology & Perimenopause",
    avatar: "MT",
    bio: "Senior clinical advisor with extensive experience in high-risk pregnancy protocols and HRT evidence.",
  },
  {
    name: "Dr. Amara Okafor, PharmD",
    role: "Clinical Pharmacologist & Botanical Specialist",
    institution: "University of California, San Francisco (UCSF)",
    specialty: "Supplement Kinetics, Drug Interactions & Metabolism",
    avatar: "AO",
    bio: "Expert on botanical interaction safety, micronutrient bioavailability, and dietary supplement quality control.",
  },
];

// Evidence Hierarchy (5 Levels)
const evidenceHierarchy = [
  {
    level: "Level 1",
    rating: 5,
    title: "Systematic Reviews & Meta-Analyses",
    desc: "The gold standard. Pooled data from multiple high-quality randomized controlled trials (RCTs) with minimal bias.",
    color: "border-[#6B8E6F] bg-[#6B8E6F]/10 text-[#3D6642]",
  },
  {
    level: "Level 2",
    rating: 4,
    title: "Double-Blind Randomized Controlled Trials (RCTs)",
    desc: "Prospective experimental trials with control groups, placebo blinding, and randomized patient allocation.",
    color: "border-[#8A71B5] bg-[#8A71B5]/10 text-[#6B4E99]",
  },
  {
    level: "Level 3",
    rating: 3,
    title: "Prospective Observational Cohort Studies",
    desc: "Longitudinal tracking of population outcomes over time to identify risk factors and clinical correlations.",
    color: "border-[#D6B46D] bg-[#D6B46D]/15 text-[#8C6D2B]",
  },
  {
    level: "Level 4",
    rating: 2,
    title: "Mechanistic & In-Vitro / Animal Studies",
    desc: "Biochemical laboratory pathways explaining biological plausibility, though requiring human clinical validation.",
    color: "border-[#C48A91] bg-[#C48A91]/15 text-[#B77A82]",
  },
  {
    level: "Level 5",
    rating: 1,
    title: "Expert Clinical Opinion & Case Reports",
    desc: "Descriptive case reports or consensus opinions from individual clinicians without randomized trial backing.",
    color: "border-t-muted bg-black/5 text-t-muted",
  },
];

// Transparency Principles (6 Cards)
const transparencyPrinciples = [
  {
    title: "No Sponsored Content",
    desc: "Vera accepts zero advertising or sponsorship dollars from pharmaceutical, supplement, or wellness brands. Our editorial calendar is 100% independent.",
    icon: ShieldCheck,
  },
  {
    title: "Evidence-First Publishing",
    desc: "Every recommendation must be grounded in peer-reviewed clinical research. If clinical trial data is inconclusive, we explicitly state it.",
    icon: Scale,
  },
  {
    title: "Dual Medical Verification",
    desc: "No article or myth review is published without review and approval by at least one board-certified MD and one PhD specialist.",
    icon: UserCheck,
  },
  {
    title: "Source Transparency",
    desc: "We link directly to primary PubMed abstracts, DOIs, and institutional guidelines for every statistic and medical statement.",
    icon: ExternalLink,
  },
  {
    title: "Continuous Literature Audits",
    desc: "Our automated monitoring pipeline flags new landmark studies, triggering immediate medical board re-evaluations of existing guides.",
    icon: RefreshCw,
  },
  {
    title: "Public Corrections Protocol",
    desc: "If new evidence disproves a previous conclusion or if an error is identified, we issue transparent public correction logs with full change histories.",
    icon: AlertCircle,
  },
];

// Methodology FAQ
const trustFaqs = [
  {
    q: "How does Vera select which studies to include in an article?",
    a: "We prioritize Level 1 Systematic Reviews and large-scale Double-Blind RCTs indexed in MEDLINE, PubMed, and Cochrane Library. Studies with small sample sizes, unblinded designs, or industry conflict-of-interest funding are flagged and critically weighted.",
  },
  {
    q: "Does Vera accept financial compensation from supplement or drug companies?",
    a: "No. Vera operates with strict commercial independence. We accept zero affiliate links, sponsored articles, or brand sponsorships from pharmaceutical or dietary supplement manufacturers.",
  },
  {
    q: "How often are existing guides updated?",
    a: "All core topic hubs and evidence guides undergo scheduled medical board reviews every 6 months. In addition, automated daily scrapers notify our medical desk whenever major clinical guidelines (ACOG, WHO, Endocrine Society) are updated.",
  },
  {
    q: "Who writes and reviews Vera's medical content?",
    a: "Content is authored by professional medical science writers and must be dual-reviewed and approved by board-certified physicians (MD) and doctoral researchers (PhD) prior to publication.",
  },
];

// Contact Cards
const contactCards = [
  {
    title: "General Support",
    email: "support@verahealth.org",
    desc: "Questions about navigating our scientific library or accessing guides.",
    icon: Mail,
  },
  {
    title: "Academic Partnerships",
    email: "partnerships@verahealth.org",
    desc: "Collaborations with medical institutions, universities, and researchers.",
    icon: Building2,
  },
  {
    title: "Media & Press Desk",
    email: "press@verahealth.org",
    desc: "Press inquiries, expert commentary requests, and medical data citations.",
    icon: MessageSquare,
  },
  {
    title: "Report an Error / Correction",
    email: "corrections@verahealth.org",
    desc: "Submit a scientific correction or flag a newly published trial.",
    icon: AlertCircle,
  },
];

export function TrustPage() {
  const { navigate } = useNavigation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [reportSent, setReportSent] = useState(false);
  const [reportText, setReportText] = useState("");

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportText.trim()) {
      setReportSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F4] text-t-primary pt-[110px] pb-[140px] selection:bg-rose/20 relative">
      {/* Background Paper Texture & Subtle Watermark */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none -z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1280 1600" fill="none" stroke="#2C2623" strokeWidth="0.8">
          <path d="M 120 180 C 240 340, 340 500, 200 680 M 1100 240 C 1020 440, 1150 720, 1020 980" strokeDasharray="4 4" />
          <circle cx="640" cy="500" r="400" strokeDasharray="2 6" />
          <text x="125" y="170" fontSize="10" fontFamily="serif" fill="#2C2623">VERA TRUST CENTER — METHODOLOGY & TRANSPARENCY</text>
        </svg>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-[32px] space-y-[96px]">
        {/* 1. Hero */}
        <header className="text-center max-w-[840px] mx-auto pt-[24px] space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F1EB] border border-[#E5DCD3] text-t-muted text-[13px] font-mono uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-sage" />
            Editorial Transparency & Trust Center
          </div>

          <h1 className="font-serif text-[52px] md:text-[68px] font-semibold text-t-primary leading-[1.08] tracking-tight">
            Why Trust Vera
          </h1>

          <p className="text-[20px] md:text-[22px] text-t-secondary leading-[1.6] max-w-[720px] mx-auto font-light">
            Democratizing evidence-based women's health through rigorous clinical review, transparent methodology, and zero commercial bias.
          </p>
        </header>

        {/* 2. Mission Section */}
        <section className="p-10 md:p-14 rounded-[36px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-[0_8px_32px_rgba(44,38,35,0.04)] relative overflow-hidden">
          <div className="max-w-[880px] mx-auto space-y-6">
            <span className="text-[12px] font-mono text-rose uppercase tracking-widest font-semibold">
              Our Core Purpose
            </span>
            <h2 className="font-serif text-[36px] md:text-[44px] font-semibold text-t-primary leading-tight">
              Bridging the Gap Between Medical Journals and Women's Daily Health Decisions
            </h2>
            <div className="space-y-4 text-[17px] text-t-secondary leading-[1.7] font-light">
              <p>
                Women's health has historically suffered from two major crises: <strong>medical research underrepresentation</strong> and <strong>widespread online misinformation</strong>. For decades, health information online has been dominated by unverified wellness trends, sponsored product pitches, or overly dense clinical jargon.
              </p>
              <p>
                Vera was founded to solve this problem. We operate as an independent scientific publication—applying the rigorous peer-review standards of top medical journals to consumer health content. We believe every woman deserves access to uncompromised, evidence-based health clarity.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Editorial Process (Visual Workflow) */}
        <section className="space-y-8">
          <div className="text-center max-w-[720px] mx-auto">
            <span className="text-[12px] font-mono text-t-muted uppercase tracking-widest font-semibold">
              Clinical Quality Control
            </span>
            <h2 className="font-serif text-[36px] md:text-[44px] font-semibold text-t-primary mb-3">
              Our 7-Step Editorial & Review Workflow
            </h2>
            <p className="text-[16px] text-t-secondary">
              Every guide and myth review passes through seven strict medical verification gates before publication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {editorialWorkflow.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm flex flex-col justify-between hover:border-[#D6B46D]/60 transition-all group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF8F3] border border-[#E5DCD3] flex items-center justify-center font-mono font-bold text-rose text-sm">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-[20px] font-semibold text-t-primary group-hover:text-rose transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[14px] text-t-secondary leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                {idx < editorialWorkflow.length - 1 && (
                  <div className="pt-4 text-xs font-mono text-t-muted flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Next Gate</span> <ArrowRight className="w-3.5 h-3.5 text-rose" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. Medical Review Board */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-[12px] font-mono text-rose uppercase tracking-widest font-semibold">
                Clinical Oversight
              </span>
              <h2 className="font-serif text-[36px] md:text-[44px] font-semibold text-t-primary">
                Our Medical Review Board
              </h2>
            </div>
            <p className="text-[15px] text-t-secondary max-w-[480px]">
              Distinguished physicians, endocrinologists, and pharmacologists who evaluate every claim for clinical accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medicalBoard.map((doc, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[32px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 transition-all flex flex-col sm:flex-row items-start gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2C2623] text-white flex items-center justify-center font-serif text-[24px] font-semibold shrink-0 shadow-md border-2 border-[#D6B46D]/60">
                  {doc.avatar}
                </div>

                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <h3 className="font-serif text-[24px] font-semibold text-t-primary leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-mono text-rose font-semibold">
                      {doc.role}
                    </p>
                    <p className="text-xs text-t-muted font-medium">
                      {doc.institution}
                    </p>
                  </div>

                  <div className="text-xs font-mono bg-black/5 px-2.5 py-1 rounded-full text-t-secondary inline-block">
                    Specialty: {doc.specialty}
                  </div>

                  <p className="text-[14.5px] text-t-secondary leading-relaxed font-light pt-1">
                    {doc.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Evidence Hierarchy Standards */}
        <section className="space-y-8">
          <div className="text-center max-w-[760px] mx-auto space-y-2">
            <span className="text-[12px] font-mono text-t-muted uppercase tracking-widest font-semibold">
              Scientific Rigor
            </span>
            <h2 className="font-serif text-[36px] md:text-[44px] font-semibold text-t-primary">
              Vera EvidenceDNA™ Hierarchy
            </h2>
            <p className="text-[16px] text-t-secondary font-light">
              We grade every clinical source against standard epidemiological evidence pyramids so you know exactly how strong the science is.
            </p>
          </div>

          <div className="space-y-4 max-w-[960px] mx-auto">
            {evidenceHierarchy.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 md:p-7 rounded-[24px] border-2 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${item.color}`}
              >
                <div className="space-y-1.5 max-w-[640px]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/60 px-2.5 py-0.5 rounded-full border border-black/10">
                      {item.level}
                    </span>
                    <h3 className="font-serif text-[20px] font-semibold text-t-primary">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[14.5px] text-t-secondary leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                  <EvidenceDNA strength={item.rating as any} source={item.level} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Transparency Principles */}
        <section className="space-y-8">
          <div>
            <span className="text-[12px] font-mono text-rose uppercase tracking-widest font-semibold">
              Our Uncompromised Principles
            </span>
            <h2 className="font-serif text-[36px] md:text-[44px] font-semibold text-t-primary">
              The Vera Transparency Charter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transparencyPrinciples.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3] flex items-center justify-center text-t-primary shadow-xs">
                  <item.icon className="w-6 h-6 stroke-[1.5]" />
                </div>

                <h3 className="font-serif text-[22px] font-semibold text-t-primary leading-snug">
                  {item.title}
                </h3>

                <p className="text-[15px] text-t-secondary leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Corrections Policy */}
        <section className="p-10 md:p-14 rounded-[36px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-[0_8px_32px_rgba(44,38,35,0.04)] space-y-6">
          <div className="max-w-[840px] mx-auto space-y-4">
            <span className="text-[12px] font-mono text-rose uppercase tracking-widest font-semibold">
              Scientific Accountability
            </span>
            <h2 className="font-serif text-[36px] md:text-[40px] font-semibold text-t-primary leading-tight">
              Our Public Corrections & Update Policy
            </h2>
            <p className="text-[16.5px] text-t-secondary leading-[1.7] font-light">
              Science is iterative. When new randomized controlled trials overturn previous assumptions or when a factual error is reported by a reader or clinician, Vera takes immediate, transparent action.
            </p>
            <div className="p-6 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3] space-y-2 text-sm text-t-secondary">
              <div className="font-semibold text-t-primary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage" /> Public Correction Protocol
              </div>
              <p className="leading-relaxed">
                1. <strong>Investigation:</strong> Error reports are assigned to the Medical Board within 48 hours.<br />
                2. <strong>Revision:</strong> The article text is updated with explicit editor notes demarcating what was changed.<br />
                3. <strong>Log Entry:</strong> A permanent entry is posted in our Public Corrections Log.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Methodology FAQ Accordion */}
        <section className="space-y-6 max-w-[960px] mx-auto">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-[36px] font-semibold text-t-primary">
              Methodology & Transparency FAQ
            </h2>
            <p className="text-[16px] text-t-secondary font-light">
              Answers to common questions regarding our editorial review process.
            </p>
          </div>

          <div className="space-y-3">
            {trustFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-[#E5DCD3] rounded-[24px] bg-[#F7F1EB] overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="text-[18px] font-semibold text-t-primary pr-4">
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
                        <div className="p-6 pt-0 text-[15.5px] text-t-secondary leading-[1.6] font-light">
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

        {/* 9. Contact Cards & Interactive Report Form */}
        <section className="space-y-8">
          <div className="text-center max-w-[640px] mx-auto">
            <span className="text-[12px] font-mono text-t-muted uppercase tracking-widest font-semibold">
              Get In Touch
            </span>
            <h2 className="font-serif text-[36px] font-semibold text-t-primary">
              Contact & Support Desks
            </h2>
            <p className="text-[16px] text-t-secondary font-light">
              Reach out to our editorial team, medical review board, or partnership coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((c, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[28px] bg-[#F7F1EB] border border-[#E5DCD3] shadow-sm hover:bg-[#FAF4EE] hover:border-[#D6B46D]/60 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF8F3] border border-[#E5DCD3] flex items-center justify-center text-t-primary">
                    <c.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-[20px] font-semibold text-t-primary">
                    {c.title}
                  </h3>
                  <p className="text-[13.5px] text-t-secondary leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5DCD3]/60">
                  <a
                    href={`mailto:${c.email}`}
                    className="text-xs font-mono font-semibold text-rose hover:underline inline-flex items-center gap-1"
                  >
                    {c.email} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Correction Report Box */}
          <div className="p-8 md:p-10 rounded-[32px] bg-[#F7F1EB] border border-[#E5DCD3] max-w-[800px] mx-auto space-y-4">
            <h3 className="font-serif text-[24px] font-semibold text-t-primary flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose" /> Report a Scientific Correction or Feedback
            </h3>
            <p className="text-[14.5px] text-t-secondary font-light">
              Have you spotted a typographical error, outdated paper reference, or broken link? Send direct feedback to our Medical Review Desk:
            </p>

            {reportSent ? (
              <div className="p-4 rounded-2xl bg-sage/15 text-sage font-medium text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Thank you! Your correction report has been forwarded to our Medical Review Desk.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3">
                <textarea
                  required
                  rows={3}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Paste article title or describe the correction request..."
                  className="w-full p-4 rounded-2xl bg-[#FFF8F3] border border-[#E5DCD3] text-t-primary text-[15px] outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition-all font-light"
                />
                <Button type="submit" className="px-6 h-[46px]">
                  Submit Correction Report <Send className="w-4 h-4 ml-1.5" />
                </Button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
