import { useState } from "react";
import { useEffect } from "react";
import { baseColors } from "@/lib/utils";
import Card from "@/types/Card";

function CardComponent({ cardInformation }: { cardInformation: Card }) {
  return (
    <div
      className="mx-5 mt-5 transform overflow-hidden rounded-lg transition hover:-translate-y-2"
      style={{
        color: baseColors.background_color,
        backgroundColor: cardInformation.color ?? "black",
      }}
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
        <img
          src={cardInformation.imageUrl ?? "https://wallpaperaccess.com/full/334698.jpg"}
          alt={cardInformation.title}
          className="object-cover w-full h-48"
        />
      </a>
    </div>
  );
}

export default CardComponent;
