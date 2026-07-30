import React from "react";
import { PageType } from "./Navbar";

interface FooterProps {
  onNavigate?: (page: PageType) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (page: PageType, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = `#${page}`;
    }
  };

  return (
    <footer id="footer-section" className="relative bg-[#F7EADB] pt-[88px] pb-[56px] border-t border-[#E5D5C2] text-[#2C2623] overflow-hidden">
      {/* Tiny botanical embossing pattern overlay (Warm closing page texture) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="botanical-emboss" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 10 0 C 12 5, 15 8, 20 10 C 15 12, 12 15, 10 20 C 8 15, 5 12, 0 10 C 5 8, 8 5, 10 0 Z" fill="#2C2623" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#botanical-emboss)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[32px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[48px] mb-[64px]">
          <div className="md:col-span-1">
            <a
              href="#home"
              onClick={(e) => handleNavClick("home", e)}
              className="inline-block text-2xl font-serif font-semibold text-t-primary tracking-tight mb-[16px] cursor-pointer"
              aria-label="Vera Home"
            >
              Vera.
            </a>
            <p className="text-[14px] text-t-secondary leading-[1.6]">
              Help women separate myths from scientific facts about their health — calm, evidence-based, never preachy.
            </p>
          </div>
          
          <div>
            <h4 className="text-[14px] font-semibold text-t-primary uppercase tracking-wider mb-[24px]">Explore & Research</h4>
            <ul className="space-y-[12px]">
              <li><a href="#article" onClick={(e) => handleNavClick("article", e)} className="text-[14px] text-t-secondary hover:text-rose transition-colors cursor-pointer">PCOS Verdict Review</a></li>
              <li><a href="#search" onClick={(e) => handleNavClick("search", e)} className="text-[14px] text-t-secondary hover:text-rose transition-colors cursor-pointer">Search Evidence Engine</a></li>
              <li><a href="#explore" onClick={(e) => handleNavClick("explore", e)} className="text-[14px] text-t-secondary hover:text-rose transition-colors cursor-pointer">Explore Scientific Library</a></li>
              <li><a href="#search" onClick={(e) => handleNavClick("search", e)} className="text-[14px] text-t-secondary hover:text-rose transition-colors cursor-pointer">Myth Directory</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[14px] font-semibold text-t-primary uppercase tracking-wider mb-[24px]">Company</h4>
            <ul className="space-y-[12px]">
              <li><a href="#about" onClick={(e) => handleNavClick("home", e)} className="text-[14px] text-t-secondary hover:text-rose transition-colors cursor-pointer">About</a></li>
              <li><a href="#editorial" onClick={(e) => handleNavClick("home", e)} className="text-[14px] text-t-secondary hover:text-rose transition-colors cursor-pointer">Editorial Policy</a></li>
              <li><a href="#privacy" className="text-[14px] text-t-secondary hover:text-rose transition-colors">Privacy</a></li>
              <li><a href="#terms" className="text-[14px] text-t-secondary hover:text-rose transition-colors">Terms</a></li>
              <li><a href="#contact" className="text-[14px] text-t-secondary hover:text-rose transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[14px] font-semibold text-t-primary uppercase tracking-wider mb-[24px]">Social</h4>
            <ul className="space-y-[12px]">
              <li><a href="#linkedin" className="text-[14px] text-t-secondary hover:text-rose transition-colors">LinkedIn</a></li>
              <li><a href="#instagram" className="text-[14px] text-t-secondary hover:text-rose transition-colors">Instagram</a></li>
              <li><a href="#youtube" className="text-[14px] text-t-secondary hover:text-rose transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-[32px] border-t border-[#E5D5C2] text-center">
          <p className="text-[14px] text-t-muted">
            Vera provides educational information and should not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
