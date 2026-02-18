import { useState, useRef, useEffect } from "react";

function AddToCartButton({ onAdd }) {
  const [isHolding, setIsHolding] = useState(false);
  const holdDuration = 500; // 2 seconds ← you have 500 ms now (0.5s), was probably for testing
  const intervalRef = useRef(null);

  const startHold = () => {
    setIsHolding(true);

    intervalRef.current = setInterval(() => {
      setIsHolding((current) => {
        if (!current) {
          clearInterval(intervalRef.current);
          return false;
        }

        const elapsed = Date.now() - startTimeRef.current;
        if (elapsed >= holdDuration) {
          clearInterval(intervalRef.current);
          onAdd();
          setIsHolding(false);
          return false;
        }
        return true;
      });
    }, 50);
  };

  const cancelHold = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsHolding(false);
  };

  const startTimeRef = useRef(0);

  const handlePointerDown = () => {
    startTimeRef.current = Date.now();
    startHold();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="mt-6">
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        onPointerCancel={cancelHold}
        onTouchEnd={cancelHold}
        className={`
          relative overflow-hidden
          w-full py-4 px-6
          font-medium text-lg
          text-white bg-transparent
          border-2 rounded-sm border-white/20
          transition-colors duration-300
          ${
            isHolding
              ? ""
              : "border-white/20 hover:border-white/90 bg-transparent"
          }
          select-none
        `}
      >
        <div
          className={`
            absolute inset-0 bg-red-600/70 
            transition-transform duration-[500ms] ease-linear
            ${isHolding ? "translate-x-0" : "-translate-x-full"}
          `}
        />

        <span className="relative z-10">Add to Cart</span>
      </button>
    </div>
  );
}

export default AddToCartButton;
