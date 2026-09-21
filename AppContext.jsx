import { createContext, useContext, useEffect, useReducer } from "react";
import { defaultLocation, mockWeatherData } from "../data/mockWeatherData";
import { fetchWeather } from "../services/weatherService";
import { getJioIntelligence } from "../services/jioService";

const initial = {
  selectedZone: null,
  weather: mockWeatherData,
  jio: null,
  loadingWeather: true,
  activeLayers: { risk: true, rainfall: false, roads: true, infrastructure: false, reports: true, jio: true, historical: false }
};

function reducer(state, action) {
  switch (action.type) {
    case "ZONE": return { ...state, selectedZone: action.zone };
    case "WEATHER": return { ...state, weather: action.weather, loadingWeather: false };
    case "JIO": return { ...state, jio: action.jio };
    case "LAYER": return { ...state, activeLayers: { ...state.activeLayers, [action.name]: !state.activeLayers[action.name] } };
    default: return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  useEffect(() => {
    fetchWeather(defaultLocation.latitude, defaultLocation.longitude).then(weather => dispatch({ type: "WEATHER", weather }));
    getJioIntelligence().then(jio => dispatch({ type: "JIO", jio }));
  }, []);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);