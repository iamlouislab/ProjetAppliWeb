import { useState } from "react";
import { useEffect } from "react";
import { baseColors } from "@/lib/utils";
import Card from "@/types/Card";

function CardComponent({ cardInformation }: { cardInformation: Card }) {
  const initialColor = "black";
  const hoveredColor = "gray";
  const [color, setColor] = useState(initialColor);

  return (
    <div
      className="mx-5 mt-5 h-[330px] transform overflow-hidden rounded-lg transition hover:-translate-y-2"
      style={{
        color: baseColors.background_color,
        backgroundColor: color ?? color,
      }}
      onMouseEnter={() => setColor(hoveredColor)}
      onMouseLeave={() => setColor(initialColor)}
    >
      <a href={cardInformation.link ?? "/"}>
        <div className="w-full p-5">
          <h3
            className="mb-2 text-lg font-semibold md:mb-3 md:text-xl"
            style={{
              color: baseColors.text_minor_color,
            }}
          >
            {cardInformation.title}
          </h3>
          <p
            className="mb-2 text-sm md:mb-3 md:text-base"
            style={{
              color: baseColors.text_minor_2_color,
            }}
          >
            {cardInformation.description}
          </p>
        </div>
      </a>
    </div>
  );
}

export default CardComponent;
