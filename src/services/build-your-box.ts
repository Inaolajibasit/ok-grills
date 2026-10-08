import { buildBoxSections } from "@/data/build-your-box";
import type { BuildBoxSection } from "@/types/build-your-box";

export async function getBuildBoxSections(): Promise<BuildBoxSection[]> {
  return structuredClone(buildBoxSections);
}
