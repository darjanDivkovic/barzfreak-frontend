import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import WhoWeAre from "../sections/WhoWeAre";

const AboutPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="pt-28 min-h-screen">
      <div className="mx-auto max-w-5xl px-6 pt-8 pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#a40000] font-semibold mb-4">
          {t?.nav?.about}
        </p>
        <h1 className="text-[3rem] xl:text-[4.5rem] leading-none tracking-tight">
          BARZ<span className="text-[#a40000]">FREAK</span>
        </h1>
      </div>

      <WhoWeAre />

      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="border-t border-white/10 pt-10">
          <ul className="space-y-3 text-white/30 text-[11px] uppercase tracking-[0.15em] font-medium">
            <li className="flex items-center gap-3">
              <span className="text-[#a40000]">—</span> {t?.about?.text1}
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#a40000]">—</span> {t?.about?.text2}
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#a40000]">—</span> {t?.about?.text3}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
