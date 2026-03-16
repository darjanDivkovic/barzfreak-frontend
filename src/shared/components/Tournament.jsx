import { useEffect, useRef, useState } from "react";
import LocationIcon from "../../../public/assets/LocationIcon.svg";
import DateIcon from "../../../public/assets/DateIcon.svg";

function Tournament({ tournament, onImageClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const scrollToIndex = (idx) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const children = Array.from(slider.children);
    if (!children.length) return;
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
  }, [tournament.images?.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !window.matchMedia("(min-width: 1280px)").matches) return;
    let isDown = false, startX = 0, startScrollLeft = 0;
    const onDown = (e) => { if (e.button !== 0) return; isDown = true; slider.classList.add("cursor-grabbing"); startX = e.pageX; startScrollLeft = slider.scrollLeft; };
    const onUpOrLeave = () => { isDown = false; slider.classList.remove("cursor-grabbing"); };
    const onMove = (e) => { if (!isDown) return; e.preventDefault(); slider.scrollLeft = startScrollLeft - (e.pageX - startX) * 1.1; };
    slider.addEventListener("mousedown", onDown);
    slider.addEventListener("mousemove", onMove);
    slider.addEventListener("mouseleave", onUpOrLeave);
    window.addEventListener("mouseup", onUpOrLeave);
    return () => { slider.removeEventListener("mousedown", onDown); slider.removeEventListener("mousemove", onMove); slider.removeEventListener("mouseleave", onUpOrLeave); window.removeEventListener("mouseup", onUpOrLeave); };
  }, [tournament.images?.length]);

  const hasImages = (tournament.images?.length || 0) > 0;
  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= (tournament.images?.length || 1) - 1;

  return (
    <div>
      {/* Header */}
      <h2 className="text-[2rem] xl:text-[2.8rem] font-bold leading-tight whitespace-pre-line">
        {tournament.name.trim()}
      </h2>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap gap-4">
        {tournament.location && (
          <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
            <img src={LocationIcon} alt="Location" className="w-4 h-4 opacity-50" />
            {tournament.location}
          </div>
        )}
        {tournament.date && (
          <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
            <img src={DateIcon} alt="Date" className="w-4 h-4 opacity-50" />
            {tournament.date}
          </div>
        )}
      </div>

      {/* Description */}
      {tournament.description && (
        <p className="mt-4 text-white/50 text-[14px]/[26px] max-w-xl whitespace-pre-line">
          {tournament.description}
        </p>
      )}

      {/* Image slider */}
      {hasImages && (
        <div className="mt-8 relative">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={isFirst}
            aria-label="Previous image"
            className="hidden xl:flex items-center justify-center absolute left-[-18px] top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-black/60 border border-white/10 backdrop-blur text-white/80 hover:bg-black/80 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition"
          >
            <span className="text-lg leading-none">‹</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={isLast}
            aria-label="Next image"
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
                className="snap-start flex-shrink-0 w-[75vw] sm:w-[42vw] lg:w-[28vw] xl:w-[22vw] aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
                  src={img}
                  alt={`Tournament image ${idx + 1}`}
                  className={`w-full h-full object-cover transition-all duration-400 ease-out cursor-zoom-in ${
                    idx === activeIndex ? "scale-105 opacity-100" : "scale-95 opacity-50"
                  }`}
                  loading="lazy"
                  draggable={false}
                  onClick={() => onImageClick(img)}
                />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
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

      <div className="mt-16 h-px bg-white/8" />
    </div>
  );
}

export default Tournament;
