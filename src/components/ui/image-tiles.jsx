import { motion } from 'framer-motion';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.2, staggerChildren: 0.2 },
  },
};

const leftVariants = {
  initial: { rotate: 0, x: 0, y: 0 },
  animate: { rotate: -8, x: -150, y: 10, transition: { type: 'spring', stiffness: 120, damping: 12 } },
  hover:   { rotate: 1,  x: -160, y: 0,  transition: { type: 'spring', stiffness: 200, damping: 15 } },
};

const middleVariants = {
  initial: { rotate: 0, x: 0, y: 0 },
  animate: { rotate: 6, x: 0, y: 0,  transition: { type: 'spring', stiffness: 120, damping: 12 } },
  hover:   { rotate: 0, x: 0, y: -10, transition: { type: 'spring', stiffness: 200, damping: 15 } },
};

const rightVariants = {
  initial: { rotate: 0, x: 0,   y: 0  },
  animate: { rotate: -6, x: 200, y: 20, transition: { type: 'spring', stiffness: 120, damping: 12 } },
  hover:   { rotate: 3,  x: 200, y: 10, transition: { type: 'spring', stiffness: 200, damping: 15 } },
};

export default function ImageTiles({ leftImage, middleImage, rightImage, onClick }) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-64 h-64 my-12 cursor-pointer"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      onClick={onClick}
    >
      {[
        { image: leftImage,   variants: leftVariants,   z: 30, origin: 'origin-bottom-right' },
        { image: middleImage, variants: middleVariants, z: 20, origin: 'origin-bottom-left'  },
        { image: rightImage,  variants: rightVariants,  z: 10, origin: 'origin-bottom-right' },
      ].map(({ image, variants, z, origin }) => (
        <motion.div
          key={z}
          className={`absolute w-48 h-48 ${origin} rounded-xl shadow-lg bg-black border border-white/20 p-2`}
          variants={variants}
          whileHover="hover"
          animate="animate"
          style={{ zIndex: z }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover scale-[1.4]" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
