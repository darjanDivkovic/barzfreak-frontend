import Logo from "../../public/assets/Logo.svg";
import BackgroundX from "../../public/assets/BackgroundX.svg";

import FireSparksBackground from "../shared/components/FireSparksBackground";

const Hero = () => {
  return (
    <div className="relative h-[100vh] flex flex-col items-center pt-[10vh] overflow-hidden">
      <FireSparksBackground />

      {/* The rising reddish sparks */}

      <img
        src={Logo}
        alt="BarzFreak Logo"
        className="relative scale-70 z-10 "
      />

      <h1 className="mt-[12vh] text-[4.4rem] relative z-10">BUILT FOR</h1>
      <h1 className="text-[4.6rem] mt-[-25px] red-secondary relative z-10">
        THE BARZ
      </h1>

      <p className="mt-[200px] text-center px-8 gray-secondary text-[14px]/[17px] relative z-10">
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
  );
};

export default Hero;
