import Card from "./Card";

type Section = {
    id: number | undefined;
    title: string;
    description: string;
    cards: Card[];
}

export default Section;