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
    const el = children[safeIdx];

    slider.scrollTo({
      left: el.offsetLeft,
      behavior: "smooth",
    });
  };

  // ✅ Active index based on scroll position
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const children = Array.from(slider.children);
      if (!children.length) return;

      // Find which slide center is closest to viewport center
      const viewportCenter = slider.scrollLeft + slider.clientWidth / 2;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < children.length; i++) {
        const el = children[i];
        const center = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      setActiveIndex(bestIdx);
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => slider.removeEventListener("scroll", handleScroll);
  }, [tournament.images?.length]);

  // ✅ XL-only: Desktop drag-to-scroll (doesn't affect mobile)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const isXL = window.matchMedia("(min-width: 1280px)").matches;
    if (!isXL) return;

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onDown = (e) => {
      if (e.button !== 0) return; // left-click only
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX;
      startScrollLeft = slider.scrollLeft;
    };

    const onUpOrLeave = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const walk = (e.pageX - startX) * 1.1;
      slider.scrollLeft = startScrollLeft - walk;
    };

    slider.addEventListener("mousedown", onDown);
    slider.addEventListener("mousemove", onMove);
    slider.addEventListener("mouseleave", onUpOrLeave);
    window.addEventListener("mouseup", onUpOrLeave);

    return () => {
      slider.removeEventListener("mousedown", onDown);
      slider.removeEventListener("mousemove", onMove);
      slider.removeEventListener("mouseleave", onUpOrLeave);
      window.removeEventListener("mouseup", onUpOrLeave);
    };
  }, [tournament.images?.length]);

  const hasImages = (tournament.images?.length || 0) > 0;
  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= (tournament.images?.length || 1) - 1;

  return (
    <div key={tournament.id} className="">
      <h1 className="text-[2rem] xl:text-[3.5rem] whitespace-pre-line max-w-[85vw] md:pl-[150px] xl:px-[20%]">
        {tournament.name.trim()}
      </h1>

      <div className="mt-3 flex gap-4 md:pl-[150px] xl:pl-[20%]">
        <div className="flex items-center">
          <img
            src={LocationIcon}
            alt="Location"
            className="inline-block mr-2"
          />
          <p className="opacity-50">{tournament.location}</p>
        </div>

        {tournament.date && (
          <div className="flex items-center">
            <img src={DateIcon} alt="Date" className="inline-block mr-2" />
            <p className="opacity-50">{tournament.date}</p>
          </div>
        )}
      </div>

      <p className="mt-5 w-[80%] whitespace-pre-line opacity-80 text-sm md:pl-[150px] xl:pl-[20%]">
        {tournament?.description}
      </p>

      {hasImages && (
        <div className="mt-16 md:mt-10 xl:mx-[20%]">
          <div className="relative">
            {/* ✅ XL-only arrows */}
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={isFirst}
              aria-label="Previous image"
              className="
                hidden xl:flex items-center justify-center
                absolute left-[-18px] top-1/2 -translate-y-1/2 z-10
                h-10 w-10 rounded-full
                bg-black/55 border border-white/10 backdrop-blur
                text-white/90
                transition
                hover:bg-black/70 hover:border-white/20
                disabled:opacity-30 disabled:cursor-not-allowed
              "
            >
              <span className="text-lg leading-none">‹</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={isLast}
              aria-label="Next image"
              className="
                hidden xl:flex items-center justify-center
                absolute right-[-18px] top-1/2 -translate-y-1/2 z-10
                h-10 w-10 rounded-full
                bg-black/55 border border-white/10 backdrop-blur
                text-white/90
                transition
                hover:bg-black/70 hover:border-white/20
                disabled:opacity-30 disabled:cursor-not-allowed
              "
            >
              <span className="text-lg leading-none">›</span>
            </button>

            <div
              ref={sliderRef}
              className="
                flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4
                px-1
                cursor-grab xl:select-none scroll-smooth
              "
            >
              {tournament.images.map((img, idx) => (
                <div
                  key={idx}
                  className="
                    snap-start flex-shrink-0
                    w-[80vw] sm:w-[45vw] xl:w-[20vw]
                    aspect-[4/3] overflow-hidden rounded-xl
                  "
                >
                  <img
                    src={img}
                    alt={`Tournament image ${idx + 1}`}
                    className={`
                      w-full h-full object-cover transition-all duration-400 ease-out
                      ${
                        idx === activeIndex
                          ? "scale-105 opacity-100 shadow-2xl"
                          : "scale-90 opacity-60"
                      }
                    `}
                    loading="lazy"
                    draggable={false}
                    onClick={() => onImageClick(img)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <hr className="mt-[8vh] opacity-20 w-[95%] md:opacity-0 " />
    </div>
  );
}

export default Tournament;
