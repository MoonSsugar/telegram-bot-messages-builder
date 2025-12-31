import { BrowserRouter, Routes, Route } from "react-router";
import FlowBuilderPage from "./pages/FlowBuilderPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FlowBuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
