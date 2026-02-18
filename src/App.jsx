import { useState } from "react";

import Shop from "./sections/Shop";
import Hero from "./sections/Hero";
import Anouncements from "./sections/Anouncements";
import ShopWidget from "./shared/components/ShopWidget";
import CartOverlay from "./shared/components/CartOverlay";
import Delimiter from "./shared/components/Delimiter";
import Footer from "./sections/Footer";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="relative h-screen">
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
