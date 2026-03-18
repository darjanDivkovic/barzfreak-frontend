import { ReactLenis } from "lenis/react";
import { Analytics } from "@vercel/analytics/react";
import Nav from "../shared/components/Nav";
import Footer from "../sections/Footer";
import ShopWidget from "../shared/components/ShopWidget";
import CartOverlay from "../shared/components/CartOverlay";
import LoadingScreen from "../shared/components/LoadingScreen";
import { useCartStore } from "../store/cartStore";

const Layout = ({ children }) => {
  const isCartOpen = useCartStore((s) => s.isCartOpen);
  const closeCart = useCartStore((s) => s.closeCart);

  return (
    <div className="relative min-h-screen">
      <ReactLenis root options={{ duration: 1.2, smoothWheel: true }} />
      <LoadingScreen />
      <Nav />
      <main>{children}</main>
      <Footer />
      <ShopWidget />
      <CartOverlay open={isCartOpen} onClose={closeCart} />
      <Analytics />
    </div>
  );
};

export default Layout;
