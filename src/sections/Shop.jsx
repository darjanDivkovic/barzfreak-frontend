// src/sections/Shop.jsx
import { useTranslation } from "../i18n/useTranslation";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

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
    key: "tshirt",
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
  const { t } = useTranslation();
  const [color, setColor] = useState("black");
  const addItem = useCartStore((state) => state.addItem);

  const imageSrc = color === "black" ? item.blackImage : item.whiteImage;

  const itemName = t(
    `shop.items.${merchItems.findIndex((i) => i.key === item.key)}.name`,
  );
  const genderLabel = t("shop.gender");
  const colorBlackLabel = t("shop.colorBlack");
  const colorWhiteLabel = t("shop.colorWhite");

  const altText = `${itemName} ${color === "black" ? colorBlackLabel : colorWhiteLabel}`;
  const discount = Math.round((1 - item.price / item.oldPrice) * 100);

  const handleAddToCart = () => {
    addItem({
      id: `${item.key}-${color}`,
      key: item.key,
      name: itemName,
      color: color === "black" ? colorBlackLabel : colorWhiteLabel,
      price: item.price,
      oldPrice: item.oldPrice,
      image: imageSrc,
    });
  };

  return (
    <div className="group border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/15 transition-colors duration-300">
      {/* Image */}
      <div className="relative overflow-hidden bg-white/5 aspect-[3/4]">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Sale badge */}
        <span className="absolute top-3 left-3 bg-[#a40000] text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full">
          -{discount}%
        </span>
        {/* Color preview overlay on hover */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <ColorButton
            color="black"
            label={colorBlackLabel}
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

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-1">
          {genderLabel}
        </p>
        <h3 className="text-[1.15rem] font-semibold tracking-tight">{itemName}</h3>

        <div className="flex items-end gap-3 mt-3">
          <span className="text-[1.8rem] font-bold leading-none">{item.price} KM</span>
          <span className="text-[1rem] text-white/30 line-through decoration-[#a40000] mb-0.5">
            {item.oldPrice} KM
          </span>
        </div>

        <AddToCartButton onAdd={handleAddToCart} />
      </div>
    </div>
  );
}

function ColorButton({ color, isSelected, onClick, label }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={`Select ${label}`}
      className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
        isSelected ? "scale-110 border-white" : "border-white/30 opacity-60 hover:opacity-100"
      } ${color === "black" ? "bg-zinc-900" : "bg-white"}`}
    />
  );
}

export default function Shop() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const label = lang === "bs" ? "PRODAVNICA" : "SHOP";

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-medium">
          {label}
        </span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {merchItems.map((item) => (
          <MerchCard key={item.key} item={item} />
        ))}
      </div>
    </section>
  );
}
