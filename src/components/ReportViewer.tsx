import React, { useState } from "react";
import { FileText, Layers, Compass, CheckCircle, Code, ShieldCheck } from "lucide-react";

export function ReportViewer() {
  const [activeDoc, setActiveDoc] = useState<"motion" | "layer" | "implementation">("motion");

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 text-[#2C2623]">
      <div className="mb-8 border-b border-[#E6DCCF] pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#B58A59] uppercase mb-2">
            <FileText className="w-4 h-4" /> Motion Analysis & Technical Specifications
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2C2623]">Engineering Reports & Deliverables</h2>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap items-center gap-2 bg-[#FFF8F3] p-1.5 rounded-xl border border-[#E6DCCF]">
          <button
            onClick={() => setActiveDoc("motion")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
              activeDoc === "motion"
                ? "bg-[#2C2623] text-white shadow-sm"
                : "text-[#8C7A6B] hover:text-[#2C2623]"
            }`}
          >
            <Compass className="w-4 h-4" /> Motion Analysis Report
          </button>
          <button
            onClick={() => setActiveDoc("layer")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
              activeDoc === "layer"
                ? "bg-[#2C2623] text-white shadow-sm"
                : "text-[#8C7A6B] hover:text-[#2C2623]"
            }`}
          >
            <Layers className="w-4 h-4" /> Layer Breakdown
          </button>
          <button
            onClick={() => setActiveDoc("implementation")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
              activeDoc === "implementation"
                ? "bg-[#2C2623] text-white shadow-sm"
                : "text-[#8C7A6B] hover:text-[#2C2623]"
            }`}
          >
            <Code className="w-4 h-4" /> Implementation Guide
          </button>
        </div>
      </div>

      <div className="bg-[#FFF8F3] border border-[#E6DCCF] rounded-2xl p-8 shadow-sm space-y-8">
        {activeDoc === "motion" && (
          <div className="space-y-6 max-w-4xl font-serif text-[#2C2623] leading-relaxed">
            <h3 className="text-2xl font-bold border-b border-[#E6DCCF] pb-3 font-sans">
              1. Motion Analysis Report Summary
            </h3>
            <p className="text-base text-[#594E46]">
              Detailed analysis of the 240-frame hero animation video (24.0 FPS, 1280x720 lossless PNG archive).
            </p>

            <div className="grid md:grid-cols-3 gap-4 font-sans text-sm my-6">
              <div className="bg-white p-4 rounded-xl border border-[#E6DCCF]">
                <span className="text-xs font-mono text-[#8C7A6B] block mb-1">TOTAL DURATION</span>
                <span className="font-bold text-lg">10.00 Seconds</span>
                <span className="text-xs text-[#8C7A6B] block">240 frames total</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E6DCCF]">
                <span className="text-xs font-mono text-[#8C7A6B] block mb-1">CAMERA VECTOR</span>
                <span className="font-bold text-lg">Continuous Dolly</span>
                <span className="text-xs text-[#8C7A6B] block">2.5x Close-up to 1.0x Wide</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E6DCCF]">
                <span className="text-xs font-mono text-[#8C7A6B] block mb-1">RECOMMENDED FPS</span>
                <span className="font-bold text-lg">60 FPS Smooth</span>
                <span className="text-xs text-[#8C7A6B] block">Lenis + ScrollTrigger Scrub</span>
              </div>
            </div>

            <h4 className="text-xl font-bold font-sans mt-6">Core Motion Vector Attributes</h4>
            <ul className="space-y-3 font-sans text-sm text-[#594E46]">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Camera Dolly & Tilt:</strong> Smooth backward translation with ease-out curve <code>cubic-bezier(0.16, 1, 0.3, 1)</code>.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Kinetic Book Page Turn:</strong> 3D Y-axis rotation <code>rotateY(0deg {"->"} -160deg)</code> with spring overshoot easing.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Tree Trunk Sprout:</strong> Vertical clip-path reveal and <code>scaleY(0.1 {"->"} 1.0)</code> growth out of open book spine.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Floral Spring Bloom:</strong> Elastic pop-in scale <code>scale(0 {"->"} 1.35 {"->"} 1.0)</code> across branch node endpoints.</span>
              </li>
            </ul>
          </div>
        )}

        {activeDoc === "layer" && (
          <div className="space-y-6 max-w-4xl font-serif text-[#2C2623] leading-relaxed">
            <h3 className="text-2xl font-bold border-b border-[#E6DCCF] pb-3 font-sans">
              2. 10-Layer Visual Element Breakdown
            </h3>
            <p className="text-base text-[#594E46]">
              Visual element decomposition mapping all 10 independent layers for modern web recreation.
            </p>

            <div className="space-y-3 font-sans text-sm">
              {[
                { num: "Layer 1", name: "Parchment Canvas Background", tech: "WebP / Radial Vignette", z: "10" },
                { num: "Layer 2", name: "Constellation Node Graph", tech: "SVG Circle / Path Mesh", z: "20" },
                { num: "Layer 3", name: "Anatomical Manuscripts & Notes", tech: "Vector Overlay / Blend", z: "30" },
                { num: "Layer 4", name: "DNA Helix Ink Tree Roots", tech: "SVG Stroke Dasharray", z: "40" },
                { num: "Layer 5", name: "3D Stacked Leather Books", tech: "CSS 3D / Perspective", z: "50" },
                { num: "Layer 6", name: "Golden Fountain Pen Nib", tech: "SVG Metal Nib Vector", z: "60" },
                { num: "Layer 7", name: "3D Organic Tree Trunk", tech: "SVG Path / Bark Inset", z: "70" },
                { num: "Layer 8", name: "Botanical Leaf Canopy", tech: "SVG Group (<g>)", z: "80" },
                { num: "Layer 9", name: "Purple Floral Blossoms", tech: "Multi-Petal Component", z: "90" },
                { num: "Layer 10", name: "Vera Watermark Sparkle", tech: "Fixed SVG Brand Anchor", z: "100" },
              ].map((l) => (
                <div key={l.num} className="bg-white p-4 rounded-xl border border-[#E6DCCF] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#B58A59] font-bold">{l.num}</span>
                    <span className="font-semibold text-base">{l.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#8C7A6B]">
                    <span>{l.tech}</span>
                    <span className="bg-[#FFF8F3] px-2 py-0.5 rounded border border-[#E6DCCF]">z-index: {l.z}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeDoc === "implementation" && (
          <div className="space-y-6 max-w-4xl font-serif text-[#2C2623] leading-relaxed">
            <h3 className="text-2xl font-bold border-b border-[#E6DCCF] pb-3 font-sans">
              3. Step-by-Step Homepage Implementation Guide
            </h3>
            <p className="text-base text-[#594E46]">
              Production engineering roadmap targeting Apple/Linear/Vercel performance standards.
            </p>

            <div className="space-y-4 font-sans text-sm">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Performance Best Practice Recommendation</span>
                  <span>Use GSAP 3 + ScrollTrigger with SVG vectors instead of raw image sequence playback to reduce asset bandwidth from 205 MB down to under 1.2 MB while guaranteeing silky 60 FPS performance on mobile & 4K displays.</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E6DCCF] space-y-3">
                <span className="font-mono text-xs text-[#B58A59] font-bold uppercase">STEP 1: SMOOTH SCROLL INTEGRATION</span>
                <p className="text-xs text-[#594E46]">Initialize Lenis smooth scroll and connect ticker to GSAP ScrollTrigger.</p>
                <div className="bg-[#1E1E1E] text-[#D4D4D4] p-3 rounded font-mono text-xs">
                  <code>{`import Lenis from '@studio-freight/lenis';\nconst lenis = new Lenis({ duration: 1.2, smoothWheel: true });`}</code>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E6DCCF] space-y-3">
                <span className="font-mono text-xs text-[#B58A59] font-bold uppercase">STEP 2: TIMELINE PINNING & SCRUBBING</span>
                <p className="text-xs text-[#594E46]">Pin hero container over 400vh scroll distance for smooth scrubbing.</p>
                <div className="bg-[#1E1E1E] text-[#D4D4D4] p-3 rounded font-mono text-xs">
                  <code>{`gsap.timeline({ scrollTrigger: { trigger: '#hero', pin: true, scrub: 0.8, end: '+=400%' } });`}</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
