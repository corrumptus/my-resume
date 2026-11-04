import { useEffect, useState } from "react";
import themes from "../utils/themes";
import resumePTBR from "../assets/resume-pt-BR.html?raw";
import resumeENUS from "../assets/resume-en-US.html?raw";
import type { AvailableLangs, AvailableThemes, File } from "../main";
import getLanguage from "../utils/language";

export default function useMutualVariables() {
    const [ lang, setLang ] = useState<AvailableLangs>(getLanguage());
    const [ theme, setTheme ] = useState<AvailableThemes>("default");
    const [ files, setFiles ] = useState<File[]>([
        {
            name: lang === "pt-BR" ? "currículo.html" : "resume.html",
            content: lang === "pt-BR" ? resumePTBR : resumeENUS,
            isOpen: true
        }
    ]);
    const [ fileSelectionStack, setFileSelectionStack ] = useState<string[]>([files[0].name]);

    useEffect(() => {
	    document.documentElement.lang = lang;

        if (lang === "pt-BR")
            document.querySelector("title")!.innerText = "Currículo";
        else
            document.querySelector("title")!.innerText = "Resume";

        setFiles(prevFiles => prevFiles.map((f, i) => {
            if (i !== 0) return f;

            if (lang === "pt-BR")
                return {
                    name: "currículo.html",
                    content: resumePTBR,
                    isOpen: f.isOpen
                };

            return {
                name: "resume.html",
                content: resumeENUS,
                isOpen: f.isOpen
            };
        }));
    }, [lang]);

	useEffect(() => {
		Object.entries(themes[theme]).forEach(([themeProp, value]) => {
			document.documentElement.style.setProperty(`--${themeProp}`, value);
		});
	}, [theme]);

    return [ lang, setLang, theme, setTheme, files, setFiles, fileSelectionStack, setFileSelectionStack ] as const;
}