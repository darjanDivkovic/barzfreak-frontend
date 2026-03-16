import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import FireSparksBackground from "../shared/components/FireSparksBackground";
import SwipeUp from "../shared/components/SwipeUp";
import MemberModal from "../shared/components/MemberModal";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  return (
    <section className="relative h-[100vh] overflow-hidden">
      <FireSparksBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-6 h-full flex items-center justify-center pt-16">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <Link
            to="/shop"
            className="rounded-lg mx-auto flex w-fit items-center gap-2 border border-white/15 bg-white/5 p-1 pr-3 mb-10"
          >
            <span className="bg-[#a40000] rounded-md px-2 py-1 text-[10px] uppercase tracking-widest font-semibold text-white">
              New
            </span>
            <span className="text-[12px] text-white/60 uppercase tracking-[0.1em]">
              {t?.hero?.button1}
            </span>
            <span className="block h-4 w-px bg-white/15" />
            <ArrowRight className="size-4 text-white/40" />
          </Link>

          <h1 className="text-[3.4rem] xl:text-[5.5rem] leading-none tracking-tight scale-75">
            BUILT FOR
          </h1>
          <h1 className="text-[3.6rem] xl:text-[6.8rem] font-bold mt-[-50px] text-[#a40000] drop-shadow-[0_0_40px_rgba(164,0,0,0.45)] scale-90 mt-[-10px]">
            THE BARZ
          </h1>

          <p className="mt-6 text-white/80 text-[13px]/[22px] xl:text-[14px]/[24px] w-full mx-auto">
            <span className="font-bold">{t?.hero?.line1}</span>
            <br />
            <span className="text-white/60">
              {t?.hero?.line2} {t?.hero?.line3}
            </span>
          </p>

          <MemberModal
            open={memberModalOpen}
            onClose={() => setMemberModalOpen(false)}
          />

          <div className="mt-9 flex flex-col gap-3 sm:flex-row justify-center">
            <Button
              onClick={() => setMemberModalOpen(true)}
              className="px-8 text-[11px] uppercase tracking-[0.14em] font-semibold h-11"
            >
              {t?.member?.cta}
            </Button>
            <Button
              variant="outline"
              asChild
              className="px-8 text-[11px] uppercase tracking-[0.14em] font-semibold h-11"
            >
              <Link to="/about">{t?.about?.cta2}</Link>
            </Button>
          </div>

          <ul className="hidden sm:block mt-8 space-y-2 text-white/30 text-[11px] uppercase tracking-[0.15em] font-medium">
            <li className="flex items-center gap-2 justify-center">
              <span className="text-[#a40000]">—</span> {t?.about?.text1}
            </li>
            <li className="flex items-center gap-2 justify-center">
              <span className="text-[#a40000]">—</span> {t?.about?.text2}
            </li>
            <li className="flex items-center gap-2 justify-center">
              <span className="text-[#a40000]">—</span> {t?.about?.text3}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
