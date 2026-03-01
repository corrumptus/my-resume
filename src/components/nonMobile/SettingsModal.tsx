import { useEffect } from "react";
import type { AvailableLangs, AvailableOrientations, AvailableThemes } from "../../main";
import themes from "../../utils/themes";

function translateThemeName(lang: AvailableLangs, themeName: AvailableThemes) {
    const translations: Record<AvailableLangs, Record<AvailableThemes, string>> = {
        "pt-br": {
            "default": "Padrão",
            "light": "Claro",
            "dark": "Escuro",
            "monokai": "Monokai",
            "dracula": "Drácula"
        },
        "en": {
            "default": "Default",
            "light": "Light",
            "dark": "Dark",
            "monokai": "Monokai",
            "dracula": "Dracula"
        }
    };
    return translations[lang][themeName];
}

export default function SettingsModal({
    position,
    updatePosition,
    closeSettings,
    lang,
    changeLang,
    orientation,
    changeOrientation,
    theme,
    changeTheme
}: {
    position: { x: number, y: number } | undefined,
    updatePosition: (newPosition: { x: number, y: number }) => void,
    closeSettings: () => void,
    lang: AvailableLangs,
    changeLang: (lang: AvailableLangs) => void,
    orientation: AvailableOrientations,
    changeOrientation: (orientation: AvailableOrientations) => void,
    theme: AvailableThemes,
    changeTheme: (theme: AvailableThemes) => void
}) {
    useEffect(() => {
        if (position === undefined)
            return;

        function clickHandler(e: MouseEvent) {
            if ((e.target as Element).closest(".settings") === null)
                closeSettings();
        }

        window.addEventListener("click", clickHandler);

        return () => window.removeEventListener("click", clickHandler);
    }, [position]);

    function setNewOrientation(newOrientation: AvailableOrientations) {
        changeOrientation(newOrientation);

        updatePosition({ x: window.innerWidth - position!.x, y: position!.y });
    }

    return <div
        className="settings"
        style={{
            right: orientation === "backwards" ? `calc(100% - ${position?.x}px)` : undefined,
            left: orientation === "forwards" ? position?.x : undefined,
            bottom: `calc(100% - ${position?.y}px)`,
            opacity: position !== undefined ? 100 : 0,
            pointerEvents: position !== undefined ? "auto" : "none"
        }}
    >
        <div className="lang">
            <ul>
                <li style={{ listStyleType: lang === "pt-br" ? "disclosure-closed" : "" }} onClick={() => changeLang("pt-br")}>Português</li>
                <li style={{ listStyleType: lang === "en" ? "disclosure-closed" : "" }} onClick={() => changeLang("en")}>English</li>
            </ul>
        </div>
        <div className="orientation">
            <ul>
                <li style={{ listStyleType: orientation === "backwards" ? "disclosure-closed" : "" }} onClick={() => setNewOrientation("backwards")}>{lang === "pt-br" ? "Ao contrário" : "Backwards"}</li>
                <li style={{ listStyleType: orientation === "forwards" ? "disclosure-closed" : "" }} onClick={() => setNewOrientation("forwards")}>{lang === "pt-br" ? "Normal" : "Forwards"}</li>
            </ul>
        </div>
        <div className="theme">
            <ul>
                {Object.keys(themes).map((themeName) => (
                    <li
                        style={{ listStyleType: theme === themeName ? "disclosure-closed" : "" }}
                        key={themeName}
                        onClick={() => changeTheme(themeName as AvailableThemes)}
                    >
                        {translateThemeName(lang, themeName as AvailableThemes)}
                    </li>
                ))}
            </ul>
        </div>
    </div>;
}