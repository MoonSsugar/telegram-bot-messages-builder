import { BrowserRouter, Routes, Route } from "react-router";
import FlowBuilderPage from "./pages/FlowBuilderPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import BotSettingsPage from "./pages/BotSettingsPage";
import AddBotPage from "./pages/AddBotPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add-bot" element={<AddBotPage />} />
        <Route path="/bot/:id/settings" element={<BotSettingsPage />} />
        <Route path="/bot/:id/flow" element={<FlowBuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
