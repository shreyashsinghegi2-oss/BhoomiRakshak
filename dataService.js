import { mockWeatherData } from "../data/mockWeatherData";
import { mockJioData } from "../data/mockJioData";

/**
 * Central data orchestrator.
 * Every external source is isolated so one unavailable source cannot break the demo.
 */

export async function fetchNASAWeatherHistory(latitude, longitude) {
  const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR&community=AG&longitude=${longitude}&latitude=${latitude}&start=20260101&end=20260921&format=JSON`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NASA POWER ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn("NASA POWER unavailable; using cached/mock data.", error);
    return { cached: true, source: "mock", data: mockWeatherData };
  }
}

/**
 * Integration adapter for NASA landslide nowcast.
 * Validate the exact machine-readable endpoint available for the deployment
 * before presenting this as an official live LHASA feed.
 */
export async function fetchLhasaNowcast(lat, lon) {
  try {
    // Placeholder adapter: the public NASA PMM taxonomy URL is not itself
    // a JSON nowcast API. Keep the adapter isolated until a validated API
    // endpoint/feed is configured.
    const response = await fetch(`https://gpm.nasa.gov/taxonomy/term/1394`);
    if (!response.ok) throw new Error(`NASA PMM ${response.status}`);
    return { cached: true, source: "NASA PMM page", live: false, lat, lon };
  } catch (error) {
    console.warn("NASA LHASA/PMM unavailable; using mock nowcast.", error);
    return { cached: true, source: "mock", live: false, lat, lon, risk: "High" };
  }
}

/**
 * ISRO Bhuvan / NRSC integration adapter.
 * Public Bhuvan web pages are not automatically equivalent to a documented
 * browser-safe JSON API, so failures are contained and mocked.
 */
export async function fetchBhuvanLayers() {
  try {
    const response = await fetch("https://bhuvan.nrsc.gov.in/");
    if (!response.ok) throw new Error(`Bhuvan ${response.status}`);
    return { cached: true, source: "Bhuvan", live: false };
  } catch (error) {
    console.warn("ISRO Bhuvan unavailable; using mock disaster layers.", error);
    return { cached: true, source: "mock", live: false, layers: [] };
  }
}

/**
 * IMD integration adapter.
 * The public IMD website is used as an availability signal only here;
 * production should connect to an officially documented alert feed.
 */
export async function fetchIMDWarnings() {
  try {
    const response = await fetch("https://mausam.imd.gov.in/");
    if (!response.ok) throw new Error(`IMD ${response.status}`);
    return { cached: true, source: "IMD", live: false, warnings: [] };
  } catch (error) {
    console.warn("IMD unavailable; using mock warnings.", error);
    return { cached: true, source: "mock", live: false, warnings: [] };
  }
}

export async function fetchAllIntelligence(latitude, longitude) {
  const [nasaHistory, lhasa, bhuvan, imd] = await Promise.allSettled([
    fetchNASAWeatherHistory(latitude, longitude),
    fetchLhasaNowcast(latitude, longitude),
    fetchBhuvanLayers(),
    fetchIMDWarnings()
  ]);

  return {
    nasaHistory: nasaHistory.status === "fulfilled" ? nasaHistory.value : { cached: true },
    lhasa: lhasa.status === "fulfilled" ? lhasa.value : { cached: true },
    bhuvan: bhuvan.status === "fulfilled" ? bhuvan.value : { cached: true },
    imd: imd.status === "fulfilled" ? imd.value : { cached: true },
    jio: mockJioData
  };
}