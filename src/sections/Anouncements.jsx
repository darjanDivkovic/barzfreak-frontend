import Tournament from "../shared/components/Tournament";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

const PAGE_SIZE = 4;

const Anouncements = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { lang } = useLanguage();
  const isBosnian = lang === "bs";

  useEffect(() => {
    getTournaments();
  }, [lang]);

  async function getTournaments() {
    const { data } = await supabase.from("tournament").select();
    if (!data || data.length === 0) {
      setTournaments([]);
      return;
    }

    const processed = data
      .map((t) => ({
        ...t,
        name:
          (isBosnian ? t.name_bs : t.name_en) ||
          (isBosnian ? "Bez naziva" : "No name"),
        description: (isBosnian ? t.description_bs : t.description_en) || "",
      }))
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

    setTournaments(processed);
  }

  const sectionLabel = isBosnian ? "NOVOSTI" : "NEWS";
  const emptyMsg = isBosnian
    ? "Nema turnira za prikaz"
    : "No tournaments available";

  const featured = tournaments[0];
  const rest = tournaments.slice(1);
  const visibleRest = showAll ? rest : rest.slice(0, PAGE_SIZE);
  const hasMore = !showAll && rest.length > PAGE_SIZE;

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Section header */}
      <div className="flex items-center gap-6 mb-16">
        <div className="flex-1 h-px bg-white/15" />
        <span className="text-[1.1rem] text-white/70 shrink-0" style={{ fontFamily: "'Rock Salt', cursive" }}>
          {sectionLabel}
        </span>
        <div className="flex-1 h-px bg-white/15" />
      </div>

      {tournaments.length === 0 ? (
        <p className="text-white/30 text-[13px] uppercase tracking-[0.15em] text-center py-16">
          {emptyMsg}
        </p>
      ) : (
        <>
          {/* Featured */}
          <Tournament
            key={featured.id}
            tournament={featured}
            featured
            onImageClick={setSelectedImage}
          />

          {/* Grid */}
          {rest.length > 0 && (
            <>
              <div className="flex items-center gap-6 mt-16 mb-10">
                <div className="flex-1 h-px bg-white/15" />
                <span className="text-[0.85rem] text-white/50 shrink-0" style={{ fontFamily: "'Rock Salt', cursive" }}>
                  {isBosnian ? "Više vijesti" : "More news"}
                </span>
                <div className="flex-1 h-px bg-white/15" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                {visibleRest.map((tournament) => (
                  <Tournament
                    key={tournament.id}
                    tournament={tournament}
                    onImageClick={setSelectedImage}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setShowAll(true)}
                    className="border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition px-8 py-3 text-[11px] uppercase tracking-[0.2em]"
                  >
                    {isBosnian ? "Prikaži sve" : "Show all"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt={isBosnian ? "Povećana slika" : "Enlarged image"}
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>
      )}
    </section>
  );
};

export default Anouncements;
