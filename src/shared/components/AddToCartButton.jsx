import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { ShoppingBag } from "lucide-react";

function AddToCartButton({ onAdd }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const { lang } = useLanguage();

  const label = lang === "bs" ? "Dodaj u Košaricu" : "Add to Cart";
  const addedLabel = lang === "bs" ? "Dodano!" : "Added!";
  const loadingLabel = lang === "bs" ? "Dodavanje..." : "Adding...";

  const handleClick = async () => {
    if (!onAdd || loading) return;
    try {
      setLoading(true);
      await onAdd();
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`mt-4 w-full py-3 px-5 flex items-center justify-center gap-2 rounded-xl text-[11px] uppercase tracking-[0.14em] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
        added
          ? "bg-green-600/20 border border-green-500/40 text-green-400"
          : "bg-[#a40000]/90 hover:bg-[#c00000] text-white border border-[#a40000]"
      }`}
    >
      <ShoppingBag className="size-4" />
      {loading ? loadingLabel : added ? addedLabel : label}
    </button>
  );
}

export default AddToCartButton;
