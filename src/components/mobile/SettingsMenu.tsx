import themes, { translateThemeName } from "../../utils/themes";
import type { AvailableLangs, AvailableThemes } from "../../main";

export default function SettingsMenu({
    lang,
    changeLang,
    theme,
    changeTheme
}: {
    lang: AvailableLangs,
    changeLang: (lang: AvailableLangs) => void,
    theme: AvailableThemes,
    changeTheme: (theme: AvailableThemes) => void
}) {
    return <div className="menu settings">
        <div className="lang">
            <ul>
                <li
                    onClick={() => changeLang("pt-BR")}
                    style={{
                        listStyleType: lang === "pt-BR" ? "disclosure-closed" : undefined,
                        backgroundColor: lang === "pt-BR" ? "var(--closeTabButtonBgColor)" : undefined
                    }}
                >
                    Português
                </li>
                <li
                    onClick={() => changeLang("en-US")}
                    style={{
                        listStyleType: lang === "en-US" ? "disclosure-closed" : undefined,
                        backgroundColor: lang === "en-US" ? "var(--closeTabButtonBgColor)" : undefined
                    }}
                >
                    English
                </li>
            </ul>
        </div>
        <div className="theme">
            <ul>
                {Object.keys(themes).map(themeName => (
                    <li
                        key={themeName}
                        onClick={() => changeTheme(themeName as AvailableThemes)}
                        style={{
                            listStyleType: theme === themeName ? "disclosure-closed" : undefined,
                            backgroundColor: theme === themeName ? "var(--closeTabButtonBgColor)" : undefined
                        }}
                    >
                        {translateThemeName(lang, themeName as AvailableThemes)}
                    </li>
                ))}
            </ul>
        </div>
    </div>;
}