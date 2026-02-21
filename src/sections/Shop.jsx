// src/sections/Shop.jsx
import { useTranslation } from "../i18n/useTranslation"; // ← new

import TShirtBlack from "../../public/assets/merch/TShirtBlack.png";
import TShirtWhite from "../../public/assets/merch/TShirtWhite.png";
import HoodieBlack from "../../public/assets/merch/HoodieBlack.png";
import HoodieWhite from "../../public/assets/merch/HoodieWhite.png";
import PantsBlack from "../../public/assets/merch/PantsBlack.png";
import PantsWhite from "../../public/assets/merch/PantsWhite.png";

import AddToCartButton from "../shared/components/AddToCartButton";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";

const merchItems = [
  {
    key: "tshirt", // ← internal key (not displayed)
    blackImage: TShirtBlack,
    whiteImage: TShirtWhite,
    price: 22,
    oldPrice: 30,
  },
  {
    key: "hoodie",
    blackImage: HoodieBlack,
    whiteImage: HoodieWhite,
    price: 40,
    oldPrice: 70,
  },
  {
    key: "pants",
    blackImage: PantsBlack,
    whiteImage: PantsWhite,
    price: 40,
    oldPrice: 65,
  },
];

function MerchCard({ item }) {
  const { t } = useTranslation(); // ← now we can translate
  const [color, setColor] = useState("black");
  const addItem = useCartStore((state) => state.addItem);

  const imageSrc = color === "black" ? item.blackImage : item.whiteImage;

  // Translated names & labels
  const itemName = t(
    `shop.items.${merchItems.findIndex((i) => i.key === item.key)}.name`,
  );
  const genderLabel = t("shop.gender");
  const colorBlackLabel = t("shop.colorBlack");
  const colorWhiteLabel = t("shop.colorWhite");

  const altText = `${itemName} ${color === "black" ? colorBlackLabel : colorWhiteLabel}`;

  const handleAddToCart = () => {
    const selected = {
      id: `${item.key}-${color}`,
      key: item.key,
      name: itemName,
      color: color === "black" ? colorBlackLabel : colorWhiteLabel,
      price: item.price,
      oldPrice: item.oldPrice,
      image: imageSrc,
    };

    addItem(selected);
  };

  return (
    <div className="rounded-xl">
      <div className="w-full h-[300px] relative">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="opacity-40">{genderLabel}</p>
          <h1 className="text-2xl">{itemName}</h1>
        </div>

        <div className="flex gap-4">
          <ColorButton
            color="black"
            label={colorBlackLabel} // optional: could show text too
            isSelected={color === "black"}
            onClick={() => setColor("black")}
          />

          <ColorButton
            color="white"
            label={colorWhiteLabel}
            isSelected={color === "white"}
            onClick={() => setColor("white")}
          />
        </div>
      </div>

      <h1 className="text-5xl mt-5 mb-12">
        {item.price}KM{" "}
        <span className="text-2xl text-white/50 line-through decoration-2 decoration-red-500 opacity-70">
          {item.oldPrice}KM
        </span>
      </h1>

      <AddToCartButton onAdd={handleAddToCart} />
    </div>
  );
}

// Updated ColorButton – can show color name if you want (optional)
function ColorButton({ color, isSelected, onClick, label }) {
  const baseClasses = "w-6 h-6 rounded-full border-2 transition-all";

  const selectedClasses =
    color === "black"
      ? "border-white bg-black shadow-lg scale-110"
      : "border-gray-800 bg-white shadow-lg scale-110";

  const defaultClasses =
    color === "black"
      ? "border-gray-400 bg-black opacity-70 hover:opacity-100"
      : "border-gray-300 bg-white opacity-70 hover:opacity-100";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : defaultClasses}`}
      aria-label={`Select ${label}`}
      title={label} // tooltip on hover
    />
    // If you want to show text below buttons, add:
    // <span className="text-xs mt-1 opacity-70">{label}</span>
  );
}

export default function Shop() {
  return (
    <div className="mx-4 flex flex-col md:flex-row gap-12 md:px-[150px] xl:px-[20%]">
      {merchItems.map((item, index) => (
        <div
          key={item.key}
          className={`w-full md:flex-1 ${index > 0 ? "mt-[7vh] md:mt-0" : ""}`}
        >
          <MerchCard item={item} />
        </div>
      ))}
    </div>
  );
}
