import type { AvailableLangs, AvailableThemes } from "../../main";
import themes, { translateThemeName } from "../../utils/themes";

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
                    onClick={() => changeLang("pt-br")}
                    style={{
                        listStyleType: lang === "pt-br" ? "disclosure-closed" : undefined,
                        backgroundColor: lang === "pt-br" ? "var(--closeTabButtonBgColor)" : undefined
                    }}
                >
                    Português
                </li>
                <li
                    onClick={() => changeLang("en")}
                    style={{
                        listStyleType: lang === "en" ? "disclosure-closed" : undefined,
                        backgroundColor: lang === "en" ? "var(--closeTabButtonBgColor)" : undefined
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