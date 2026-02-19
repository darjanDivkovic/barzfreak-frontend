// src/App.jsx
import { useEffect, useState } from "react";

import Hero from "./sections/Hero";
import Shop from "./sections/Shop";
import Anouncements from "./sections/Anouncements";
import ShopWidget from "./shared/components/ShopWidget";
import CartOverlay from "./shared/components/CartOverlay";
import Footer from "./sections/Footer";

import LoadingScreen from "./shared/components/LoadingScreen";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Optional: lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen">
        <LoadingScreen />
        <main>
          <Hero />
          <Shop />
          <Anouncements />
        </main>

        <ShopWidget onClick={() => setIsCartOpen(true)} />

        <Footer />

        <CartOverlay open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </LanguageProvider>
  );
}

export default App;
