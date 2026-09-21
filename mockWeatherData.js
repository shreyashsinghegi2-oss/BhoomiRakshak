export const defaultLocation = {
  name: "Chamoli, Uttarakhand",
  latitude: 30.41,
  longitude: 79.32,
};

export const mockWeatherData = {
  rainfall24h: 120,
  soilMoisture: 85,
  temperature: 19,
  weatherAlert: "Heavy rainfall warning",
  forecast: [
    { time: "Now", rain: 18, risk: 64 },
    { time: "+6h", rain: 26, risk: 71 },
    { time: "+12h", rain: 35, risk: 82 },
    { time: "+24h", rain: 29, risk: 77 },
    { time: "+48h", rain: 18, risk: 63 },
    { time: "+72h", rain: 11, risk: 48 }
  ]
};