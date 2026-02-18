import Shop from "./sections/Shop";
import Hero from "./sections/Hero";
import Anouncements from "./sections/Anouncements";

function App() {
  return (
    <>
      <Hero />

      <hr className="mt-[20vh]" />
      <Shop />

      <hr className="mt-[20vh]" />
      <Anouncements />
    </>
  );
}

export default App;
