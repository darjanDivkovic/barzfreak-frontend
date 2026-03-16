import Tournament from "../shared/components/Tournament";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

const Anouncements = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
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

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-16">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-medium">
          {sectionLabel}
        </span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      {tournaments.length === 0 ? (
        <p className="text-white/30 text-[13px] uppercase tracking-[0.15em] text-center py-16">
          {emptyMsg}
        </p>
      ) : (
        <div className="flex flex-col gap-20">
          {tournaments.map((tournament) => (
            <Tournament
              key={tournament.id}
              tournament={tournament}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
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
