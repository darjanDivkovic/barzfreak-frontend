import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import AnnouncementDetailPage from "./pages/AnnouncementDetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<AnnouncementDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
