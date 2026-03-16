import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
