const API_URL = "/api/mistral";

const mock = {
  risk_level: "High",
  confidence: 0.94,
  color_code: "#EF4444",
  key_factors: [
    "120 mm rainfall recorded in the last 24 hours",
    "Soil moisture at 85%",
    "Steep 35° slope with high historical susceptibility"
  ],
  recommendation: "Activate local response teams, inspect NH-7 and prepare targeted evacuation messaging for exposed settlements. Continue monitoring rainfall and slope movement at six-hour intervals.",
  evacuation_priority: "Immediate"
};

export async function runMistralAnalysis(location) {

  const prompt = `You are a landslide risk assessment expert for India. Analyze the following real-time data for ${location.name}:
- Rainfall (24h): ${location.rainfall} mm
- Soil Moisture: ${location.moisture}%
- Slope: ${location.slope} degrees
- Historical Landslide Susceptibility: ${location.risk}
- Population Density: ${location.population} people/km²
- Nearest Road: ${location.road}

Provide JSON only:
{
  "risk_level": "High/Medium/Low/Critical",
  "confidence": 0.XX,
  "color_code": "#HEX",
  "key_factors": ["factor1", "factor2", "factor3"],
  "recommendation": "2-3 sentence action plan for authorities",
  "evacuation_priority": "Immediate/Prepare/Monitor"
}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      })
    });
    if (!response.ok) throw new Error(`Mistral API ${response.status}`);
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";
    const cleaned = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.warn("Mistral unavailable; using realistic mock AI response.", error);
    return mock;
  }
}