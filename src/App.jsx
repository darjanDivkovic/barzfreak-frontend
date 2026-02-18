import { useState } from "react";

import Shop from "./sections/Shop";
import Hero from "./sections/Hero";
import Anouncements from "./sections/Anouncements";
import ShopWidget from "./shared/components/ShopWidget";
import CartOverlay from "./shared/components/CartOverlay";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="relative h-screen">
      <div>
        <Hero />

        <hr className="mt-[20vh]" />
        <Shop />

        <hr className="mt-[20vh]" />
        <Anouncements />

        <ShopWidget onClick={() => setCartOpen(true)} />
      </div>

      <CartOverlay open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default App;
