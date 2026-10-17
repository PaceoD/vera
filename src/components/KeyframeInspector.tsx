import React, { useState } from "react";
import { Clock, Layers, Sparkles, Film, ArrowRight } from "lucide-react";

interface KeyframeData {
  id: number;
  frameNum: string;
  frameIndex: number;
  timestamp: string;
  title: string;
  description: string;
  significance: string;
  imageSrc: string;
  metrics: {
    cameraZoom: string;
    activeLayers: number;
    motionVelocity: string;
  };
}

const KEYFRAMES: KeyframeData[] = [
  {
    id: 1,
    frameNum: "frame_000000.png",
    frameIndex: 0,
    timestamp: "00:00.000 (0.0s)",
    title: "Macro DNA Ink Sketch on Parchment",
    description: "Extreme macro focus on vintage parchment texture. Ink-drawn DNA double helices, molecular structures, anatomical sketches, and golden fountain pen tip touching paper.",
    significance: "Establishes scientific research origin, editorial warm aesthetic, and foundational paper texture.",
    imageSrc: `${import.meta.env.BASE_URL}keyframes/keyframe_01_frame_000000.png`,
    metrics: { cameraZoom: "2.5x Close-Up", activeLayers: 4, motionVelocity: "0.0 px/s" },
  },
  {
    id: 2,
    frameNum: "frame_000035.png",
    frameIndex: 35,
    timestamp: "00:01.458 (1.46s)",
    title: "Pen Lift & Camera Pullback Trigger",
    description: "Golden pen nib lifts 15px vertically and tilts upward. Camera initiates continuous backward dolly vector and slight upward tilt.",
    significance: "Marks transition from static 2D drawing state to active 3D spatial camera trajectory.",
    imageSrc: `${import.meta.env.BASE_URL}keyframes/keyframe_02_frame_000035.png`,
    metrics: { cameraZoom: "2.1x Dolly", activeLayers: 5, motionVelocity: "14.2 px/s" },
  },
  {
    id: 3,
    frameNum: "frame_000072.png",
    frameIndex: 72,
    timestamp: "00:03.000 (3.00s)",
    title: "3D Leather Manuscript Books Reveal",
    description: "Camera pulls back to reveal stacked leather-bound manuscript books. Flat 2D ink root lines morph smoothly into dimensional wooden roots wrapping around book spines.",
    significance: "Key dimensional layer transition where 2D flat paper artwork evolves into a 3D multi-layered scene object hierarchy.",
    imageSrc: `${import.meta.env.BASE_URL}keyframes/keyframe_03_frame_000072.png`,
    metrics: { cameraZoom: "1.6x Mid-Shot", activeLayers: 7, motionVelocity: "28.5 px/s" },
  },
  {
    id: 4,
    frameNum: "frame_000115.png",
    frameIndex: 115,
    timestamp: "00:04.792 (4.79s)",
    title: "Kinetic Open-Book Page Flipping",
    description: "The top red/burgundy leather book opens its pages dramatically, with individual pages fanning and flipping upwards in mid-air.",
    significance: "Introduces primary kinetic page-turn animation, revealing glowing molecular nodes and constellation graph lines.",
    imageSrc: `${import.meta.env.BASE_URL}keyframes/keyframe_04_frame_000115.png`,
    metrics: { cameraZoom: "1.3x Dynamic", activeLayers: 8, motionVelocity: "42.0 px/s" },
  },
  {
    id: 5,
    frameNum: "frame_000155.png",
    frameIndex: 155,
    timestamp: "00:06.458 (6.46s)",
    title: "3D Organic Tree Trunk Eruption",
    description: "A 3D organic wood tree trunk erupts from the center gutter of the open manuscript book. Wood bark texture reveals deep hollows with embedded DNA geometry.",
    significance: "Birth of hero element (Tree of Knowledge/Intelligence rising out of foundational literature).",
    imageSrc: `${import.meta.env.BASE_URL}keyframes/keyframe_05_frame_000155.png`,
    metrics: { cameraZoom: "1.1x Wide", activeLayers: 9, motionVelocity: "36.8 px/s" },
  },
  {
    id: 6,
    frameNum: "frame_000195.png",
    frameIndex: 195,
    timestamp: "00:08.125 (8.13s)",
    title: "Foliage Leaf Sprouting & Budding",
    description: "Tree branches extend radially toward screen bounds. Foliage leaves sprout outward while purple flower buds form on branch tips.",
    significance: "Shifts growth phase from structural trunk extension to organic canopy expansion and floral budding.",
    imageSrc: `${import.meta.env.BASE_URL}keyframes/keyframe_06_frame_000195.png`,
    metrics: { cameraZoom: "1.0x Full Canvas", activeLayers: 10, motionVelocity: "18.4 px/s" },
  },
  {
    id: 7,
    frameNum: "frame_000239.png",
    frameIndex: 239,
    timestamp: "00:09.958 (9.96s)",
    title: "Full Purple Floral Bloom Climax",
    description: "Lush purple and magenta flowers bloom fully across the canopy with golden stamens. Constellation network lines glow warmly in the background canvas.",
    significance: "Narrative resolution keyframe representing complete, flourishing evidence-based intelligence (Vera AI).",
    imageSrc: `${import.meta.env.BASE_URL}keyframes/keyframe_07_frame_000239.png`,
    metrics: { cameraZoom: "1.0x Full Canvas", activeLayers: 10, motionVelocity: "0.0 px/s" },
  },
];

