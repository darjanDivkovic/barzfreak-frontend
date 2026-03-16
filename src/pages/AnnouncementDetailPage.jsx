import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useLanguage } from "../context/LanguageContext";
import { ArrowLeft } from "lucide-react";
import LocationIcon from "../../public/assets/LocationIcon.svg";
import DateIcon from "../../public/assets/DateIcon.svg";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export default function AnnouncementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isBosnian = lang === "bs";

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from("tournament").select().eq("id", id).single();
      if (data) {
        setTournament({
          ...data,
          name: (isBosnian ? data.name_bs : data.name_en) || (isBosnian ? "Bez naziva" : "No name"),
          description: (isBosnian ? data.description_bs : data.description_en) || "",
        });
      }
      setLoading(false);
    }
    fetch();
  }, [id, lang]);

  const scrollToIndex = (idx) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const children = Array.from(slider.children);
    const safeIdx = Math.max(0, Math.min(idx, children.length - 1));
    slider.scrollTo({ left: children[safeIdx].offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const handleScroll = () => {
      const children = Array.from(slider.children);
      if (!children.length) return;
      const center = slider.scrollLeft + slider.clientWidth / 2;
      let bestIdx = 0, bestDist = Infinity;
      children.forEach((el, i) => {
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      setActiveIndex(bestIdx);
    };
    slider.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [tournament?.images?.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-white/20 text-[12px] uppercase tracking-[0.2em]">
          {isBosnian ? "Učitavanje..." : "Loading..."}
        </span>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-white/30 text-[13px] uppercase tracking-[0.15em]">
          {isBosnian ? "Nije pronađeno" : "Not found"}
        </p>
        <button onClick={() => navigate(-1)} className="text-[#a40000] text-[12px] uppercase tracking-[0.2em] hover:opacity-70 transition flex items-center gap-2">
          <ArrowLeft size={14} /> {isBosnian ? "Nazad" : "Back"}
        </button>
      </div>
    );
  }

  const hasImages = (tournament.images?.length || 0) > 0;
  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= (tournament.images?.length || 1) - 1;

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/30 hover:text-white/70 transition text-[12px] uppercase tracking-[0.2em] mb-12"
      >
        <ArrowLeft size={14} />
        {isBosnian ? "Nazad" : "Back"}
      </button>

      {/* Hero card */}
      {hasImages && (
        <div className="relative w-full h-[480px] sm:h-[560px] overflow-hidden rounded-2xl mb-6">
          <img
            src={tournament.images[0]}
            alt={tournament.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

          {tournament.images.length > 1 && (
            <div className="absolute top-5 right-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 border border-white/10 px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-sm">
                {tournament.images.length} photos
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
            <div className="flex flex-wrap gap-4 mb-2">
              {tournament.location && (
                <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
                  <img src={LocationIcon} alt="" className="w-3.5 h-3.5 opacity-50" />
                  {tournament.location}
                </div>
              )}
              {tournament.date && (
                <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
                  <img src={DateIcon} alt="" className="w-3.5 h-3.5 opacity-50" />
                  {tournament.date}
                </div>
              )}
            </div>
            <h1 className="text-[2rem] sm:text-[2.8rem] xl:text-[3.4rem] font-bold leading-tight whitespace-pre-line">
              {tournament.name.trim()}
            </h1>
          </div>
        </div>
      )}

      {/* No images fallback header */}
      {!hasImages && (
        <div className="mb-10">
          <div className="flex flex-wrap gap-4 mb-3">
            {tournament.location && (
              <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
                <img src={LocationIcon} alt="" className="w-4 h-4 opacity-50" />
                {tournament.location}
              </div>
            )}
            {tournament.date && (
              <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
                <img src={DateIcon} alt="" className="w-4 h-4 opacity-50" />
                {tournament.date}
              </div>
            )}
          </div>
          <h1 className="text-[2rem] sm:text-[2.8rem] font-bold leading-tight whitespace-pre-line">
            {tournament.name.trim()}
          </h1>
        </div>
      )}

      {/* Description */}
      {tournament.description && (
        <p className="mt-6 text-white/50 text-[14px]/[26px] max-w-2xl whitespace-pre-line">
          {tournament.description}
        </p>
      )}

      {/* Full image slider */}
      {hasImages && tournament.images.length > 1 && (
        <div className="mt-10 relative">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={isFirst}
            aria-label="Previous"
            className="hidden xl:flex items-center justify-center absolute left-[-18px] top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-black/60 border border-white/10 backdrop-blur text-white/80 hover:bg-black/80 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition"
          >
            <span className="text-lg leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={isLast}
            aria-label="Next"
            className="hidden xl:flex items-center justify-center absolute right-[-18px] top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-black/60 border border-white/10 backdrop-blur text-white/80 hover:bg-black/80 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition"
          >
            <span className="text-lg leading-none">›</span>
          </button>

          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 cursor-grab scroll-smooth scrollbar-hide xl:select-none"
          >
            {tournament.images.map((img, idx) => (
              <div
                key={idx}
                className="snap-start flex-shrink-0 w-[75vw] sm:w-[46vw] lg:w-[32vw] xl:w-[28vw] aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
                  src={img}
                  alt={`Photo ${idx + 1}`}
                  className={`w-full h-full object-cover transition-all duration-400 ease-out cursor-zoom-in ${
                    idx === activeIndex ? "scale-105 opacity-100" : "scale-95 opacity-50"
                  }`}
                  loading="lazy"
                  draggable={false}
                  onClick={() => setLightbox(img)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {tournament.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`rounded-full transition-all duration-200 ${
                  idx === activeIndex ? "w-4 h-1.5 bg-[#a40000]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
