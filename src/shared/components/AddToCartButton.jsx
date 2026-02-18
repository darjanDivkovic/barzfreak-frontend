import { useRef, useState, useEffect } from "react";

function AddToCartButton({ onAdd }) {
  const [isHolding, setIsHolding] = useState(false);

  const timeoutRef = useRef(null);
  const holdingRef = useRef(false);

  const HOLD_DELAY = 700; // call onAdd after 1000ms hold

  const startHold = () => {
    if (holdingRef.current) return;

    holdingRef.current = true;
    setIsHolding(true);

    timeoutRef.current = setTimeout(() => {
      if (!holdingRef.current) return; // released early
      onAdd(); // ✅ fires once after 1000ms hold
    }, HOLD_DELAY);
  };

  const stopHold = () => {
    holdingRef.current = false;
    setIsHolding(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopHold();
  }, []);

  return (
    <div className="mt-6">
      <button
        type="button"
        onPointerDown={startHold}
        onPointerUp={stopHold}
        onPointerCancel={stopHold}
        className={`
          relative overflow-hidden
          w-full py-4 px-6
          font-medium text-lg
          text-white bg-transparent
          border-2 rounded-sm border-white/20
          transition-colors duration-300
          ${
            isHolding
              ? "border-red-400/50 bg-red-950/30"
              : "hover:border-white/90 hover:bg-white/5"
          }
          select-none
          active:scale-98
        `}
      >
        {/* Progress / filling bar (your original animation) */}
        <div
          className={`
            absolute inset-0 bg-red-600/60
            transition-transform duration-500 ease-linear
            ${isHolding ? "translate-x-0" : "-translate-x-full"}
          `}
        />

        <span className="relative z-10 flex items-center justify-center gap-2">
          {isHolding ? "Holding..." : "Add to Cart"}
        </span>
      </button>
    </div>
  );
}

export default AddToCartButton;
