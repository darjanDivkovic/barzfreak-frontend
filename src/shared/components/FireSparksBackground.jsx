import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
const FireSparksBackground = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      fpsLimit: 120,
      detectRetina: true,

      background: {
        color: { value: "transparent" }, // keep your page bg
      },

      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
          resize: true,
        },
      },

      particles: {
        number: {
          value: 140,
          density: { enable: true, area: 300 },
        },

        color: {
          value: ["#fa2727", "#ff3300"],
        },

        shape: { type: "circle" },

        opacity: {
          value: { min: 0.15, max: 0.65 },
          animation: {
            enable: true,
            speed: 1.2,
            startValue: "random",
            sync: false,
            minimumValue: 0,
          },
        },

        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            startValue: "random",
            sync: false,
            minimumValue: 0.5,
          },
        },

        links: { enable: false },

        move: {
          enable: true,
          direction: "top",
          speed: { min: 8.8, max: 10.2 },
          random: true,
          straight: true,
          outModes: {
            default: "out", // disappear when leaving top
          },
        },

        // Spawn from bottom like sparks
        position: { x: 50, y: 105 },
      },

      emitters: [
        {
          position: { x: 50, y: 110 },
          rate: { quantity: 3, delay: 0.05 },
          size: { width: 100, height: 0 }, // full width bottom line
          direction: "top",
          particles: {
            move: {
              direction: "top",
              speed: { min: 1, max: 3 },
            },
            life: {
              duration: { sync: false, value: { min: 1.2, max: 2.6 } },
              count: 1,
            },
          },
        },
      ],
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default FireSparksBackground;
