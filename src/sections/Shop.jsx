import { useState } from "react";

import TShirtBlack from "../../public/assets/merch/TShirtBlack.png";
import TShirtWhite from "../../public/assets/merch/TShirtWhite.png";
import HoodieBlack from "../../public/assets/merch/HoodieBlack.png";
import HoodieWhite from "../../public/assets/merch/HoodieWhite.png";
import AddToCartButton from "../shared/components/AddToCartButton";

const merchItems = [
  {
    name: "T-Shirt",
    blackImage: TShirtBlack,
    whiteImage: TShirtWhite,
    price: 20,
    oldPrice: 30,
  },
  {
    name: "Hoodie",
    blackImage: HoodieBlack,
    whiteImage: HoodieWhite,
    price: 50,
    oldPrice: 70,
  },
];

function MerchCard({ item }) {
  const [color, setColor] = useState("black");

  const imageSrc = color === "black" ? item.blackImage : item.whiteImage;
  const altText = `${item.name} ${color === "black" ? "Black" : "White"}`;

  // ← added this function so we know exactly what variant is being added
  const handleAddToCart = () => {
    const selected = {
      name: item.name,
      color: color,
      price: item.price,
      oldPrice: item.oldPrice,
      image: imageSrc,
    };
    console.log("Adding to cart:", selected);
    // Later you can replace this with real cart logic
  };

  return (
    <div className="rounded-xl">
      <div className="w-full h-[300px] relative">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover rounded-xl"
        />
        {/* You can add overlay / badge / discount corner here later */}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="opacity-40">Man/Woman</p>
          <h1 className="text-2xl">{item.name}</h1>
        </div>

        <div className="flex gap-4">
          <ColorButton
            color="black"
            isSelected={color === "black"}
            onClick={() => setColor("black")}
          />
          <ColorButton
            color="white"
            isSelected={color === "white"}
            onClick={() => setColor("white")}
          />
        </div>
      </div>

      <h1 className="text-5xl mt-5 mb-12">
        {item.price}KM{" "}
        <span className="text-2xl opacity-50">{item.oldPrice}KM</span>
      </h1>

      {/* We now pass the correct handler that knows the color */}
      <AddToCartButton onAdd={handleAddToCart} />
    </div>
  );
}

function ColorButton({ color, isSelected, onClick }) {
  const baseClasses = "w-6 h-6 rounded-full border-2 transition-all";

  if (color === "black") {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${
          isSelected
            ? "border-white bg-black shadow-lg scale-110"
            : "border-gray-400 bg-black opacity-70 hover:opacity-100"
        }`}
        aria-label="Select Black"
      />
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${
        isSelected
          ? "border-gray-800 bg-white shadow-lg scale-110"
          : "border-gray-300 bg-white opacity-70 hover:opacity-100"
      }`}
      aria-label="Select White"
    />
  );
}

// ← You can remove this function now – it's no longer used
// function handleAddToCart(item) {
//   console.log("Adding to cart:", item);
// }

export default function Shop() {
  return (
    <div className="mx-4 flex flex-col gap-12">
      {merchItems.map((item, index) => (
        <div key={item.name} className={index > 0 ? "mt-[7vh]" : ""}>
          <MerchCard item={item} />
        </div>
      ))}
    </div>
  );
}
