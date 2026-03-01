import type { AvailableLangs } from "../main";

export default function MobileLayout({
    changeLang,
    theme,
    changeTheme
}: {
    changeLang: (lang: AvailableLangs) => void,
    theme: string,
    changeTheme: (theme: string) => void
}) {
    return <>
        <TabHeader />
        <TabView />
        <TabVisualizer />
        <SideBar />
    </>;
}