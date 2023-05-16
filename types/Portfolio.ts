import Section from "./Section";

type Portfolio = {
    id: number;
    backgroundColor: string;
    sections: Section[];
    user: User;
}

export default Portfolio;