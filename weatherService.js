import { mockWeatherData } from "../data/mockWeatherData";

export async function fetchWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m&hourly=precipitation,soil_moisture_0_to_7cm&forecast_days=3&timezone=Asia%2FKolkata`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather API ${response.status}`);
    const data = await response.json();
    const hourlyRain = data.hourly?.precipitation?.slice(0, 24) ?? [];
    const soil = data.hourly?.soil_moisture_0_to_7cm?.[0] ?? 0.85;
    const rainfall24h = Math.round(hourlyRain.reduce((a, b) => a + (b || 0), 0));
    return {
      rainfall24h,
      soilMoisture: Math.round(Math.min(100, Math.max(0, soil * 100))),
      temperature: data.current?.temperature_2m ?? 19,
      weatherAlert: rainfall24h >= 80 ? "Heavy rainfall warning" : "Weather watch",
      forecast: mockWeatherData.forecast
    };
  } catch (error) {
    console.warn("Open-Meteo unavailable; using demo weather data.", error);
    return mockWeatherData;
  }
}