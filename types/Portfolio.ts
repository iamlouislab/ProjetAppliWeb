import Section from "./Section";
import User from "./User";

type Portfolio = {
    id: number;
    backgroundColor: string;
    sections: Section[];
    user: User;
}

export default Portfolio;