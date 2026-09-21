import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import About from "./pages/About";

export default function App() {
  return <BrowserRouter><AppProvider><Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/analytics" element={<Analytics/>}/>
    <Route path="/alerts" element={<Alerts/>}/>
    <Route path="/reports" element={<Reports/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes></AppProvider></BrowserRouter>;
}