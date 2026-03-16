import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

const MemberInline = () => {
  const { lang } = useLanguage();
  const t = translations[lang]?.member;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

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

  return (
    <div className="border-t border-white/8 pt-10 mt-10">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#a40000] font-semibold mb-2">
        {t?.inlineTitle}
      </p>
      <p className="text-white/40 text-[13px]/[22px] mb-5 max-w-xs">
        {t?.inlineSubtitle}
      </p>

      {status === "success" ? (
        <p className="text-green-400 text-[13px] font-medium">{t?.success}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t?.namePlaceholder}
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
          />
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t?.emailPlaceholder}
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-[#a40000] hover:bg-[#c00000] disabled:opacity-50 text-white rounded-xl px-3.5 py-2.5 transition-colors flex items-center"
              aria-label={t?.submit}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
          {status === "error" && (
            <p className="text-red-400 text-[11px]">{t?.error}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default MemberInline;
