import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const WhoWeAre = () => {
  const { lang } = useLanguage();
  const t = translations[lang]?.whoWeAre;

  return (
    <section className="mx-auto max-w-5xl px-6 py-6 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border border-white/10 rounded-2xl p-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#a40000] font-semibold mb-4">
            01
          </p>
          <h2 className="text-[1.4rem] font-bold tracking-tight mb-4">
            {t?.title1}
          </h2>
          <p className="text-white/50 text-[14px]/[26px]">{t?.body1}</p>
        </div>

        <div className="border border-white/10 rounded-2xl p-8">
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
