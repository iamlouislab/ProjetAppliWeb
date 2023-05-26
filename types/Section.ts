import Card from "./Card";
import Portfolio from "./Portfolio";


type Section = {
    id: number | undefined;
    title: string;
    description: string;
    Portfolio : Portfolio;
    cards: Card[];
}

export default Section;