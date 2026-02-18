import { useState } from "react";

function AddToCartButton({ onAdd }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!onAdd || loading) return;

    try {
      setLoading(true);
      await onAdd(); // supports async or sync
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="
          w-full py-4 px-6
          font-medium text-lg
          text-white bg-transparent
          border-2 rounded-sm border-white/20
          transition
          hover:border-white/90 hover:bg-white/5
          disabled:opacity-40 disabled:cursor-not-allowed
          active:scale-98
        "
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}

export default AddToCartButton;
