export default function NonMobileLayout({
    changeLang,
    theme,
    changeTheme,
    orientation,
    changeOrientation
}: {
    changeLang: (lang: "pt-br" | "en") => void,
    theme: string,
    changeTheme: (theme: string) => void,
    orientation: "backwards" | "forwards",
    changeOrientation: (orientation: "backwards" | "forwards") => void
}) {
    return null;
}