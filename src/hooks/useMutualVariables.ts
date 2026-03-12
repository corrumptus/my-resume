import { useEffect, useState } from "react";
import themes from "../utils/themes";
import resume from "../assets/resume.html?raw";
import type { AvailableLangs, AvailableThemes, File } from "../main";

export default function useMutualVariables() {
    const [ lang, setLang ] = useState<AvailableLangs>("pt-br");
    const [ theme, setTheme ] = useState<AvailableThemes>("default");
    const [ files, setFiles ] = useState<File[]>([
        {
            name: "currículo.html",
            content: resume,
            isOpen: true
        }
    ]);
    const [ fileSelectionStack, setFileSelectionStack ] = useState<string[]>(["currículo.html"]);

    useEffect(() => {
	    document.documentElement.lang = lang;

        if (lang === "pt-br")
            document.querySelector("title")!.innerText = "Currículo";
        else
            document.querySelector("title")!.innerText = "Resume";
    }, [lang]);

	useEffect(() => {
		Object.entries(themes[theme]).forEach(([themeProp, value]) => {
			document.documentElement.style.setProperty(`--${themeProp}`, value);
		});
	}, [theme]);

    return [ lang, setLang, theme, setTheme, files, setFiles, fileSelectionStack, setFileSelectionStack ] as const;
}