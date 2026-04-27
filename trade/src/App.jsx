import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import ThemeContextComponent from "./context/ThemeContext";

function App() {
  return (
    <ThemeContextComponent>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/market" element={<Market />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeContextComponent>
  );
}

export default App;