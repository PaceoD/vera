import React, { createContext, useContext } from "react";
import { PageType } from "@/components/layout/Navbar";

export type RoutePath =
  | "/"
  | "/auth"
  | "/login"
  | "/signup"
  | "/discover"
  | "/explore"
  | "/search"
  | "/topics"
  | "/topics/pcos"
  | "/topics/nutrition"
  | "/topics/mental-health"
  | "/articles"
  | "/articles/does-lemon-water-delay-periods"
  | "/myths"
  | "/myths/lemon-water-delays-periods"
  | "/collections"
  | "/bookmarks"
  | "/profile"
  | "/profile/MyBookmarks"
  | "/trust"
  | "/about"
  | "/contact"
  | string;

interface NavigationContextType {
  currentPath: string;
  currentPage: PageType;
  navigate: (path: string) => void;
  navigateTo: (page: PageType) => void;
}

export function parsePathToPage(path: string): PageType {
  const cleanPath = path.toLowerCase().split("#")[0].split("?")[0];
  if (cleanPath.startsWith("/auth") || cleanPath.startsWith("/login") || cleanPath.startsWith("/signup")) {
    return "auth";
  }
  if (cleanPath.startsWith("/search")) {
    return "search";
  }
  if (cleanPath.startsWith("/trust") || cleanPath.startsWith("/about") || cleanPath.startsWith("/contact")) {
    return "trust";
  }
  if (cleanPath.includes("/mybookmarks") || cleanPath.startsWith("/bookmarks")) {
    return "bookmarks";
  }
  if (cleanPath.startsWith("/profile")) {
    return "profile";
  }
  if (cleanPath.startsWith("/discover")) {
    return "discover";
  }
  if (cleanPath.startsWith("/myths/")) {
    return "myth";
  }
  if (cleanPath.startsWith("/topics/")) {
    return "topic";
  }
  if (
    cleanPath.startsWith("/explore") ||
    cleanPath.startsWith("/topics") ||
    cleanPath.startsWith("/collections")
  ) {
    return "explore";
  }
  if (cleanPath.startsWith("/articles") || cleanPath.startsWith("/myths")) {
    return "article";
  }
  return "home";
}

const NavigationContext = createContext<NavigationContextType>({
  currentPath: "/",
  currentPage: "home",
  navigate: (path: string) => {
    window.history.pushState({}, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  navigateTo: (page: PageType) => {
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
    window.history.pushState({}, "", routeMap[page]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export const NavigationProvider = NavigationContext.Provider;

export function useNavigation() {
  return useContext(NavigationContext);
}