export function KeyframeInspector() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const activeKf = KEYFRAMES.find((k) => k.id === selectedId) || KEYFRAMES[0];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 text-[#2C2623]">
      <div className="mb-8 border-b border-[#E6DCCF] pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#B58A59] uppercase mb-2">
            <Film className="w-4 h-4" /> Selected Keyframes Gallery (7 Core Milestones)
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2C2623]">Keyframe Motion Inspector</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-[#FFF8F3] px-3 py-1.5 rounded-md border border-[#E6DCCF]">
          <span>FPS: 24.0</span>
          <span className="text-[#B58A59]">•</span>
          <span>Resolution: 1280x720</span>
          <span className="text-[#B58A59]">•</span>
          <span>Lossless PNG</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Keyframe Preview */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-black/5 border border-[#E6DCCF] shadow-lg group">
            <img
              src={activeKf.imageSrc}
              alt={activeKf.title}
              className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white text-xs font-mono px-3 py-1.5 rounded-md border border-white/20">
              FRAME #{activeKf.frameIndex.toString().padStart(3, "0")} — {activeKf.timestamp}
            </div>
          </div>

          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-4 bg-[#FFF8F3] p-4 rounded-xl border border-[#E6DCCF]">
            <div>
              <span className="text-xs font-mono text-[#8C7A6B] block">CAMERA VECTOR</span>
              <span className="font-semibold text-sm">{activeKf.metrics.cameraZoom}</span>
            </div>
            <div>
              <span className="text-xs font-mono text-[#8C7A6B] block">ACTIVE LAYERS</span>
              <span className="font-semibold text-sm">{activeKf.metrics.activeLayers} / 10 Layers</span>
            </div>
            <div>
              <span className="text-xs font-mono text-[#8C7A6B] block">KINETIC VELOCITY</span>
              <span className="font-semibold text-sm">{activeKf.metrics.motionVelocity}</span>
            </div>
          </div>
        </div>

        {/* Keyframe Details & Selection List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFF8F3] border border-[#E6DCCF] rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-mono text-[#B58A59] uppercase tracking-wider block mb-1">
                KEYFRAME {activeKf.id} OF 7
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C2623]">{activeKf.title}</h3>
            </div>

            <div>
              <h4 className="text-xs font-mono text-[#8C7A6B] uppercase mb-1">DESCRIPTION</h4>
              <p className="text-sm text-[#594E46] leading-relaxed">{activeKf.description}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono text-[#8C7A6B] uppercase mb-1">TRANSITION SIGNIFICANCE</h4>
              <p className="text-sm text-[#594E46] leading-relaxed font-medium">{activeKf.significance}</p>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8C7A6B] uppercase tracking-wider block mb-2">
              SELECT KEYFRAME TO INSPECT
            </span>
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {KEYFRAMES.map((kf) => (
                <button
                  key={kf.id}
                  onClick={() => setSelectedId(kf.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                    kf.id === selectedId
                      ? "bg-[#2C2623] text-white border-[#2C2623] shadow-md"
                      : "bg-[#FFF8F3] hover:bg-[#F5EBE1] text-[#2C2623] border-[#E6DCCF]"
                  }`}
                >
                  <img
                    src={kf.imageSrc}
                    alt={kf.title}
                    className="w-16 h-10 object-cover rounded border border-black/10 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs font-mono opacity-80 mb-0.5">
                      <span>KF #{kf.id}</span>
                      <span>{kf.timestamp.split(" ")[0]}</span>
                    </div>
                    <p className="text-xs font-medium truncate">{kf.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
