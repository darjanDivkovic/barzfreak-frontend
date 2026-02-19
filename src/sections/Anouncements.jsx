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

  useEffect(() => {
    getTournaments();
  }, []);

  async function getTournaments() {
    const { data } = await supabase.from("tournament").select();
    console.log("data", data);
    setTournaments(data || []);
  }

  return (
    <div>
      <div className="ml-5 mt-[15vh] min-h-[100vh]">
        <div className="opacity-20">
          <h1 className="text-[1.rem] leading-tight text-white">TOURNAMENTS</h1>
        </div>
        <div className="flex flex-col gap-[10vh]">
          {tournaments.map((tournament) => (
            <Tournament
              key={tournament.id}
              tournament={tournament}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
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
    </div>
  );
};

export default Anouncements;
