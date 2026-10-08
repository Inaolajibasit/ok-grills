import { eventPackages } from "@/data/event-packages";
import type { EventPackage } from "@/types/event";

export async function getEventPackages(): Promise<EventPackage[]> {
  return structuredClone(eventPackages);
}
