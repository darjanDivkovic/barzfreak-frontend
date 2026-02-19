import { useEffect, useRef, useState } from "react";

import LocationIcon from "../../../public/assets/LocationIcon.svg";
import DateIcon from "../../../public/assets/DateIcon.svg";

function Tournament({ tournament, onImageClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const childWidths = Array.from(slider.children).map(
        (child) => child.offsetWidth,
      );
      let cumulative = 0;
      let newIndex = 0;

      for (let i = 0; i < childWidths.length; i++) {
        if (scrollLeft < cumulative + childWidths[i] / 2) {
          newIndex = i;
          break;
        }
        cumulative += childWidths[i];
      }
      setActiveIndex(newIndex);
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [tournament.images?.length]);

  return (
    <div key={tournament.id} className="">
      <h1 className="text-[2rem] whitespace-pre-line max-w-[85vw]">
        {tournament.name.trim()}
      </h1>

      <div className="mt-3 flex gap-4">
        <div className="flex items-center">
          <img
            src={LocationIcon}
            alt="Location"
            className="inline-block mr-2"
          />
          <p className="opacity-50">{tournament.location}</p>
        </div>
        <div className="flex items-center">
          <img src={DateIcon} alt="Date" className="inline-block mr-2" />
          <p className="opacity-50">{tournament.date}</p>
        </div>
      </div>

      <p className="mt-5 w-[80%] whitespace-pre-line opacity-80">
        {tournament?.description}
      </p>

      {tournament.images?.length > 0 && (
        <div className="mt-16 md:mt-10">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 -mx-1 px-1"
          >
            {tournament.images.map((img, idx) => (
              <div
                key={idx}
                className="snap-start flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] aspect-[4/3] overflow-hidden rounded-xl"
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
                  onClick={() => onImageClick(img)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tournament;
