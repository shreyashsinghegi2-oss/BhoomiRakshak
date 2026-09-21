export function calculateRisk({ rainfall, moisture, slope }) {
  const score = Math.min(100, rainfall * 0.35 + moisture * 0.35 + slope * 0.85);
  if (score >= 85) return { level: "Critical", score };
  if (score >= 68) return { level: "High", score };
  if (score >= 45) return { level: "Moderate", score };
  return { level: "Low", score };
}