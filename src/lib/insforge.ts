/// <reference types="vite/client" />
import { createClient } from "@insforge/sdk";

const insforgeUrl = import.meta.env.VITE_INSFORGE_URL || "https://m4qmduhn.ap-southeast.insforge.app";
const insforgeAnonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || "anon_01bf9abae0ddbde0206998d07aa34e715816de37401c83f8ae40561532fb48c9";

export const insforge = createClient({
  baseUrl: insforgeUrl,
  anonKey: insforgeAnonKey,
});

