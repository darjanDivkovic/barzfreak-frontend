import Logo from "../../public/assets/Logo.svg";
import BackgroundX from "../../public/assets/BackgroundX.svg";

import FireSparksBackground from "../shared/components/FireSparksBackground";
import SwipeUp from "../shared/components/SwipeUp";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang]?.hero;
  return (
    <div className="relative h-[100vh] flex flex-col items-center pt-[5vh] overflow-hidden">
      <FireSparksBackground />

      {/* The rising reddish sparks */}

      <img
        src={Logo}
        alt="BarzFreak Logo"
        className="relative scale-70 z-10 xl:scale-90"
      />

      <h1 className="mt-[10vh] text-[3.4rem] xl:text-[6rem] relative z-10">
        BUILT FOR
      </h1>
      <h1 className="text-[3.6rem] xl:text-[6.2rem] mt-[-25px] red-secondary relative z-10">
        THE BARZ
      </h1>

      <p className="mt-4 text-center px-8 gray-secondary text-[14px]/[17px] xl:text-[15px]/[20px] relative z-10">
        {t.line1}
        <br />
        {t.line2}
        <br />
        {t.line3}
      </p>

      <div className="absolute bottom-10">
        <SwipeUp />
      </div>

      <img
        src={BackgroundX}
        alt="Background X"
        className="absolute bottom-0 z-0"
      />
    </div>
  );
};

export default Hero;
