import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import MobileLayout from "./layouts/MobileLayout";
import NonMobileLayout from "./layouts/NonMobileLayout";
import resume from "./assets/resume.html?raw";

export type File = {
  name: string,
  content: string,
  canDelete: boolean,
  isOpen: boolean,
  canClose: boolean,
  isSelected: boolean
};

const MAX_MOBILE_WIDTH = 800;

function Layout() {
  const [ width, setWidth ] = useState(window.innerWidth);
  const [ lang, setLang ] = useState<"pt-br" | "en">("pt-br");
  const [ theme, setTheme ] = useState("default");
  const [ nonMobileOrientation, setNonMobileOrientation ] = useState<"backwards" | "forwards">("backwards");
  const [ files, setFiles ] = useState<File[]>([
    {
      name: "currículo.html",
      content: resume,
      canDelete: false,
      isOpen: true,
      canClose: false,
      isSelected: true
    }
  ]);

  useEffect(() => {
    const ro = new ResizeObserver(() => setWidth(window.innerWidth));

    ro.observe(document.body);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;

    if (lang === "pt-br") {
      document.querySelector("title")!.innerText = "Currículo";

      setFiles(curFiles => {
        curFiles[0].name = "currículo.html";

        return [ ...curFiles ];
      });
    } else {
      document.querySelector("title")!.innerText = "Resume";

      setFiles(curFiles => {
        curFiles[0].name = "resume.html";

        return [ ...curFiles ];
      });
    }
  }, [lang]);

  return width <= MAX_MOBILE_WIDTH ?
    <MobileLayout
      changeLang={setLang}
      theme={theme}
      changeTheme={setTheme}
      files={files}
      setFiles={setFiles}
    />
    :
    <NonMobileLayout
      changeLang={setLang}
      theme={theme}
      changeTheme={setTheme}
      orientation={nonMobileOrientation}
      changeOrientation={setNonMobileOrientation}
      files={files}
      setFiles={setFiles}
    />;
}

createRoot(document.body).render(<Layout />);