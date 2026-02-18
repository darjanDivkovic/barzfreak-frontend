import { useState } from "react";

import Shop from "./sections/Shop";
import Hero from "./sections/Hero";
import Anouncements from "./sections/Anouncements";
import ShopWidget from "./shared/components/ShopWidget";
import CartOverlay from "./shared/components/CartOverlay";
import Delimiter from "./shared/components/Delimiter";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="relative h-screen">
      <div>
        <Hero />

        <hr className="mt-[5vh]" />
        <Shop />

        <Anouncements />

        <ShopWidget onClick={() => setCartOpen(true)} />
      </div>

      <CartOverlay open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default App;
