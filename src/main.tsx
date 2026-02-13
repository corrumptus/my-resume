import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import MobileLayout from "./layouts/MobileLayout";
import NonMobileLayout from "./layouts/NonMobileLayout";

const MAX_MOBILE_WIDTH = 800;

function Layout() {
  const [ width, setWidth ] = useState(window.innerWidth);
  const [ lang, setLang ] = useState<"pt-br" | "en">("pt-br");
  const [ theme, setTheme ] = useState("default");
  const [ nonMobileOrientation, setNonMobileOrientation ] = useState<"backwards" | "forwards">("backwards");

  useEffect(() => {
    const ro = new ResizeObserver(() => setWidth(window.innerWidth));

    ro.observe(document.body);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;

    if (lang === "pt-br")
      document.querySelector("title")!.innerText = "Currículo";
    else
      document.querySelector("title")!.innerText = "Resume";
  }, [lang]);

  return width <= MAX_MOBILE_WIDTH ?
    <MobileLayout
      changeLang={setLang}
      theme={theme}
      changeTheme={setTheme}
    />
    :
    <NonMobileLayout
      changeLang={setLang}
      theme={theme}
      changeTheme={setTheme}
      orientation={nonMobileOrientation}
      changeOrientation={setNonMobileOrientation}
    />;
}

createRoot(document.body).render(<Layout />);