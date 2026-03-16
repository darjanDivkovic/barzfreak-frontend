import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";
const MemberModal = ({ open, onClose }) => {
  const { lang } = useLanguage();
  const t = translations[lang]?.member;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("submitting");
    try {
      const res = await fetch("https://formsubmit.co/ajax/darjan.developer@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _subject: "New BarzFreak Member Signup",
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-green-400 text-xl">✓</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{t?.success}</h2>
            <p className="text-white/40 text-[13px]">BarzFreak 💪</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-7">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#a40000] font-semibold mb-2">
                BarzFreak
              </p>
              <h2 className="text-[1.6rem] font-bold tracking-tight leading-tight">
                {t?.modalTitle}
              </h2>
              <p className="mt-2 text-white/40 text-[13px]/[22px]">
                {t?.modalSubtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t?.namePlaceholder}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t?.emailPlaceholder}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
              />

              {status === "error" && (
                <p className="text-red-400 text-[12px]">{t?.error}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full mt-1 bg-[#a40000] hover:bg-[#c00000] disabled:opacity-50 text-white font-semibold text-[11px] uppercase tracking-[0.14em] py-3.5 rounded-xl transition-colors"
              >
                {status === "submitting" ? t?.submitting : t?.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MemberModal;
