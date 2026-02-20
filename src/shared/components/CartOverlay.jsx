import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import OrderForm from "./OrderForm";

const CartOverlay = ({ open, onClose }) => {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 220);
      document.body.style.overflow = "";
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) setShowOrderForm(false);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, onClose]);

  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "BAM",
    }).format(totalPrice || 0);
  }, [totalPrice]);

  const checkout = () => setShowOrderForm(true);

  if (!mounted) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[999]
        h-[100dvh]
        transition-opacity duration-200 ease-out
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          absolute inset-0
          bg-black/50 backdrop-blur-sm
          transition-opacity duration-200
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Drawer */}
      <div
        className={`
          absolute right-0 top-0
          w-full sm:w-[420px]
          h-[100dvh]
          bg-white/10 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.55)]
          transition-transform duration-200 ease-out
          ${visible ? "translate-x-0" : "translate-x-6"}
          flex flex-col
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <p className="text-white font-semibold text-lg">
              {showOrderForm ? "Place Order" : "Your Cart"}
            </p>
            <p className="text-white/60 text-sm">
              {items.length === 0
                ? "No items yet"
                : `${items.length} item type(s)`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              h-9 w-9 rounded-full
              bg-white/10 hover:bg-white/15
              border border-white/10
              text-white
              transition
            "
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex-1 overflow-auto">
          {showOrderForm ? (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowOrderForm(false)}
                className="text-white/70 hover:text-white text-sm underline underline-offset-4"
              >
                ← Back to cart
              </button>

              <OrderForm />
            </div>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="mt-10 text-center text-white/70">
                  <p className="text-base">Cart is empty.</p>
                  <p className="text-sm text-white/50 mt-1">
                    Add a shirt/hoodie and it’ll show up here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="
                        flex gap-3 items-center
                        p-3 rounded-2xl
                        bg-white/5 border border-white/10
                      "
                    >
                      <div className="h-14 w-14 rounded-xl bg-white/10 border border-white/10 overflow-hidden flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-white/50 text-xs">IMG</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                          {item.name || "Untitled item"}
                        </p>

                        <div className="flex items-center justify-between mt-1">
                          <p className="text-white/60 text-sm">
                            {new Intl.NumberFormat(undefined, {
                              style: "currency",
                              currency: "BAM",
                            }).format(item.price || 0)}
                          </p>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-white/60 hover:text-white text-xs underline underline-offset-4"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="
                                h-8 w-8 rounded-full
                                bg-white/10 hover:bg-white/15
                                border border-white/10
                                text-white
                                transition
                              "
                            >
                              −
                            </button>

                            <div className="min-w-[34px] text-center text-white font-semibold">
                              {item.quantity}
                            </div>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="
                                h-8 w-8 rounded-full
                                bg-white/10 hover:bg-white/15
                                border border-white/10
                                text-white
                                transition
                              "
                            >
                              +
                            </button>
                          </div>

                          <p className="text-white font-semibold">
                            {new Intl.NumberFormat(undefined, {
                              style: "currency",
                              currency: "BAM",
                            }).format((item.price || 0) * (item.quantity || 0))}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 pb-[calc(env(safe-area-inset-bottom)+16px)]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/70">Total</p>
            <p className="text-white font-semibold">{formattedTotal}</p>
          </div>

          {!showOrderForm && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={clearCart}
                disabled={items.length === 0}
                className="
                  flex-1 h-11 rounded-xl
                  bg-white/10 hover:bg-white/15
                  border border-white/10
                  text-white
                  transition
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                Clear
              </button>

              <button
                type="button"
                onClick={checkout}
                disabled={items.length === 0}
                className="
                  flex-[1.4] h-11 rounded-xl
                  bg-white text-black font-semibold
                  hover:opacity-90 transition
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                Order Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
