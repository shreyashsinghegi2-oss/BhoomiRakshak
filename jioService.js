// Integration-ready for Jio Location Platform API. Simulated for demo.
import { mockJioData } from "../data/mockJioData";
export async function getJioIntelligence() {
  return Promise.resolve(mockJioData);
}