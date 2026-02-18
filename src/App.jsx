import Logo from "../public/assets/Logo.svg";
import BackgroundX from "../public/assets/BackgroundX.svg";
import LocationIcon from "../public/assets/LocationIcon.svg";
import DateIcon from "../public/assets/DateIcon.svg";

import FireSparksBackground from "./shared/components/FireSparksBackground";

function App() {
  return (
    <>
      <div className="relative h-[100vh] flex flex-col items-center pt-[7vh] overflow-hidden">
        {/* The rising reddish sparks */}
        <FireSparksBackground />

        <img src={Logo} alt="BarzFreak Logo" className="relative z-10" />

        <h1 className="mt-[12vh] text-[3.4rem] relative z-10">BUILT FOR</h1>
        <h1 className="text-[3.6rem] mt-[-25px] red-secondary relative z-10">
          THE BARZ
        </h1>

        <p className="mt-4 text-center px-8 gray-secondary text-[14px]/[17px] relative z-10">
          Forged in struggle. Raised on concrete.
          <br />
          Fueled by pain. Unbroken by fear.
          <br />
          No comfort. No compromise.
        </p>

        <img
          src={BackgroundX}
          alt="Background X"
          className="absolute bottom-0 z-0"
        />
      </div>

      <div className="mt-[-80px] mx-4 h-[100vh]">
        {" "}
        {/* Height temporary here */}
        <div className="border-t border-b border-white">
          <h1 className="text-[2.2rem] text-white text-center pb-1">
            TOURNAMENTS
          </h1>
        </div>
        <div>
          <h1 className="text-[2rem] mt-[7vh] font-bold">
            Drzavno prvenstvo street workout 2025{" "}
          </h1>

          <div className="mt-3 flex gap-4">
            <div className="flex items-center">
              <img
                src={LocationIcon}
                alt="Location Icon"
                className="inline-block mr-2"
              />
              <p className="opacity-50">Banja Luka</p>
            </div>
            <div className="flex items-center">
              <img
                src={DateIcon}
                alt="Date Icon"
                className="inline-block mr-2"
              />
              <p className="opacity-50">25/05/2025</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
