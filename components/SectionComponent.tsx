import React from "react";
import Carousel from "./Carousel";
import CardComponent from "./CardComponent";
import { baseColors } from "@/lib/utils";
import Section from "@/types/Section";
import Card from "@/types/Card";

const SectionComponent = ({
  sectionInformation,
}: {
  sectionInformation: Section;
}) => {
  const cardsComponentList = sectionInformation.cards.map((card: Card) => (
    <CardComponent
      cardInformation={{
        id: card.id,
        title: card.title,
        description: card.description,
        link: card.link,
        imageUrl: card.imageUrl,
        color: card.color,
      }}
    ></CardComponent>
  ));

  return (
    <div>
      <div className="py-12">
        <h1
          className="mx-5 text-3xl font-bold"
          style={{
            color: baseColors.text_major_color,
          }}
        >
          {sectionInformation.title}
        </h1>
        <p
          className="mx-5"
          style={{
            color: baseColors.text_minor_color,
          }}
        >
          {sectionInformation.description}
        </p>

        {sectionInformation.cards.length > 0 ? (
          <Carousel>{cardsComponentList}</Carousel>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SectionComponent;
