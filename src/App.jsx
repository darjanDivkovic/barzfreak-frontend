import Logo from "./assets/logo.svg";
import BackgroundX from "./assets/backgroundX.svg";
import FireSparksBackground from "./shared/components/FireSparksBackground"; // ← import here

function App() {
  return (
    <>
      <div className="relative h-[100vh] flex flex-col items-center border pt-[7vh] overflow-hidden">
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
    </>
  );
}

export default App;
