import type { AvailableLangs } from "../main";

export default function getLanguage(): AvailableLangs {
    const preferedLanguages = navigator.languages;

    if (preferedLanguages.find(l => l === "pt-BR" || l.split("-")[0] === "pt"))
        return "pt-BR";

    return "en-US";
}