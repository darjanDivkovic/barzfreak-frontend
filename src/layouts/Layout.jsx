import { useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { Analytics } from "@vercel/analytics/react";
import Nav from "../shared/components/Nav";
import Footer from "../sections/Footer";
import ShopWidget from "../shared/components/ShopWidget";
import CartOverlay from "../shared/components/CartOverlay";
import LoadingScreen from "../shared/components/LoadingScreen";

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  return (
    <div className="relative min-h-screen">
      <ReactLenis root options={{ duration: 1.2, smoothWheel: true }} />
      <LoadingScreen />
      <Nav />
      <main>{children}</main>
      <Footer />
      <ShopWidget onClick={() => setIsCartOpen(true)} />
      <CartOverlay open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Analytics />
    </div>
  );
};

export default Layout;
