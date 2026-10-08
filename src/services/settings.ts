import { siteSettings } from "@/data/site-settings";
import type { SiteSettings } from "@/types/settings";

export async function getSiteSettings(): Promise<SiteSettings> {
  return structuredClone(siteSettings);
}
