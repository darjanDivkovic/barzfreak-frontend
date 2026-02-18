import { useState } from "react";

import TShirtBlack from "../../public/assets/merch/TShirtBlack.png";
import TShirtWhite from "../../public/assets/merch/TShirtWhite.png";
import HoodieBlack from "../../public/assets/merch/HoodieBlack.png";
import HoodieWhite from "../../public/assets/merch/HoodieWhite.png";

const Shop = () => {
  const [tshirtColor, setTshirtColor] = useState("black"); // "black" | "white"
  const [hoodieColor, setHoodieColor] = useState("black"); // "black" | "white"

  const tshirtImage = tshirtColor === "black" ? TShirtBlack : TShirtWhite;
  const hoodieImage = hoodieColor === "black" ? HoodieBlack : HoodieWhite;

  return (
    <div className="mx-4 flex flex-col">
      {/* T-Shirt Card */}
      <div className="rounded-xl">
        <div className="w-full h-[250px] relative">
          <img
            src={tshirtImage}
            alt={`T-Shirt ${tshirtColor === "black" ? "Black" : "White"}`}
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Color toggle - bottom of image */}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="opacity-40 mt-2">Man/Woman</p>
            <h1 className="text-2xl">T-Shirt</h1>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setTshirtColor("black")}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                tshirtColor === "black"
                  ? "border-white bg-black shadow-lg scale-110"
                  : "border-gray-400 bg-black opacity-70 hover:opacity-100"
              }`}
              aria-label="Select Black T-Shirt"
            />

            <button
              onClick={() => setTshirtColor("white")}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                tshirtColor === "white"
                  ? "border-gray-800 bg-white shadow-lg scale-110"
                  : "border-gray-300 bg-white opacity-70 hover:opacity-100"
              }`}
              aria-label="Select White T-Shirt"
            />
          </div>
        </div>

        <h1 className="text-5xl mt-5">
          20KM <span className="text-2xl opacity-50">30KM</span>
        </h1>
      </div>

      {/* Hoodie Card */}
      <div className="rounded-xl mt-[7vh]">
        <div className="w-full h-[250px] relative">
          <img
            src={hoodieImage}
            alt={`Hoodie ${hoodieColor === "black" ? "Black" : "White"}`}
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Color toggle - bottom of image */}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="opacity-40 mt-2">Man/Woman</p>
            <h1 className="text-2xl">Hoodie</h1>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setHoodieColor("black")}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                hoodieColor === "black"
                  ? "border-white bg-black shadow-lg scale-110"
                  : "border-gray-400 bg-black opacity-70 hover:opacity-100"
              }`}
              aria-label="Select Black Hoodie"
            />

            <button
              onClick={() => setHoodieColor("white")}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                hoodieColor === "white"
                  ? "border-gray-800 bg-white shadow-lg scale-110"
                  : "border-gray-300 bg-white opacity-70 hover:opacity-100"
              }`}
              aria-label="Select White Hoodie"
            />
          </div>
        </div>

        <h1 className="text-5xl mt-5">
          50KM <span className="text-2xl opacity-50">70KM</span>
        </h1>
      </div>
    </div>
  );
};

export default Shop;
