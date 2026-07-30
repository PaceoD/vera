import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

export type PageType = "home" | "explore" | "discover" | "bookmarks" | "profile" | "trust" | "search" | "article" | "topic" | "myth";

interface NavbarProps {
  currentPage?: PageType;
  onNavigate?: (page: PageType, hashTarget?: string) => void;
}

export function Navbar({ currentPage = "home", onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (page: PageType, e: React.MouseEvent, hashTarget?: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, hashTarget);
    } else {
      window.location.hash = `#${page}`;
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 h-[76px] z-50 transition-all duration-300 ease-out flex items-center",
        scrolled ? "bg-[#FFF8F3]/90 backdrop-blur-md shadow-sm border-b border-[#E5DCD3]/60" : "bg-transparent"
      )}
    >
      <div className="w-full max-w-[1280px] mx-auto px-[32px] flex items-center justify-between">
        <div className="flex items-center gap-[40px]">
          <a
            href="#home"
            onClick={(e) => handleNavClick("home", e)}
            className="text-2xl font-serif font-semibold text-t-primary tracking-tight cursor-pointer"
            aria-label="Vera Home"
          >
            Vera.
          </a>
          <nav className="hidden md:flex items-center gap-[28px]">
            <a
              href="#home"
              onClick={(e) => handleNavClick("home", e)}
              className={cn(
                "font-medium transition-colors cursor-pointer text-[15px]",
                currentPage === "home" ? "text-t-primary font-semibold" : "text-t-secondary hover:text-t-primary"
              )}
            >
              Home
            </a>
            <a
              href="#discover"
              onClick={(e) => handleNavClick("discover", e)}
              className={cn(
                "font-medium transition-colors cursor-pointer text-[15px]",
                currentPage === "discover" ? "text-t-primary font-semibold" : "text-t-secondary hover:text-t-primary"
              )}
            >
              Discover
            </a>
            <a
              href="#explore"
              onClick={(e) => handleNavClick("explore", e)}
              className={cn(
                "font-medium transition-colors cursor-pointer text-[15px]",
                currentPage === "explore" ? "text-t-primary font-semibold" : "text-t-secondary hover:text-t-primary"
              )}
            >
              Explore
            </a>
            <a
              href="#trust"
              onClick={(e) => handleNavClick("trust", e)}
              className={cn(
                "font-medium transition-colors cursor-pointer text-[15px]",
                currentPage === "trust" ? "text-t-primary font-semibold" : "text-t-secondary hover:text-t-primary"
              )}
            >
              Trust Center
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => handleNavClick("search", e)}
            className="px-3.5 py-1.5 rounded-full bg-[#F8F3EE] border border-[#E5DCD3] hover:border-[#D6B46D] text-[13px] font-medium text-t-secondary hover:text-t-primary transition-all flex items-center gap-2 cursor-pointer"
            title="Press Cmd+K to search"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded text-t-muted">
              ⌘K
            </kbd>
          </button>

          {currentPage === "home" ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => handleNavClick("discover", e)}
              className="hidden sm:inline-flex"
            >
              Discover Magazine
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => handleNavClick("home", e)}
              className="hidden sm:inline-flex"
            >
              Back to Home
            </Button>
          )}

          {/* Profile / Account Dashboard Button */}
          <button
            onClick={(e) => handleNavClick("profile", e)}
            className={cn(
              "p-2 rounded-full border transition-all flex items-center gap-2 cursor-pointer",
              currentPage === "profile" || currentPage === "bookmarks"
                ? "bg-[#2C2623] text-white border-[#2C2623]"
                : "bg-[#F8F3EE] border-[#E5DCD3] hover:border-[#D6B46D] text-t-primary"
            )}
            title="Personal Learning Dashboard"
          >
            <div className="w-6 h-6 rounded-full bg-[#D6B46D]/20 text-[#8C6D2B] flex items-center justify-center font-bold text-xs">
              SJ
            </div>
            <span className="hidden lg:inline text-xs font-semibold pr-1">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
