// src/components/cart/OrderForm.jsx
import { useMemo, useState } from "react";
import { useCartStore } from "../../store/cartStore";

export default function OrderForm({ onSuccess }) {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const clearCart = useCartStore((s) => s.clearCart);

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const formatMoney = (n) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "BAM",
    }).format(Number(n || 0));

  const normalizedItems = useMemo(() => {
    return (items || []).map((i) => {
      const qty = Math.max(1, Number(i.quantity || 1));
      const unit = Number(i.price || 0);
      const line = qty * unit;

      // normalize color, fallback to "-"
      const colorRaw = (i.color ?? i.variantColor ?? i.selectedColor ?? "")
        .toString()
        .trim();
      const color = colorRaw ? colorRaw : "-";

      const name = (i.name || "Item").toString().trim();

      return { name, color, qty, unit, line };
    });
  }, [items]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!items?.length) {
      setResult("Cart is empty.");
      return;
    }

    setLoading(true);
    setResult("");
    setCompleted(false);

    const formData = new FormData(event.target);

    // Web3Forms key
    formData.append("access_key", "4973c27a-f88a-4d31-96f0-350b7d820190");

    // Useful meta
    const customerName = (formData.get("name") || "Unknown").toString().trim();
    formData.append("subject", `NEW ORDER - ${customerName}`);
    formData.append("from_name", "barz-freak.com");
    formData.append("total", formatMoney(totalPrice || 0));

    // Pack cart into a single message
    const cartMessage = normalizedItems
      .map((i) => {
        // Example: - T-Shirt (black) — qty: 1 — unit: KM 20.00 — line: KM 20.00
        return `- ${i.name} (${i.color}) — qty: ${i.qty} — unit: ${formatMoney(
          i.unit,
        )} — line: ${formatMoney(i.line)}`;
      })
      .join("\n");

    const contact = (formData.get("contact") || "").toString().trim();
    const notes = (formData.get("notes") || "").toString().trim();

    const message = [
      `NAME: ${customerName || "-"}`,
      `CONTACT: ${contact || "-"}`,
      notes ? `NOTES: ${notes}` : null,
      "",
      "ITEMS:",
      cartMessage || "-",
      "",
      `TOTAL: ${formatMoney(totalPrice || 0)}`,
    ]
      .filter(Boolean)
      .join("\n");

    formData.set("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        setResult("Error sending order. Try again.");
        setLoading(false);
        return;
      }

      // ✅ success UX
      setResult("Order sent ✅ We'll contact you soon.");
      setCompleted(true);

      clearCart();
      onSuccess?.(); // you can close overlay / show success screen outside
      event.target.reset();
    } catch (e) {
      setResult("Network error. Try again.");
      setCompleted(false);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || items.length === 0;

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* ✅ Strong success state (user can’t miss it) */}
      {completed ? (
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
          <p className="text-emerald-200 font-semibold">Order complete ✅</p>
          <p className="text-emerald-200/80 text-sm mt-1">
            We received your order and we’ll contact you soon to confirm
            details.
          </p>

          <button
            type="button"
            onClick={() => {
              // allow user to place another order later if you want
              setCompleted(false);
              setResult("");
            }}
            className="
              mt-3 w-full h-11 rounded-2xl
              bg-white text-black font-semibold
              hover:opacity-90 active:opacity-80 transition
            "
          >
            Place another order
          </button>
        </div>
      ) : (
        <>
          <div className="rounded-2xl bg-white/7 border border-white/10 p-3">
            <p className="text-white font-semibold text-sm">Contact info</p>
            <p className="text-white/55 text-xs mt-1">
              Enter your name + phone number or Instagram so we can confirm the
              order.
            </p>

            <div className="mt-3 grid gap-2">
              <label className="grid gap-1">
                <span className="text-white/70 text-xs">Full name</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Darjan Divković"
                  className="
                    h-11 px-3 rounded-xl
                    bg-black/20 border border-white/10
                    text-white placeholder:text-white/35
                    outline-none focus:border-white/25
                  "
                />
              </label>

              <label className="grid gap-1">
                <span className="text-white/70 text-xs">Email (optional)</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@gmail.com (optional)"
                  className="
                    h-11 px-3 rounded-xl
                    bg-black/20 border border-white/10
                    text-white placeholder:text-white/35
                    outline-none focus:border-white/25
                  "
                />
              </label>

              <label className="grid gap-1">
                <span className="text-white/70 text-xs">
                  Phone or Instagram
                </span>
                <input
                  type="text"
                  name="contact"
                  required
                  placeholder="e.g. +387 6X XXX XXX or @barzfreak"
                  className="
                    h-11 px-3 rounded-xl
                    bg-black/20 border border-white/10
                    text-white placeholder:text-white/35
                    outline-none focus:border-white/25
                  "
                />
              </label>

              <label className="grid gap-1">
                <span className="text-white/70 text-xs">Notes (optional)</span>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Size, color, city, delivery..."
                  className="
                    px-3 py-2 rounded-xl
                    bg-black/20 border border-white/10
                    text-white placeholder:text-white/35
                    outline-none focus:border-white/25
                    resize-none
                  "
                />
              </label>

              {/* required by Web3Forms snippet - we overwrite it in JS */}
              <textarea
                name="message"
                className="hidden"
                required
                defaultValue="-"
              />
            </div>
          </div>

          {result && (
            <div
              className={`rounded-2xl border p-3 text-sm ${
                result.startsWith("Order sent")
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200"
                  : "bg-red-500/10 border-red-500/20 text-red-200"
              }`}
            >
              {result}
            </div>
          )}

          <button
            type="submit"
            disabled={disabled}
            className="
              w-full h-12 rounded-2xl
              bg-white text-black font-semibold
              hover:opacity-90 active:opacity-80 transition
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            {loading ? "Sending..." : "Order Now"}
          </button>

          <p className="text-center text-[11px] text-white/40">
            We’ll contact you to confirm the order.
          </p>
        </>
      )}
    </form>
  );
}
