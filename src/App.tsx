import React, { useState, useEffect } from "react";
import { Navbar, PageType } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { ExploreTopics } from "./components/sections/ExploreTopics";
import { MythChallenge } from "./components/sections/MythChallenge";
import { EvidenceExplained } from "./components/sections/EvidenceExplained";
import { EvidenceFeed } from "./components/sections/EvidenceFeed";
import { LearningHub } from "./components/sections/LearningHub";
import { WhyTrustVera } from "./components/sections/WhyTrustVera";
import { EditorialStandards } from "./components/sections/EditorialStandards";
import { FAQ } from "./components/sections/FAQ";
import { JoinCommunity } from "./components/sections/JoinCommunity";
import { Footer } from "./components/layout/Footer";
import { ScrollDrivenBackground } from "./components/ScrollDrivenBackground";
import { ExplorePage } from "./pages/ExplorePage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { ProfilePage } from "./pages/ProfilePage";
import { TrustPage } from "./pages/TrustPage";
import { SearchPage } from "./pages/SearchPage";
import { ArticlePage } from "./pages/ArticlePage";
import { TopicPage } from "./pages/TopicPage";
import { MythPage } from "./pages/MythPage";
import { AuthPage } from "./pages/AuthPage";
import { NavigationProvider, parsePathToPage } from "./context/NavigationContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || "/";
  });

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (hash === "#trust") return "trust";
    if (hash === "#profile") return "profile";
    if (hash === "#bookmarks") return "bookmarks";
    if (hash === "#discover") return "discover";
    if (hash === "#auth" || hash === "#login" || hash === "#signup") return "auth";
    if (hash === "#myth") return "myth";
    if (hash === "#topic") return "topic";
    if (hash === "#article" || hash === "#search" || hash === "#explore") {
      return hash.replace("#", "") as PageType;
    }
    return parsePathToPage(path);
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || "/";
      setCurrentPath(path);
      setCurrentPage(parsePathToPage(path));
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const pageFromHash = hash.replace("#", "") as PageType;
        if (["home", "explore", "discover", "bookmarks", "profile", "trust", "topic", "search", "article", "myth", "auth"].includes(pageFromHash)) {
          setCurrentPage(pageFromHash);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut to launch Search Page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        navigate("/search");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    setCurrentPage(parsePathToPage(path));
    try {
      window.history.pushState({}, "", path);
    } catch {
      window.location.hash = path;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateTo = (page: PageType, hashTarget?: string) => {
    const routeMap: Record<PageType, string> = {
      home: "/",
      discover: "/discover",
      explore: "/explore",
      trust: "/trust",
      bookmarks: "/profile/MyBookmarks",
      profile: "/profile",
      topic: "/topics/pcos",
      search: "/search",
      article: "/articles/does-lemon-water-delay-periods",
      myth: "/myths/lemon-water-delays-periods",
      auth: "/auth",
    };
    const path = routeMap[page];
    setCurrentPath(path);
    setCurrentPage(page);
    try {
      window.history.pushState({}, "", path);
    } catch {
      window.location.hash = `#${page}`;
    }

    if (hashTarget) {
      setTimeout(() => {
        const el = document.getElementById(hashTarget);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AuthProvider>
      <NavigationProvider value={{ currentPath, currentPage, navigate, navigateTo }}>
        <div className="min-h-screen flex flex-col bg-transparent text-t-primary selection:bg-rose/20 relative">
          {/* Scroll-Driven Editorial Animation Background (Active on Homepage) */}
          {currentPage === "home" && <ScrollDrivenBackground />}

          <Navbar currentPage={currentPage} onNavigate={navigateTo} />

          <main className="flex-1">
            {currentPage === "home" && (
              <>
                <Hero />
                <ExploreTopics />
                <MythChallenge />
                <EvidenceExplained />
                <EvidenceFeed />
                <LearningHub />
                <WhyTrustVera />
                <EditorialStandards />
                <FAQ />
                <JoinCommunity />
              </>
            )}

            {currentPage === "discover" && <DiscoverPage />}

            {currentPage === "explore" && <ExplorePage />}

            {currentPage === "trust" && <TrustPage />}

            {currentPage === "bookmarks" && <ProfilePage defaultTab="bookmarks" />}

            {currentPage === "profile" && <ProfilePage defaultTab="overview" />}

            {currentPage === "topic" && <TopicPage />}

            {currentPage === "search" && <SearchPage />}

            {currentPage === "article" && <ArticlePage />}

            {currentPage === "myth" && <MythPage />}

            {currentPage === "auth" && <AuthPage />}
          </main>

          <Footer onNavigate={navigateTo} />
        </div>
      </NavigationProvider>
    </AuthProvider>
  );
}
