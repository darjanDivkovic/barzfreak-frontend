import Tournament from "../shared/components/Tournament";
import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

const Anouncements = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // ── Changed: default to "bs" when nothing is saved yet ──
  const preferredLanguage = localStorage.getItem("preferredLanguage") || "bs";
  const isBosnian = preferredLanguage === "bs";

  useEffect(() => {
    getTournaments();
  }, []);

  async function getTournaments() {
    const { data } = await supabase.from("tournament").select();
    console.log("Raw Supabase data:", data);

    if (!data || data.length === 0) {
      setTournaments([]);
      return;
    }

    const processed = data.map((tournament) => {
      // Use only the selected language - no automatic fallback to the other one
      const name = isBosnian ? tournament.name_bs : tournament.name_en;
      const description = isBosnian
        ? tournament.description_bs
        : tournament.description_en;

      return {
        ...tournament,
        // Show localized "missing" message instead of falling back to other language
        name: name || (isBosnian ? "Bez naziva" : "No name"),
        description: description || "",
      };
    });

    setTournaments(processed);
  }

  const sectionTitle = isBosnian ? "TURNIRI" : "TOURNAMENTS";

  return (
    <div>
      <div className="ml-5 mt-[15vh] min-h-[100vh]">
        <div className="opacity-20">
          <h1 className="text-[1rem] leading-tight text-white">
            {sectionTitle}
          </h1>
        </div>

        <div className="flex flex-col gap-[7vh]">
          {tournaments.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              {isBosnian
                ? "Nema turnira za prikaz"
                : "No tournaments available"}
            </p>
          ) : (
            tournaments.map((tournament) => (
              <Tournament
                key={tournament.id}
                tournament={tournament}
                onImageClick={setSelectedImage}
              />
            ))
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt={isBosnian ? "Povećana slika" : "Enlarged image"}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Anouncements;
