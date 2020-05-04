import { ITutorial } from "../models/ITutorial";
import { ssiInjectionTitle, sqlInjectionTitle } from "../components/Tutorial/tutorialTitles";
import { ssiInjectionLink, sqlInjectionLink } from "../components/Tutorial/tutorialLinks";

export const tutorials: ITutorial[] = [
    {
        name: ssiInjectionTitle,
        description: "A server side injection is a very simple hacking method, the user inputs simple Linux commands into any given text input and as a result the command is executed. Commonly used for gaining access to local file systems.",
        link: ssiInjectionLink,
    },
    {
        name: sqlInjectionTitle,
        description: "An SQL (Structured Query Language) Injection is a simple cyber attack, the hacker inputs a query that will return true and in return gain access to valuable information.",
        link: sqlInjectionLink,
    },
]