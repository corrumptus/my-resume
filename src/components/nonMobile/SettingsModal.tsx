import { useEffect } from "react";
import type { AvailableLangs, AvailableOrientations, AvailableThemes } from "../../main";
import themes, { translateThemeName } from "../../utils/themes";

export default function SettingsModal({
    lang,
    changeLang,
    orientation,
    changeOrientation,
    theme,
    changeTheme,
    position,
    updatePosition,
    closeSettings,
    modal
}: {
    lang: AvailableLangs,
    changeLang: (lang: AvailableLangs) => void,
    orientation: AvailableOrientations,
    changeOrientation: (orientation: AvailableOrientations) => void,
    theme: AvailableThemes,
    changeTheme: (theme: AvailableThemes) => void,
    position: { x: number, y: number } | undefined,
    updatePosition: (newPosition: { x: number, y: number }) => void,
    closeSettings: () => void,
    modal: "newFile" | "options" | "settings" | undefined
}) {
    useEffect(() => {
        if (modal !== "settings")
            return;

        return () => {
            closeSettings();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal]);

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
                <li
                    style={{ listStyleType: lang === "pt-br" ? "disclosure-closed" : undefined }}
                    onClick={() => changeLang("pt-br")}
                >
                    Português
                </li>
                <li
                    style={{ listStyleType: lang === "en" ? "disclosure-closed" : undefined }}
                    onClick={() => changeLang("en")}
                >
                    English
                </li>
            </ul>
        </div>
        <div className="orientation">
            <ul>
                <li
                    style={{ listStyleType: orientation === "backwards" ? "disclosure-closed" : undefined }}
                    onClick={() => setNewOrientation("backwards")}
                >
                    {lang === "pt-br" ? "Ao contrário" : "Backwards"}
                </li>
                <li
                    style={{ listStyleType: orientation === "forwards" ? "disclosure-closed" : undefined }}
                    onClick={() => setNewOrientation("forwards")}
                >
                    {lang === "pt-br" ? "Normal" : "Forwards"}
                </li>
            </ul>
        </div>
        <div className="theme">
            <ul>
                {Object.keys(themes).map(themeName => (
                    <li
                        key={themeName}
                        onClick={() => changeTheme(themeName as AvailableThemes)}
                        style={{ listStyleType: theme === themeName ? "disclosure-closed" : undefined }}
                    >
                        {translateThemeName(lang, themeName as AvailableThemes)}
                    </li>
                ))}
            </ul>
        </div>
    </div>;
}