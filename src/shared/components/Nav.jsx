import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
import MemberModal from "./MemberModal";
import LogoImg from "../../../public/assets/Logo.svg";
import WrittenLogo from "../../../public/assets/WrittenLogo.png";
import { useCartStore } from "../../store/cartStore";

const menuItemKeys = [
  { key: "home", to: "/" },
  { key: "shop", to: "/shop" },
  { key: "news", to: "/news" },
  { key: "about", to: "/about" },
];

const CartButton = ({ className = "" }) => {
  const itemCount = useCartStore((s) => s.itemCount);
  const openCart = useCartStore((s) => s.openCart);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      return () => clearTimeout(t);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Open cart"
      style={{ transition: "transform 0.15s" }}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors ${className}`}
    >
      <ShoppingBag
        className="size-[18px]"
        style={{
          transform: bump ? "scale(1.35)" : "scale(1)",
          transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
      {itemCount > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#a40000] text-white text-[9px] font-bold flex items-center justify-center leading-none"
          style={{
            transform: bump ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {itemCount}
        </span>
      )}
    </button>
  );
};

const Nav = () => {
  const [menuState, setMenuState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <>
      <header>
        <nav
          data-state={menuState ? "active" : undefined}
          className="group fixed z-100 w-full border-b border-dashed border-white/10 bg-[#050505]/85 backdrop-blur-md"
        >
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link to="/" aria-label="home" className="flex items-center">
                  <img src={LogoImg} alt="BarzFreak" className="h-9 w-auto opacity-90" />
                  <img src={WrittenLogo} alt="Written Logo" className="mx-auto ml-5 h-[20px] md:h-[40px]" />
                </Link>

                {/* Cart icon — mobile only (always visible in top bar) */}
                <CartButton className="lg:hidden" />

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white/70 hover:text-white transition-colors"
                >
                  <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                  <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-2xl border border-white/10 bg-[#050505] p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                <div className="lg:pr-4">
                  <ul className="space-y-6 lg:flex lg:gap-8 lg:space-y-0">
                    {menuItemKeys.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item.to}
                          onClick={() => setMenuState(false)}
                          className="text-white/40 hover:text-white block duration-200 text-[11px] uppercase tracking-[0.15em] font-medium"
                        >
                          {t?.nav?.[item.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:border-white/10 lg:pl-6 lg:items-center">
                  {/* Cart icon — desktop only (in menu section) */}
                  <CartButton className="hidden lg:flex" />
                  <Button
                    size="sm"
                    onClick={() => { setMenuState(false); setModalOpen(true); }}
                    className="text-[11px] uppercase tracking-[0.12em] font-semibold"
                  >
                    {t?.nav?.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MemberModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Nav;
