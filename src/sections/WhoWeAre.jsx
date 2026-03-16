import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const WhoWeAre = () => {
  const { lang } = useLanguage();
  const t = translations[lang]?.whoWeAre;
  const label = lang === "bs" ? "O Nama" : "About Us";

  return (
    <section className="mx-auto max-w-5xl px-6 py-6 mb-20">
      {/* Section header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-white/15" />
        <span className="text-[1.1rem] text-white/70 shrink-0" style={{ fontFamily: "'Rock Salt', cursive" }}>
          {label}
        </span>
        <div className="flex-1 h-px bg-white/15" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative border border-white/10 rounded-2xl p-8 overflow-hidden group hover:border-white/20 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#a40000] rounded-l-2xl" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#a40000] font-semibold mb-4">
            01
          </p>
          <h2 className="text-[1.4rem] font-bold tracking-tight mb-4">
            {t?.title1}
          </h2>
          <p className="text-white/50 text-[14px]/[26px]">{t?.body1}</p>
        </div>

        <div className="relative border border-white/10 rounded-2xl p-8 overflow-hidden group hover:border-white/20 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#a40000] rounded-l-2xl" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#a40000] font-semibold mb-4">
            02
          </p>
          <h2 className="text-[1.4rem] font-bold tracking-tight mb-4">
            {t?.title2}
          </h2>
          <p className="text-white/50 text-[14px]/[26px]">{t?.body2}</p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
