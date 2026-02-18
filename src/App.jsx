import { useState, useEffect } from "react";

import Shop from "./sections/Shop";
import Hero from "./sections/Hero";
import Anouncements from "./sections/Anouncements";
import ShopWidget from "./shared/components/ShopWidget";
import CartOverlay from "./shared/components/CartOverlay";
import Footer from "./sections/Footer";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative h-screen">
      {/* 🔹 Loading Overlay */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity duration-500 ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="animate-pulse text-xl tracking-widest">LOADING...</div>
      </div>

      <div>
        <Hero />
        <Shop />
        <Anouncements />
        <ShopWidget onClick={() => setCartOpen(true)} />
        <Footer />
      </div>

      <CartOverlay open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default App;
