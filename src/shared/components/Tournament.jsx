import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageTiles from "../../components/ui/image-tiles";
import LocationIcon from "../../../public/assets/LocationIcon.svg";
import DateIcon from "../../../public/assets/DateIcon.svg";

function Tournament({ tournament, featured = false, onImageClick }) {
  const navigate = useNavigate();
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

  const metaRow = (
    <div className="flex flex-wrap gap-4">
      {tournament.location && (
        <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
          <img src={LocationIcon} alt="Location" className="w-3.5 h-3.5 opacity-50" />
          {tournament.location}
        </div>
      )}
      {tournament.date && (
        <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
          <img src={DateIcon} alt="Date" className="w-3.5 h-3.5 opacity-50" />
          {tournament.date}
        </div>
      )}
    </div>
  );

  const imageSlider = hasImages && (
    <div className="relative">
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
            className={`snap-start flex-shrink-0 overflow-hidden rounded-xl ${
              featured
                ? "w-[75vw] sm:w-[46vw] lg:w-[32vw] xl:w-[28vw] aspect-[4/3]"
                : "w-[75vw] sm:w-[42vw] lg:w-[28vw] xl:w-[22vw] aspect-[4/3]"
            }`}
          >
            <img
              src={img}
              alt={`Image ${idx + 1}`}
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
  );

  /* ── FEATURED CARD ── */
  if (featured) {
    return (
      <div className="mb-6">
        {/* Hero card */}
        <div className="relative w-full h-[480px] sm:h-[560px] overflow-hidden rounded-2xl">
          {hasImages ? (
            <img
              src={tournament.images[0]}
              alt={tournament.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-white/5" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

          {/* Badge */}
          <div className="absolute top-5 left-5">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#a40000] font-semibold border border-[#a40000]/40 px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-sm">
              Featured
            </span>
          </div>

          {/* Image count */}
          {hasImages && tournament.images.length > 1 && (
            <div className="absolute top-5 right-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 border border-white/10 px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-sm">
                {tournament.images.length} photos
              </span>
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
            {metaRow}
            <h2 className="mt-2 text-[2rem] sm:text-[2.8rem] xl:text-[3.4rem] font-bold leading-tight whitespace-pre-line">
              {tournament.name.trim()}
            </h2>
            {tournament.description && (
              <p className="mt-3 text-white/60 text-[13px]/[24px] max-w-2xl line-clamp-2">
                {tournament.description}
              </p>
            )}
          </div>
        </div>

        {/* Slider below card */}
        {hasImages && tournament.images.length > 1 && (
          <div className="mt-5">
            {imageSlider}
          </div>
        )}
      </div>
    );
  }

  /* ── GRID CARD ── */
  const imgs = tournament.images || [];
  const tileLeft   = imgs[0] || null;
  const tileMiddle = imgs[1] || imgs[0] || null;
  const tileRight  = imgs[2] || imgs[0] || null;

  return (
    <div
      className="group flex flex-col cursor-pointer"
      onClick={() => navigate(`/news/${tournament.id}`)}
    >
      {hasImages && (
        <div className="flex justify-center">
          <ImageTiles
            leftImage={tileLeft}
            middleImage={tileMiddle}
            rightImage={tileRight}
          />
        </div>
      )}

      <div className={hasImages ? "mt-16" : ""}>
        {metaRow}
        <h3 className="mt-2 text-[1.3rem] font-bold leading-tight whitespace-pre-line group-hover:text-white/80 transition">
          {tournament.name.trim()}
        </h3>
        {tournament.description && (
          <p className="mt-2 text-white/40 text-[13px]/[24px] line-clamp-3">
            {tournament.description}
          </p>
        )}
        {hasImages && (
          <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.2em] text-[#a40000]/70 group-hover:text-[#a40000] transition">
            {tournament.images.length} photos →
          </span>
        )}
      </div>
    </div>
  );
}

export default Tournament;
