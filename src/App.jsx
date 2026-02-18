import LocationIcon from "../public/assets/LocationIcon.svg";
import DateIcon from "../public/assets/DateIcon.svg";
import { createClient } from "@supabase/supabase-js";

import { useEffect, useRef, useState } from "react";
import Shop from "./sections/Shop";
import Hero from "./sections/Hero";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

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
      <h1 className="text-[2rem] whitespace-pre-line">
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

      {tournament.images?.length > 0 && (
        <div className="mt-6 md:mt-10">
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
function App() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getTournaments();
  }, []);

  async function getTournaments() {
    const { data } = await supabase.from("tournament").select();
    setTournaments(data || []);
  }

  return (
    <>
      <Hero />

      <hr className="mt-[20vh]" />
      <Shop />

      <div className="mx-4 mt-[20vh] min-h-[100vh]">
        <div className="opacity-20">
          <h1 className="text-[1.rem] leading-tight text-white">TOURNAMENTS</h1>
        </div>
        {tournaments.map((tournament) => (
          <Tournament
            key={tournament.id}
            tournament={tournament}
            onImageClick={setSelectedImage}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full screen preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}

export default App;
