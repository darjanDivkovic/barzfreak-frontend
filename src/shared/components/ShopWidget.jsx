import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";

import Market from "../../../public/assets/Market.svg";

const ShopWidget = ({ onClick }) => {
  const itemCount = useCartStore((state) => state.itemCount);

  // keep mounted long enough to play exit animation
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (itemCount > 0) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 220); // match transition duration
      return () => clearTimeout(t);
    }
  }, [itemCount]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        fixed bottom-5 right-5 z-50
        transition-all duration-200 ease-out
        ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2"}
      `}
      aria-label="Open cart"
    >
      {/* Glass circle */}
      <div
        className="
          relative h-16 w-16 rounded-full
          flex items-center justify-center
          bg-white/10 backdrop-blur-sm
          border border-white/15
          shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          hover:scale-[1.03] active:scale-[0.98]
          transition-transform
        "
      >
        <img src={Market} alt="Cart" className="h-6 w-6" />

        {/* Badge top-right */}
        <div
          className="
            absolute -top-2 -right-2
            min-w-[26px] h-[26px]
            px-2
            rounded-full
            bg-red-500
            text-white
            text-xs font-bold
            flex items-center justify-center
            shadow-[0_8px_20px_rgba(0,0,0,0.35)]
            border border-white/20
          "
        >
          {itemCount}
        </div>
      </div>
    </button>
  );
};

export default ShopWidget;
