// src/shared/components/LoadingScreen.jsx
import { useEffect, useState } from "react";

import Bosna from "../../../public/assets/flags/Bosna.png";
import America from "../../../public/assets/flags/America.png";

const LANGUAGE_KEY = "preferredLanguage";
const FADE_DURATION = 600; // ms

const getInitialPhase = () => {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return saved ? "loading" : "picker";
  } catch {
    // if localStorage is blocked for some reason, just show loader
    return "loading";
  }
};

const LoadingScreen = () => {
  const [phase, setPhase] = useState(getInitialPhase); // "loading" | "picker" | "fading"
  const [selectedLang, setSelectedLang] = useState(null);
  const [hidden, setHidden] = useState(false);

  // Returning visitor → show loader briefly → fade out
  useEffect(() => {
    if (phase !== "loading") return;

    const t = setTimeout(() => {
      setPhase("fading");
    }, 1200);

    return () => clearTimeout(t);
  }, [phase]);

  const handleSelect = (lang) => {
    localStorage.setItem(LANGUAGE_KEY, lang);
    setSelectedLang(lang);
    setPhase("fading");
  };

  const handleFadeEnd = () => {
    if (phase === "fading") {
      // language is now finalized (savedLang or selectedLang)
      setHidden(true); // unmount completely so it never blocks clicks again
    }
  };

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity ease-in-out ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      onTransitionEnd={handleFadeEnd}
    >
      {phase === "picker" ? (
        <div className="text-center space-y-10 px-6 max-w-md animate-fade-in">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold tracking-wide">
            Odaberite jezik / Choose language
          </h2>

          <div className="flex sm:flex-row gap-8 justify-center items-center">
            <button
              onClick={() => handleSelect("bs")}
              className="group flex flex-col items-center gap-3 min-w-[140px] px-8 py-6 bg-white/10 backdrop-blur-sm rounded-2xl text-base font-medium hover:bg-white/20 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300"
            >
              <img
                src={Bosna}
                alt="Bosnia and Herzegovina flag"
                className="scale-70 w-16 h-12 object-cover rounded shadow-md group-hover:scale-110 transition-transform"
              />
              Bosanski
            </button>

            <button
              onClick={() => handleSelect("en")}
              className="group flex flex-col items-center gap-3 min-w-[140px] px-8 py-6 bg-white/10 backdrop-blur-sm rounded-2xl text-base font-medium hover:bg-white/20 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300"
            >
              <img
                src={America}
                alt="USA flag"
                className="scale-70 w-16 h-12 object-cover rounded shadow-md group-hover:scale-110 transition-transform"
              />
              English
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 animate-pulse">
          <div className="w-80 h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-white/40 to-white animate-[loading_2s_infinite]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
